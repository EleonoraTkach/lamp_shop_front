import {
    SET_ORDERS,
    ORDERS_LOADING,
    ORDERS_ERROR,
} from "../actions/ordersActions";

const initialState = {
    orders: [],
    loading: false,
    error: null,
};

export const ordersReducer = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ORDERS_LOADING:
            return {
                ...state,
                loading: true,
            };

        case SET_ORDERS:
            return {
                ...state,
                loading: false,
                orders: action.payload,
            };

        case ORDERS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};