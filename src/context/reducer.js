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
                showAlert: true,
                isLoggedIn: true,
                alertText: "Successfully logged in!",
                alertType: "success",
            }
        case Actiones.LOGIN_ERROR:
            return{
                ...state,
                isLoading: false,
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
                    alertText: action.payload.msg,
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
                    displayProd: action.payload.displayProd
                }
            case Actiones.CLOSE_PROD_MODAL:
                return{
                    ...state,
                    prodModalOpen: false,
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