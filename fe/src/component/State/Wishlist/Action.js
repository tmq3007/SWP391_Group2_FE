import {
 ADD_ITEM_TO_WISHLIST_REQUEST ,
 ADD_ITEM_TO_WISHLIST_SUCCESS ,
 ADD_ITEM_TO_WISHLIST_FAILURE ,

 REMOVE_ITEM_TO_WISHLIST_REQUEST ,
 REMOVE_ITEM_TO_WISHLIST_SUCCESS ,
 REMOVE_ITEM_TO_WISHLIST_FAILURE,

 GET_ALL_WISHLIST_REQUEST ,
 GET_ALL_WISHLIST_SUCCESS ,
 GET_ALL_WISHLIST_FAILURE

} from "../Wishlist/ActionType";
import axios from "axios";
import {GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS} from "../Authentication/ActionType";
import {API_URL} from "../../config/api";

export const getAllWishlist = (userId,jwt) => async (dispatch) => {
    dispatch({type: GET_ALL_WISHLIST_REQUEST});
    try {
        const {data} = await axios.get(`http://localhost:8080/api/v1/wishlist/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });

        dispatch({type: GET_ALL_WISHLIST_SUCCESS, payload: data});

        return data;

    } catch (error) {
        dispatch({type: GET_ALL_WISHLIST_FAILURE, payload: error});

    }
};


export const addItemToWishlist = (request,jwt) => async (dispatch) => {
    dispatch({ type: ADD_ITEM_TO_WISHLIST_REQUEST });
    try {
        const {response} = await axios.post('http://localhost:8080/api/v1/wishlist',request,{
            headers:{
                Authorization: `Bearer ${jwt}`
            }
        });
        dispatch({ type: ADD_ITEM_TO_WISHLIST_SUCCESS, payload: response.data });
        console.log("w",response)
        return response;
    } catch (error) {
        dispatch({ type: ADD_ITEM_TO_WISHLIST_FAILURE, payload: error.message  });
    }
};
