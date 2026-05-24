import { request } from "../../api/api";

export const SET_ORDERS = "SET_ORDERS";
export const ORDERS_LOADING = "ORDERS_LOADING";
export const ORDERS_ERROR = "ORDERS_ERROR";

// LOAD ORDERS
export const fetchOrders = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: ORDERS_LOADING });

            const data = await request(
                "http://localhost:8001/orders?delete_flg=False"
            );

            dispatch({
                type: SET_ORDERS,
                payload: data || [],
            });
        } catch (err) {
            dispatch({
                type: ORDERS_ERROR,
                payload: err.message,
            });
        }
    };
};