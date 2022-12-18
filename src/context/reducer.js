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
        //FOR LOGOUT
        case Actiones.LOGOUT_BEGIN:
            return{
                ...state,
                isLoading: true
            }
        case Actiones.LOGOUT_SUCCESS:
            return{
                ...state,
                isLoading: false,
                currentUser: "",
                token: "",
                showAlert: false,
                isLoggedIn: false,
                settingsDrawerOpen: false,
                alertText: "Successfully logged OUT!",
                alertType: "success",
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
            case Actiones.GET_USER_TO_VIEW_PRODUCTS_SUCCESS:
                return{
                    ...state,
                    userToViewProducts: action.payload.products,
                    isLoading: false,
                    showAlert: true,
                    alertText: "The products are here!",
                    alertType: "success",
                }
            case Actiones.GETTING_EXPLORE_PRODUCT_SUCCESS:
                return{
                    ...state,
                    exploreProducts: action.payload.products,
                    initialExploreProducts: action.payload.products,
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
            //FOR Search Type
            case Actiones.SET_SEARCH_TYPE:
                return{
                    ...state,
                    searchType: action.payload.type
                }
            //FOR Search BEGIN
            case Actiones.SEARCH_BEGIN:
                return{
                    ...state,
                isLoading: true
                }
            //FOR Search SUCCESS
            case Actiones.SEARCH_SUCCESS_USERS:
                return{
                    ...state,
                isLoading: false,
                searchUsersResults: action.payload.response,
                searchType: "users"
                }
            case Actiones.SEARCH_SUCCESS_PRODUCTS:
                return{
                    ...state,
                isLoading: false,
                searchProductsResults: action.payload.response,
                searchType: "products"

                }
            //FOR FOLLOW ACTION BEGIN
            case Actiones.FOLLOW_ACTION_BEGIN:
                return{
                    ...state,
                isLoading: true
                }

            //FOR FOLLOW ACTION SUCCESS
            case Actiones.FOLLOW_ACTION_SUCCESS_USERS:
                return{
                    ...state,
                    isLoading: false,
                    currentUser: action.payload.newUser
                }
            //FOR GETTING_USER_PRODUCT_BEGIN
            case Actiones.GETTING_USER_PRODUCT_BEGIN:
                return{
                    ...state,
                isLoading: true
                }
            //FOR GETTING_EXPLORE_PRODUCT_BEGIN
            case Actiones.GETTING_EXPLORE_PRODUCT_BEGIN:
                return{
                    ...state,
                isLoading: true
                }

            //FOR FOLLOW ACTION SUCCESS
            case Actiones.GETTING_USER_PRODUCT_SUCCESS:
                return{
                    ...state,
                    isLoading: false,
                    userToView: action.payload.user
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
                // console.log(action.payload.displayProdParam)
                const tbe = state.products.find(p => p._id === action.payload.displayProdParam)
                // console.log(tbe)
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
            //FOR SETTINGS DRAWER
            case Actiones.OPEN_SETTINGS_DRAWER:
                return{
                    ...state,
                    settingsDrawerOpen: true,
                }
            case Actiones.CLOSE_SETTINGS_DRAWER:
                return{
                    ...state,
                    settingsDrawerOpen: false,
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
            case Actiones.TOGGLE_LIKE_PROD_VIEW:
                // console.log(`app context, context: ${action.payload.context}`)
                const foundProdV = state[`${action.payload.context}`].find(product => product._id === action.payload.product._id)
                const indexOfProdV = state[`${action.payload.context}`].indexOf(foundProdV)
                let cloneProductsV = [...state[`${action.payload.context}`]]
                cloneProductsV[indexOfProdV] = action.payload.product
                // console.log(cloneProductsV)
                return{
                    ...state,
                    [`${action.payload.context}`]: cloneProductsV,
                    displayProd: action.payload.product
                }
            //for filtering products
            case Actiones.FILTER_EXPLORE_PRODS_BEGIN:
                return{
                    ...state,
                    isLoading: true,
                }
            case Actiones.FILTER_EXPLORE_PRODS_SUCCESS:
                console.log("reducer hit", action.payload.products)
                return {
                    ...state,
                    isLoading: false,
                    exploreProducts: action.payload.products,
                }
            //for filtering products B
            case Actiones.SET_EXPLORE_PARAMS_INITIAL:
                return{
                    ...state,
                    isLoading: true,
                    filterExploreProducts: initialState.filterExploreProducts,
                }
            case Actiones.SET_PARAMS_EXPLORE_FILTER:
                return {
                    ...state,
                    filterExploreProducts: action.payload.settings,
                }
            case Actiones.SET_PARAMS_EXPLORE_FILTER_SUCCESS:
                return {
                    ...state,
                    isLoading: false,
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