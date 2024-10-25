import {
    GET_ALL_PRODUCTS_FAILURE,
    GET_ALL_PRODUCTS_REQUEST,
    GET_ALL_PRODUCTS_SUCCESS,
    GET_PRODUCT_BY_ID_FAILURE,
    GET_PRODUCT_BY_ID_REQUEST,
    GET_PRODUCT_BY_ID_SUCCESS,
    UPDATE_PRODUCT_BY_ID_FAILURE,
    UPDATE_PRODUCT_BY_ID_REQUEST,
    UPDATE_PRODUCT_BY_ID_SUCCESS,
    DELETE_PRODUCT_BY_ID_FAILURE,
    DELETE_PRODUCT_BY_ID_REQUEST,
    DELETE_PRODUCT_BY_ID_SUCCESS,
    DELETE_ALL_PRODUCTS_FAILURE,
    DELETE_ALL_PRODUCTS_REQUEST,
    DELETE_ALL_PRODUCTS_SUCCESS,
    CREATE_PRODUCT_FAILURE,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    GET_ALL_PRODUCT_BY_SHOP_ID_SUCCESS,
    GET_ALL_PRODUCT_BY_SHOP_ID_FAILURE,
    GET_ALL_PRODUCT_BY_SHOP_ID_REQUEST
} from "./ActionType";

const initialState = {
    products: [],
    product: null,
    user: null,
    isLoading: false,
    error: null,
    jwt: null,
    success: null
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_PRODUCTS_REQUEST:
        case GET_PRODUCT_BY_ID_REQUEST:
        case UPDATE_PRODUCT_BY_ID_REQUEST:
        case DELETE_PRODUCT_BY_ID_REQUEST:
        case DELETE_ALL_PRODUCTS_REQUEST:
        case CREATE_PRODUCT_REQUEST:
            return { ...state, isLoading: true, error: null, success: null };
        case GET_ALL_PRODUCT_BY_SHOP_ID_REQUEST:
            return { ...state, loading: true };

        case GET_ALL_PRODUCTS_SUCCESS:
            return { ...state, isLoading: false, products: action.payload, error: null, success: true };

        case GET_PRODUCT_BY_ID_SUCCESS:
        case UPDATE_PRODUCT_BY_ID_SUCCESS:
        case CREATE_PRODUCT_SUCCESS:
            return { ...state, isLoading: false, product: action.payload, error: null, success: true };
        case GET_ALL_PRODUCT_BY_SHOP_ID_SUCCESS:
            return { ...state, loading: false, products: action.payload };

        case DELETE_PRODUCT_BY_ID_SUCCESS:
        case DELETE_ALL_PRODUCTS_SUCCESS:
            return { ...state, isLoading: false, products: [], error: null, success: true };

        case GET_ALL_PRODUCTS_FAILURE:
        case GET_PRODUCT_BY_ID_FAILURE:
        case UPDATE_PRODUCT_BY_ID_FAILURE:
        case DELETE_PRODUCT_BY_ID_FAILURE:
        case DELETE_ALL_PRODUCTS_FAILURE:
        case CREATE_PRODUCT_FAILURE:
            return { ...state, isLoading: false, error: action.payload, success: false };
        case GET_ALL_PRODUCT_BY_SHOP_ID_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
}

export default productReducer;
