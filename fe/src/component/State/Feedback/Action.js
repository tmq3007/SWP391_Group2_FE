import {CREATE_PRODUCT_FAILURE, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS} from "../Product/ActionType";
import axios from "axios";
import {CREATE_REVIEW_FAILURE, CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS} from "./ActionType";

export const createReview = (reqData) => async (dispatch) => {
    const jwt = localStorage.getItem('jwt');

    if (!jwt) {
        console.error("No JWT found. Please log in.");
        return;
    }

    dispatch({ type: CREATE_REVIEW_REQUEST });
    try {
        const { data } = await axios.post("http://localhost:8080/api/v1/reviews", reqData, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            }
        });
        dispatch({ type: CREATE_REVIEW_SUCCESS, payload: data });
        console.log("Review created successfully", data);
    } catch (error) {
        console.error("Error creating review:", error.response ? error.response.data : error.message);
        dispatch({ type: CREATE_REVIEW_FAILURE, payload: error });
    }
};