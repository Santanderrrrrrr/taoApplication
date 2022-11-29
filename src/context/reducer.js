import * as Actiones from './actions'

import { initialState } from './appContext'

const reducer = (state, action) => {
    switch (action.type) {
        //FOR LOGIN
        case Actiones.LOGIN_BEGIN:
            return{
                ...state,
                isLoading: true
            }
        case Actiones.LOGIN_SUCCESS:
            return{
                ...state,
                isLoading: false,
                currentUser: action.payload.user,
                token: action.payload.token,
                showAlert: true,
                isLoggedIn: true,
                alertText: "Successfully logged in!",
                alertType: "success",
            }
        case Actiones.LOGIN_ERROR:
            return{
                ...state,
                isLoading: false,
                isLoggedIn: false,
                showAlert: true,
                alertText: action.payload.msg,
                alertType: "danger",
            }
        //FOR PRODUCTS
        case Actiones.GET_PRODUCTS_BEGIN:
            return{
                ...state,
                isLoading: true
            }
            case Actiones.GET_PRODUCTS_SUCCESS:
                return{
                    ...state,
                    products: action.payload.products,
                    isLoading: false,
                    showAlert: true,
                    alertText: "The products are here!",
                    alertType: "success",
                }
            case Actiones.GET_PRODUCTS_ERROR:
                return{
                    ...state,
                    isLoading: false,
                    showAlert: true,
                    products: action.payload.products,
                    // alertText: action.payload.msg,
                    alertType: "danger",
                }
            //for modal
            case Actiones.OPEN_MODAL:
                return{
                    ...state,
                    isOpenModal: true,
                }
            case Actiones.CLOSE_MODAL:
                return{
                    ...state,
                    isOpenModal: false,
                }
            //FOR PROD MODAL
            case Actiones.OPEN_PROD_MODAL:
                return{
                    ...state,
                    prodModalOpen: true,
                    displayProd: action.payload.displayProdParam
                }
            case Actiones.CLOSE_PROD_MODAL:
                return{
                    ...state,
                    prodModalOpen: false,
                }
            //FOR WARN MODAL
            case Actiones.OPEN_WARN_MODAL:
                return{
                    ...state,
                    warnModalOpen: true,
                }
            case Actiones.CLOSE_WARN_MODAL:
                return{
                    ...state,
                    warnModalOpen: false,
                }
            //FOR EDIT MODAL
            case Actiones.OPEN_EDIT_MODAL:
                console.log(action.payload.displayProdParam)
                const tbe = state.products.find(p => p._id === action.payload.displayProdParam)
                console.log(tbe)
                return{
                    ...state,
                    editModalOpen: true,
                    displayProd: tbe
                }
            case Actiones.CLOSE_EDIT_MODAL:
                return{
                    ...state,
                    editModalOpen: false,
                }
            //FOR Liking personal profile product
            case Actiones.TOGGLE_LIKE_PROD:
                const foundProd = state.products.find(product => product._id === action.payload.product._id)
                const indexOfProd = state.products.indexOf(foundProd)
                let cloneProducts = [...state.products]
                cloneProducts[indexOfProd] = action.payload.product
                return{
                    ...state,
                    products: cloneProducts,
                    displayProd: action.payload.product
                }
            
            
            
    
        default:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertText: "error registered, default switch case triggered",
                alertType: "danger"}
    }


}

export default reducer