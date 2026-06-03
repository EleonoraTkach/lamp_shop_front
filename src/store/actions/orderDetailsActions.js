import { request } from "../../api/api";
import {SET_ORDERS} from "./ordersActions.js";


export const ORDER_DETAILS_LOADING = "ORDER_DETAILS_LOADING";
export const ORDER_ERROR = "ORDER_ERROR";

export const SET_ORDER = "SET_ORDER";
export const SET_ORDER_ITEMS = "SET_ORDER_ITEMS";

export const UPDATE_ORDER_STATUS = "UPDATE_ORDER_STATUS";
export const UPDATE_ORDER_ITEM = "UPDATE_ORDER_ITEM";
export const DELETE_ORDER_ITEM = "DELETE_ORDER_ITEM";
export const DELETE_ORDER = "DELETE_ORDER";

export const loadOrderById = (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: ORDER_DETAILS_LOADING });

            const order = await request(
                `http://localhost:8001/orders/${id}?delete_flg=False`
            );

            const itemsData = await request(
                `http://localhost:8001/orders/${id}/items?delete_flg=False`
            );

            let itemsWithProducts = itemsData.items || [];

            if (!order.is_custom) {
                itemsWithProducts = await Promise.all(
                    itemsWithProducts.map(async (item) => {
                        try {
                            const product = await request(
                                `http://localhost:8000/products/${item.product_id}?delete_flg=False`
                            );

                            return { ...item, product };
                        } catch {
                            return { ...item, product: null };
                        }
                    })
                );
            }

            dispatch({
                type: SET_ORDER,
                payload: order,
            });

            dispatch({
                type: SET_ORDER_ITEMS,
                payload: itemsWithProducts,
            });
        } catch (err) {
            dispatch({
                type: ORDER_ERROR,
                payload: err.message,
            });
        }
    };
};

export const updateOrderStatus = (id, status) => {
    return async (dispatch) => {
        await request(
            `http://localhost:8001/orders/${id}`,
            "PATCH",
            { status }
        );

        dispatch(loadOrderById(id));
    };
};

export const updateOrderInfo = (id, total_cost, user_full_name, phone_number) => {
    return async (dispatch) => {
        await request(
            `http://localhost:8001/orders/${id}`,
            "PATCH",
            {
                total_cost,
                user_full_name,
                phone_number,
            }
        );

        dispatch(loadOrderById(id));
    };
};

export const updateItemQuantity = (orderId, itemId, quantity) => {
    return async (dispatch) => {
        await request(
            `http://localhost:8001/orders/items/${itemId}`,
            "PATCH",
            { "quantity":quantity }
        );

        dispatch(loadOrderById(orderId));
    };
};

export const deleteOrderItem = (orderId, itemId) => {
    return async (dispatch) => {
        await request(
            `http://localhost:8001/orders/items/${itemId}`,
            "DELETE"
        );

        dispatch(loadOrderById(orderId));
    };
};


export const deleteOrderById = (id) => {
    return async (dispatch, getState) => {
        await request(
            `http://localhost:8001/orders/${id}`,
            "DELETE"
        );

        const { orders } = getState().orders;

        dispatch({
            type: SET_ORDERS,
            payload: orders.filter((order) => order.id !== id),
        });
    };
};
