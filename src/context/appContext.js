import { useReducer, createContext, useContext } from "react";
import reducer from "./reducer";
import * as Actiones from './actions'


const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
let userToView = localStorage.getItem("userToView");
userToView = userToView === "undefined"? "" : JSON.parse(userToView)
let productToView = localStorage.getItem("productToView");
productToView = productToView === "undefined"? "" : JSON.parse(productToView)

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
    searchUsersResults: [],
    searchProductsResults: [],
    userToView: userToView? userToView : "",
    productToView: productToView? productToView : "",
    userToViewProducts: [],
    initialExploreProducts: [],
    exploreProducts: [],
    filterExploreProducts: { gender: [], category: [], price: 0},
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

    const storeUserToView = async(userToView)=>{
        await localStorage.setItem("userToView", userToView)
    }
    const storeProductToView = async(productToView)=>{
        await localStorage.setItem("productToView", productToView)
    }

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
            if(response.message && response.message?.toLowerCase().indexOf('expired') !== -1){
                dispatch({ 
                    type: Actiones.GET_PRODUCTS_ERROR,
                    payload: {
                        products: ''
                    }
                })
                return "there was an error. Please try again in a few seconds"
            }else{
                dispatch({ 
                    type: Actiones.GET_PRODUCTS_SUCCESS,
                    payload: {
                        products: response
                    }
                })
                return true
            }
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

    const likeToggleFunction = async(lOrU, prodId, token, theContext)=>{
        try{
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
                const likedProd = response?.product
                if(theContext){
                    dispatch({ 
                        type: Actiones.TOGGLE_LIKE_PROD_VIEW,
                        payload: {
                            product: likedProd,
                            context: theContext
                        }
                    })
                    getMyProducts(token, response.product?.sellerId._id)
                }else{
                    dispatch({ 
                        type: Actiones.TOGGLE_LIKE_PROD,
                        payload: {
                            product: likedProd
                        }
                    })
                    getMyProducts(token, response.product?.sellerId._id)
                }
            }
        }catch(err){
            console.log(err)
        }
    }
    
    const toggleLike = async (prodId, token, theContext)=>{
        let thisProd  = {}
        if(theContext !== "productToView"){
            thisProd = theContext ? state[`${theContext}`].find(prod => prod._id === prodId): state.products.find(prod => prod._id === prodId)
        }else{
            thisProd = state[`${theContext}`]
        }
        // console.log(thisProd)
        
        
        const bewl = thisProd?.likes?.includes(state.currentUser._id)
        if(bewl){
            await likeToggleFunction('unlike', prodId, token, theContext)
        }else{
            await likeToggleFunction('like', prodId, token, theContext)
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
                    prodId,
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
        if(!value){
            return
        }
        dispatch({type: Actiones.SEARCH_BEGIN, payload: {searchType: database}})
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
                    dispatch({ type: Actiones.FOLLOW_ACTION_SUCCESS_USERS, payload: {newUser: response?.follower, followedUser: response?.followed}})  
                }
                // if(funcSearchType==="products") dispatch({ type: Actiones.FOLLOW_ACTION_SUCCESS_PRODUCTS, payload: {response}})  
            }else{
                throw new Error("search failed", response)
            }        
        } catch (error) {
            console.log(error)
        }
    }

    const getUserToViewProds = async(accessToken, userId)=>{
        dispatch({ type: Actiones.GET_PRODUCTS_BEGIN})
        try{    
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
            if(response.message && response.message?.toLowerCase().indexOf('expired') !== -1){
                dispatch({ 
                    type: Actiones.GET_PRODUCTS_ERROR,
                    payload: {
                        products: ''
                    }
                })
                return "there was an error. Please try again in a few seconds"
            }else{
                dispatch({ 
                    type: Actiones.GET_USER_TO_VIEW_PRODUCTS_SUCCESS,
                    payload: {
                        products: response
                    }
                })
                return true
            }
        }catch(err){
            console.log(err)
            dispatch({
                type: Actiones.GET_PRODUCTS_ERROR,
                payload: { msg: err.message}
            })
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
                    const utv = JSON.stringify(response.user)
                    await storeUserToView(utv)
                    await dispatch({ type: Actiones.GETTING_USER_PRODUCT_SUCCESS, payload: {user: response?.user}})  
                    const productsAttained = getUserToViewProds(token, theId)
                    return productsAttained
                }else if(funcSearchType==="products"){
                    const ptv = JSON.stringify(response)
                    await storeUserToView(ptv.sellerId)
                    await storeProductToView(ptv)
                    await dispatch({ type: Actiones.GETTING_USER_PRODUCT_SUCCESS, payload: {product: response}})  
                    return true
                }
            }else{
                throw new Error("search failed", response)
            }        
        } catch (error) {
            console.log(error)
            return false
        }
    }

    const getExploreProducts = async( token, funcSearchType)=>{
        dispatch({type: Actiones.GETTING_EXPLORE_PRODUCT_BEGIN})
        try {
            let response = await fetch(`${process.env.REACT_APP_BYJ_API_URL}/${funcSearchType}`,{
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include',
            })
            response = await response.json()
            let logoutCondition = response.message && response.message?.toLowerCase().indexOf('expired') !== -1 || response === "Unauthorized"
            if(logoutCondition || response.message === "jwt malformed"){
                dispatch({ 
                    type: Actiones.GET_PRODUCTS_ERROR,
                    payload: {
                        products: ''
                    }
                })
                return "there was an error. Please try again in a few seconds"
            }else{
                dispatch({ 
                    type: Actiones.GETTING_EXPLORE_PRODUCT_SUCCESS,
                    payload: {
                        products: response,
                        users: response
                    }
                })
                return true
            }
              
        } catch (error) {
            console.log(error)
            return false
        }
    }

    // const filterProds = (genderParameter, categoryParameter) => {
    //     if(!genderParameter && !categoryParameter){
    //         return
    //     }
    //     dispatch({ type: Actiones.FILTER_EXPLORE_PRODS_BEGIN})
    //     const products = state.initialExploreProducts
    //     const filteredProducts = products.filter(prod => {
    //         let catBool = categoryParameter.length> 0 ? categoryParameter.indexOf(prod?.categoryId.name) !== -1 : true
    //         let genBool = genderParameter.length> 0 ? genderParameter.indexOf(prod?.genderId.name) !== -1 : true
    //         return genBool && catBool
    //     })

    //     dispatch({
    //         type: Actiones.FILTER_EXPLORE_PRODS_SUCCESS,
    //         payload: {
    //             products: filteredProducts,
    //         }
    //     })
    // }

    const filterProdsB =(genderParameter, categoryParameter, priceParameter)=>{
        if(!genderParameter && !categoryParameter && !priceParameter){
            return dispatch({
                type: Actiones.SET_EXPLORE_PARAMS_INITIAL
            })
        }
        dispatch({ type: Actiones.FILTER_EXPLORE_PRODS_BEGIN})
        const settings = { gender: genderParameter, category: categoryParameter, price: priceParameter }
        dispatch({ 
            type: Actiones.SET_PARAMS_EXPLORE_FILTER,
            payload: {
                settings: settings
            }
        })
        dispatch({type: Actiones.SET_PARAMS_EXPLORE_FILTER_SUCCESS})
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
                getTheView,
                getUserToViewProds,
                getExploreProducts,
                // filterProds,
                filterProdsB,
            }}
        >
         {children}
        </AppContext.Provider>

    )
}

export const useAppContext = () => {
    return useContext(AppContext);
};

