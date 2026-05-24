import {
    ORDER_DETAILS_LOADING,
    ORDER_ERROR,
    SET_ORDER,
    SET_ORDER_ITEMS,
    UPDATE_ORDER_STATUS,
    UPDATE_ORDER_ITEM,
    DELETE_ORDER_ITEM,
    DELETE_ORDER,
} from "../actions/orderDetailsActions";

const initialState = {
    order: null,
    items: [],
    loading: false,
    error: null,
};

export const orderDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ORDER_DETAILS_LOADING:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case SET_ORDER:
            return {
                ...state,
                loading: false,
                order: action.payload,
            };

        case SET_ORDER_ITEMS:
            return {
                ...state,
                loading: false,
                items: action.payload,
            };

        case ORDER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case UPDATE_ORDER_STATUS:
            return {
                ...state,
                order: action.payload,
            };

        case UPDATE_ORDER_ITEM:
            return {
                ...state,
                items: state.items.map((i) =>
                    i.id === action.payload.itemId
                        ? { ...i, quantity: action.payload.quantity }
                        : i
                ),
            };

        case DELETE_ORDER_ITEM:
            return {
                ...state,
                items: state.items.filter(
                    (i) => i.id !== action.payload
                ),
            };

        case DELETE_ORDER:
            return initialState;

        default:
            return state;
    }
};