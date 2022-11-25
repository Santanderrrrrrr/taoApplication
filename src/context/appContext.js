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
    //for modals and drawers
    isOpenModal: false,
    prodModalOpen: false,
    warnModalOpen: false,
    displayProd: {}
}
const AppContext = createContext()

export const AppProvider = ({ children }) =>{
    const [state, dispatch] = useReducer(reducer, initialState);

    const addUserToLocalStorage = ({ user, accessToken }) => {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", accessToken);
    };

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
                getMyProducts(response.accessToken, response.user?._id)
                return true
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
            dispatch({ 
                type: Actiones.GET_PRODUCTS_SUCCESS,
                payload: {
                    products: response
                }
            })
            
        }catch(err){
            console.log(err)
            dispatch({
                type: Actiones.GET_PRODUCTS_ERROR,
                payload: { msg: err.message}
            })
        }
    }

    const openModal = (parametre, displayProd)=>{
        if(!parametre && !displayProd){
            dispatch({ type: Actiones.OPEN_MODAL })
        }else if(parametre === 'prodModal' && displayProd){
            // console.log(displayProd)
            dispatch({ 
                type: Actiones.OPEN_PROD_MODAL,
                payload: {
                    displayProd
                }
            })
        }else if(parametre === 'delWarning'){
            dispatch({ 
                type: Actiones.OPEN_WARN_MODAL,
                payload: {
                    displayProd
                }
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

    


    return(
        <AppContext.Provider
            value={{
                ...state,
                addUserToLocalStorage,
                login,
                getMyProducts,
                openModal,
                closeModal,
                toggleLike,
                deleteProd
        
            }}
        >
         {children}
        </AppContext.Provider>

    )
}

export const useAppContext = () => {
    return useContext(AppContext);
};

