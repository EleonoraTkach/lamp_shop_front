import { request } from "../../api/api";

export const SET_PRODUCTS = "SET_PRODUCTS";
export const PRODUCTS_LOADING = "PRODUCTS_LOADING";
export const PRODUCTS_ERROR = "PRODUCTS_ERROR";
export const CHANGE_PRODUCT_QUANTITY = "CHANGE_PRODUCT_QUANTITY";
export const SET_PRODUCT = "SET_PRODUCT";
export const PRODUCT_LOADING = "PRODUCT_LOADING";
export const PRODUCT_ERROR = "PRODUCT_ERROR";

export const fetchProducts = (
    categoryId = null
) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: PRODUCTS_LOADING,
            });

            const url = categoryId
                ? `http://localhost:8000/categories/${categoryId}/products`
                : "http://localhost:8000/products";

            const data = await request(url);

            dispatch({
                type: SET_PRODUCTS,
                payload: data.items,
            });
        } catch (error) {
            dispatch({
                type: PRODUCTS_ERROR,
                payload: error.message,
            });
        }
    };
};

export const changeProductQuantity = (
    productId,
    quantity
) => {
    return {
        type: CHANGE_PRODUCT_QUANTITY,
        payload: {
            productId,
            quantity,
        },
    };
};

export const fetchProductById = (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: PRODUCT_LOADING });

            const data = await request(
                `http://localhost:8000/products/${id}`
            );

            dispatch({
                type: SET_PRODUCT,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: PRODUCT_ERROR,
                payload: error.message,
            });
        }
    };
};