import { useReducer, createContext, useContext } from "react";
import reducer from "./reducer";
import * as Actiones from './actions'


const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

export const initialState ={
    isLoggedIn: false,
    isLoading: false,
    showAlert: false,
    open: false,
    forgot: false,
    alertType: '',
    alertText: '',
    token: token,
    currentUser: JSON.parse(user),
    products: [],
    searchType: "",
    searchUsersResults: {},
    searchProductsResults: {},
    userToView: {},
    //for modals and drawers
    isOpenModal: false,
    prodModalOpen: false,
    warnModalOpen: false,
    editModalOpen: false,
    settingsDrawerOpen: false,
    displayProd: {},
}
const AppContext = createContext()

export const AppProvider = ({ children }) =>{
    const [state, dispatch] = useReducer(reducer, initialState);

    const addUserToLocalStorage = ({ user, accessToken }) => {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", accessToken);
    };

    const logout = async ()=>{
        dispatch({type: Actiones.LOGOUT_BEGIN})

        try{
            let response = await fetch(`${process.env.REACT_APP_BYJ_API_URL}/logout`,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                credentials: 'include',
            })
            // console.log(response)
            if(response.status === 204){
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                dispatch({ type: Actiones.LOGOUT_SUCCESS })
                return true
            }
        }catch(error){

        }
    }

    const login = async (email, password)=>{
        dispatch({type: Actiones.LOGIN_BEGIN})
        try{
            
            let requestData = JSON.stringify({
                email: email,
                password: password,
            })
            let response = await fetch(`${process.env.REACT_APP_BYJ_API_URL}/login`,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                credentials: 'include',
                body: requestData
                })
            response = await response.json()
            if(response){
                addUserToLocalStorage(response)
                dispatch({
                    type: Actiones.LOGIN_SUCCESS,
                    payload: {
                        user: response.user,
                        token: response.accessToken
                    }
                })
                const direction = await getMyProducts(response.accessToken, response.user?._id)
                return direction
            }else{
                throw new Error("Failed to get user's access token in time")
            }
        }catch(error){
            console.log(error)
            dispatch({
                type: Actiones.LOGIN_ERROR,
                payload: { msg: error.message }
            })
        }
    }
    
    const getMyProducts = async( accessToken, userId )=>{
        dispatch({ type: Actiones.GET_PRODUCTS_BEGIN})
        try{    
            // console.log(persId)
            let response = await fetch(`${process.env.REACT_APP_BYJ_API_URL}/products/u/${userId}`,{
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                    },
                credentials: 'include',
                })
            response = await response.json()
            if(response === "Forbidden"){
                dispatch({ 
                    type: Actiones.GET_PRODUCTS_ERROR,
                    payload: {
                        products: ''
                    }
                })
                return "there was an error. Please try again in a few seconds"
            }
            dispatch({ 
                type: Actiones.GET_PRODUCTS_SUCCESS,
                payload: {
                    products: response
                }
            })
            return true
        }catch(err){
            console.log(err)
            dispatch({
                type: Actiones.GET_PRODUCTS_ERROR,
                payload: { msg: err.message}
            })
        }
    }

    const openModal = (parametre, displayProdParam)=>{
        if(!parametre && !displayProdParam){
            dispatch({ type: Actiones.OPEN_MODAL })
        }else if(parametre === 'prodModal' && displayProdParam){
            // console.log(displayProdParam)
            dispatch({ 
                type: Actiones.OPEN_PROD_MODAL,
                payload: {
                    displayProdParam
                }
            })
        }else if(parametre === 'delWarning'){
            dispatch({ 
                type: Actiones.OPEN_WARN_MODAL,
                
            })
        }else if(parametre === 'edit'){
            console.log(displayProdParam)
            dispatch({ 
                type: Actiones.OPEN_EDIT_MODAL,
                payload: {
                    displayProdParam
                }
            })
        }else if(parametre === 'settings'){
            dispatch({ 
                type: Actiones.OPEN_SETTINGS_DRAWER,
            })
        }
    }
    const closeModal = (parametre)=>{
        if(!parametre){
            dispatch({ type: Actiones.CLOSE_MODAL })
        }else if(parametre === 'prodModal'){
            dispatch({ 
                type: Actiones.CLOSE_PROD_MODAL
            })
        }else if(parametre === 'delWarning'){
            dispatch({ 
                type: Actiones.CLOSE_PROD_MODAL
            })
            dispatch({ 
                type: Actiones.CLOSE_WARN_MODAL
            })
        }else if(parametre === 'edit'){
            dispatch({ 
                type: Actiones.CLOSE_EDIT_MODAL
            })
        }else if(parametre === 'settings'){
            dispatch({ 
                type: Actiones.CLOSE_SETTINGS_DRAWER,
            })
        }
    }

    const likeToggleFunction = async(lOrU, prodId, token)=>{
        try{
        // console.log(prodId)
            let response = await fetch(`${process.env.REACT_APP_BYJ_API_URL}/products/${lOrU}`,{
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({prodId: prodId}),
                credentials: 'include',
            })
            response = await response.json()

            if(response.message === `${lOrU}`){
                const likedProd = response.product

                dispatch({ 
                    type: Actiones.TOGGLE_LIKE_PROD,
                    payload: {
                        product: likedProd
                    }
                })
            }
            getMyProducts(token, response.product?.sellerId._id)

        }catch(err){
            console.log(err)
        }
    }
    
    const toggleLike = async (prodId, token)=>{
        const thisProd = state.products.find(prod => prod._id === prodId)
        const bewl = thisProd.likes.includes(state.currentUser._id)
        if(bewl){
            await likeToggleFunction('unlike', prodId, token)
        }else{
            await likeToggleFunction('like', prodId, token)
        }

    }

    const deleteProd = async(prodId, token, sellerId)=>{
        console.log('simple hit')
        try{
            let response = await fetch(`${process.env.REACT_APP_BYJ_API_URL}/products`,{
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    updates:{
                        prodID: prodId
                    }
                }),
                credentials: 'include',
            })
            response = await response.json()
            if(response.result.acknowledged){
                getMyProducts(token, sellerId)
            }            
        }catch(err){
            console.log(err)
        }
    }
    const editProd = async(changes, prodId, token, sellerId)=>{
        try{
            let response = await fetch(`${process.env.REACT_APP_BYJ_API_URL}/products`,{
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    updates:{
                        ...changes
                    },
                    prodId
                }),
                credentials: 'include',
            })
            response = await response.json()
            if(response.product){
                getMyProducts(token, sellerId)
                openModal( 'prodModal', response.product)  
            }
        }catch(err){
            console.log(err)
        }
    }

    const setSearchType = (type) => {
        dispatch({ type: Actiones.SET_SEARCH_TYPE, payload:{type} })
    }

    const doTheSearch = async (database, value, token)=>{
        dispatch({type: Actiones.SEARCH_BEGIN})
        try{
            let response = await fetch(`${process.env.REACT_APP_BYJ_API_URL}/${database}/find/${value}`,{
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include',
            })
            response = await response.json()
            if(response){
                if(database==="users"){
                    await dispatch({ type: Actiones.SEARCH_SUCCESS_USERS, payload: {response}})
                }  
                if(database==="products"){
                    dispatch({ type: Actiones.SEARCH_SUCCESS_PRODUCTS, payload: {response}})
                }
            }else{
                throw new Error("search failed", response)
            }
        }catch(error){
            console.log(error)
        }
    }

    const doFollow = async(userId, token, funcSearchType)=>{
        console.log(funcSearchType)
        dispatch({type: Actiones.FOLLOW_ACTION_BEGIN})
        try {
            let response = await fetch(`${process.env.REACT_APP_BYJ_API_URL}/${funcSearchType}/follow/${userId}`,{
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include',
            })
            response = await response.json()
            if(response){
                if(funcSearchType==="users") {
                    dispatch({ type: Actiones.FOLLOW_ACTION_SUCCESS_USERS, payload: {newUser: response?.follower}})  
                }
                console.log(state.searchType)
                // if(funcSearchType==="products") dispatch({ type: Actiones.FOLLOW_ACTION_SUCCESS_PRODUCTS, payload: {response}})  
            }else{
                throw new Error("search failed", response)
            }        
        } catch (error) {
            
        }
    }

    const getTheView = async(theId, token, funcSearchType)=>{
        dispatch({type: Actiones.GETTING_USER_PRODUCT_BEGIN})
        try {
            let response = await fetch(`${process.env.REACT_APP_BYJ_API_URL}/${funcSearchType}/${theId}`,{
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include',
            })
            response = await response.json()
            if(response){
                if(funcSearchType==="users") {
                    await dispatch({ type: Actiones.GETTING_USER_PRODUCT_SUCCESS, payload: {user: response?.user}})  
                    return true
                }
                // if(funcSearchType==="products") dispatch({ type: Actiones.FOLLOW_ACTION_SUCCESS_PRODUCTS, payload: {response}})  
            }else{
                throw new Error("search failed", response)
            }        
        } catch (error) {
            console.log(error)
            return false
        }
    }


    


    return(
        <AppContext.Provider
            value={{
                ...state,
                addUserToLocalStorage,
                login,
                logout,
                getMyProducts,
                openModal,
                closeModal,
                toggleLike,
                deleteProd,
                editProd,
                setSearchType,
                doTheSearch,
                doFollow,
                getTheView
            }}
        >
         {children}
        </AppContext.Provider>

    )
}

export const useAppContext = () => {
    return useContext(AppContext);
};

