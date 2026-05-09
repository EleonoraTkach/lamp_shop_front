// store/reducers/orderReducer.js

import {
    ORDER_LOADING,
    ORDER_SUCCESS,
    ORDER_ERROR,
} from "../actions/orderActions";

const initialState = {
    loading: false,
    error: null,
    order: null,
};

export const orderReducer = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ORDER_LOADING:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload,
            };

        case ORDER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};