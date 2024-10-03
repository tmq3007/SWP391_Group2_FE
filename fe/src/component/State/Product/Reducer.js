import {
    GET_ALL_PRODUCTS_FAILURE,
    GET_ALL_PRODUCTS_REQUEST,
    GET_ALL_PRODUCTS_SUCCESS,
    GET_PRODUCT_BY_ID_FAILURE,
    GET_PRODUCT_BY_ID_REQUEST,
    GET_PRODUCT_BY_ID_SUCCESS
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
            return { ...state, isLoading: true, error: null, success: null };

        case GET_ALL_PRODUCTS_SUCCESS:
            return { ...state, isLoading: false, products: action.payload, error: null, success: true };

        case GET_PRODUCT_BY_ID_SUCCESS:
            return { ...state, isLoading: false, product: action.payload, error: null, success: true };

        case GET_ALL_PRODUCTS_FAILURE:
        case GET_PRODUCT_BY_ID_FAILURE:
            return { ...state, isLoading: false, error: action.payload, success: false };

        default:
            return state;
    }
}

export default productReducer;
