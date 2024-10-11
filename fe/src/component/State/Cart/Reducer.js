import {
    FIND_CART_REQUEST,
    FIND_CART_SUCCESS,
    FIND_CART_FAILURE,
    CLEAR_CART_REQUEST,
    CLEAR_CART_SUCCESS,
    CLEAR_CART_FAILURE,
    ADD_ITEM_TO_CART_REQUEST,
    ADD_ITEM_TO_CART_SUCCESS,
    ADD_ITEM_TO_CART_FAILURE,
    UPDATE_CARTITEM_REQUEST,
    UPDATE_CARTITEM_SUCCESS,
    UPDATE_CARTITEM_FAILURE,
    REMOVE_CARTITEM_REQUEST,
    REMOVE_CARTITEM_SUCCESS,
    REMOVE_CARTITEM_FAILURE,
    GET_ALL_CART_ITEMS_REQUEST,
    GET_ALL_CART_ITEMS_SUCCESS,
    GET_ALL_CART_ITEMS_FAILURE,
} from './ActionType';

// Initial state for the cart reducer
const initialState = {
    cart: [],        // Initial cart is an empty array
    isLoading: false, // Indicates if a request is in progress
    error: null,      // Holds any error messages
    success: null,    // Indicates if the last operation was successful
};

// Cart reducer function
const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        // Handle loading states
        case FIND_CART_REQUEST:
        case CLEAR_CART_REQUEST:
        case ADD_ITEM_TO_CART_REQUEST:
        case UPDATE_CARTITEM_REQUEST:
        case REMOVE_CARTITEM_REQUEST:
        case GET_ALL_CART_ITEMS_REQUEST:
            return { ...state, isLoading: true, error: null, success: null };

        // Handle successful actions
        case FIND_CART_SUCCESS:
            return { ...state, isLoading: false, cart: action.payload, error: null, success: true };

        case ADD_ITEM_TO_CART_SUCCESS:
            return { ...state, isLoading: false, cart: [...state.cart, action.payload], error: null, success: true };

        case UPDATE_CARTITEM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                cart: state.cart.map(item =>
                    item.id === action.payload.id ? { ...item, ...action.payload } : item
                ),
                error: null,
                success: true,
            };

        case GET_ALL_CART_ITEMS_SUCCESS:
            return { ...state, isLoading: false, cart: action.payload, error: null, success: true };

        // Handle successful clearing of the cart
        case CLEAR_CART_SUCCESS:
            return { ...state, isLoading: false, cart: [], error: null, success: true };

        // Handle successful removal of an item from the cart
        case REMOVE_CARTITEM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                cart: state.cart.filter(item => item.id !== action.payload), // Assuming payload contains the item id to be removed
                error: null,
                success: true,
            };

        // Handle error states
        case FIND_CART_FAILURE:
        case CLEAR_CART_FAILURE:
        case ADD_ITEM_TO_CART_FAILURE:
        case UPDATE_CARTITEM_FAILURE:
        case REMOVE_CARTITEM_FAILURE:
        case GET_ALL_CART_ITEMS_FAILURE:
            return { ...state, isLoading: false, error: action.payload, success: false };

        // Return the current state by default
        default:
            return state;
    }
};

export default cartReducer;
