import {
    ADD_ITEM_TO_WISHLIST_REQUEST,
    ADD_ITEM_TO_WISHLIST_SUCCESS,
    ADD_ITEM_TO_WISHLIST_FAILURE,
    REMOVE_ITEM_FROM_WISHLIST_REQUEST,
    REMOVE_ITEM_FROM_WISHLIST_SUCCESS,
    REMOVE_ITEM_FROM_WISHLIST_FAILURE,
    GET_ALL_WISHLIST_REQUEST,
    GET_ALL_WISHLIST_SUCCESS,
    GET_ALL_WISHLIST_FAILURE
} from './ActionType';

const initialState = {
    wishlist: [],
    loading: false,
    error: null,
};

const wishlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM_TO_WISHLIST_REQUEST:
        case REMOVE_ITEM_FROM_WISHLIST_REQUEST:
        case GET_ALL_WISHLIST_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case ADD_ITEM_TO_WISHLIST_SUCCESS:
            return {
                ...state,
                loading: false,
                wishlist: [...state.wishlist, action.payload], // assuming payload contains the added product
            };

        case REMOVE_ITEM_FROM_WISHLIST_SUCCESS:
            return {
                ...state,
                loading: false,
                wishlist: state.wishlist.filter(item => item.id !== action.payload.id), // assuming payload contains the product id to remove
            };

        case GET_ALL_WISHLIST_SUCCESS:
            return {
                ...state,
                loading: false,
                wishlist: action.payload,
                error: null, // assuming payload contains the list of all wishlist items
            };

        case ADD_ITEM_TO_WISHLIST_FAILURE:
        case REMOVE_ITEM_FROM_WISHLIST_FAILURE:
        case GET_ALL_WISHLIST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload, // assuming payload contains the error message
            };

        default:
            return state;
    }
};

export default wishlistReducer;
