import { request } from "../../api/api";
import { clearCart } from "./cartActions";

export const ORDER_LOADING = "ORDER_LOADING";
export const ORDER_SUCCESS = "ORDER_SUCCESS";
export const ORDER_ERROR = "ORDER_ERROR";

export const createOrderWithItems =
    (name, phone, cart) => {
        return async (dispatch) => {
            try {
                dispatch({
                    type: ORDER_LOADING,
                });

                const payload = {
                    order: {
                        user_full_name: name,
                        phone_number: phone
                    },

                    items: cart.map((item) => ({
                        product_id: item.id,
                        quantity: item.quantity,
                    })),
                };

                const data = await request(
                    "http://localhost:8001/orders/regular",
                    "POST",
                    payload
                );

                dispatch({
                    type: ORDER_SUCCESS,
                    payload: data,
                });

                dispatch(clearCart());

                return {
                    success: true,
                    data,
                };
            } catch (error) {
                dispatch({
                    type: ORDER_ERROR,
                    payload: error.message,
                });

                return {
                    success: false,
                    error: error.message,
                };
            }
        };
    };

