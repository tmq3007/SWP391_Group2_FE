import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {authReducer} from "./Authentication/Reducer";
import {thunk} from "redux-thunk";
import productReducer from "./Product/Reducer";

const rootReducer = combineReducers({
    auth:authReducer,
    products:productReducer
})

export const store=legacy_createStore(rootReducer, applyMiddleware(thunk));