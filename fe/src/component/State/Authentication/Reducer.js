import {
    GET_USER_FAILURE,
    GET_USER_REQUEST,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE,
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAILURE
} from "./ActionType";

const initialState = {
    user: null,
    isLoading: false,
    error: null,
    jwt: null,
    success: null
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
        case UPDATE_PROFILE_REQUEST:
        case CHANGE_PASSWORD_REQUEST:  // Add request case for password change
            return { ...state, isLoading: true, error: null, success: null };

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return { ...state, isLoading: false, jwt: action.payload, success: "Action successful" };

        case GET_USER_FAILURE:
        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case UPDATE_PROFILE_FAILURE:
        case CHANGE_PASSWORD_FAILURE:  // Add failure case for password change
            return { ...state
                , isLoading: false,
                error: "Current password is incorrect",
                success: null };

        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
                success: "Profile updated successfully",
                error: null
            };

        case CHANGE_PASSWORD_SUCCESS:  // Add success case for password change
            return {
                ...state,
                isLoading: false,
                success: "Password changed successfully",
                error: null
            };

        default:
            return state;
    }
};
