const initialState = {
    address: null,
    loading: false,
    error: null,
};

const addressReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_ADDRESS_SUCCESS':
            return {
                ...state,
                address: action.payload,
                loading: false,
                error: null,
            };
        case 'ADD_ADDRESS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default addressReducer;
