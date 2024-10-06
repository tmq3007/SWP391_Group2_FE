import {
    GET_ALL_CATEGORIES_FAILURE,
    GET_ALL_CATEGORIES_REQUEST,
    GET_ALL_CATEGORIES_SUCCESS,
    GET_CATEGORY_BY_ID_FAILURE,
    GET_CATEGORY_BY_ID_REQUEST,
    GET_CATEGORY_BY_ID_SUCCESS
} from "./ActionType";

const initialState = {
    categories: [], // Đảm bảo rằng categories được khởi tạo là một mảng
    category: null,
    user: null,
    isLoading: false,
    error: null,
    jwt: null,
    success: null
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_CATEGORIES_REQUEST:
        case GET_CATEGORY_BY_ID_REQUEST:
            return { ...state, isLoading: true, error: null, success: null };

        case GET_ALL_CATEGORIES_SUCCESS:
            return { ...state, isLoading: false, categories: action.payload, error: null, success: true }; // Thay CATEGORIES thành categories

        case GET_CATEGORY_BY_ID_SUCCESS:
            return { ...state, isLoading: false, category: action.payload, error: null, success: true }; // Thay CATEGORY thành category

        case GET_ALL_CATEGORIES_FAILURE:
        case GET_CATEGORY_BY_ID_FAILURE:
            return { ...state, isLoading: false, error: action.payload, success: false };

        default:
            return state;
    }
};

export default categoryReducer;
