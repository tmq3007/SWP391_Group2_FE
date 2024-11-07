
const initialState = {
    reviews: [],
    error: null,
};

export const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SUBMIT_REVIEW_SUCCESS':
            return {
                ...state,
                reviews: [...state.reviews, action.payload],
            };
        case 'SUBMIT_REVIEW_FAILURE':
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};
export default reviewReducer;
