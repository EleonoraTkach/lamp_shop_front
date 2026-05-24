import { request } from "../../api/api";

export const SET_PRODUCTS = "SET_PRODUCTS";
export const PRODUCTS_LOADING = "PRODUCTS_LOADING";
export const PRODUCTS_ERROR = "PRODUCTS_ERROR";
export const SET_PRODUCT = "SET_PRODUCT";
export const PRODUCT_LOADING = "PRODUCT_LOADING";
export const PRODUCT_ERROR = "PRODUCT_ERROR";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

export const loadProducts = (categoryId = null) => {
    return async (dispatch) => {
        try {
            dispatch({ type: PRODUCTS_LOADING });

            let url = "http://localhost:8000";

            if (categoryId && categoryId !== "all") {
                url += `/categories/${categoryId}`;
            }

            url += "/products?delete_flg=False";

            const data = await request(url);

            dispatch({
                type: SET_PRODUCTS,
                payload: data.items || [],
            });
        } catch (err) {
            dispatch({
                type: PRODUCTS_ERROR,
                payload: err.message,
            });
        }
    };
};

export const loadProductsById = (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: PRODUCT_LOADING });

            const data = await request(
                `http://localhost:8000/products/${id}?delete_flg=False`
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

export const deleteProduct = (id) => {
    return async (dispatch, getState) => {
        await request(
            `http://localhost:8000/products/${id}`,
            "DELETE"
        );

        const { products } = getState().products;

        dispatch({
            type: SET_PRODUCTS,
            payload: products.filter((p) => p.id !== id),
        });
    };
};

export const updateProduct = (id, data) => {
    return async (dispatch, getState) => {
        const updated = await request(
            `http://localhost:8000/products/${id}`,
            "PATCH",
            data
        );

        const { products } = getState().products;

        dispatch({
            type: SET_PRODUCTS,
            payload: products.map((p) =>
                p.id === id ? updated : p
            ),
        });
    };
};

export const addProduct = (categoryId, product) => async (dispatch, getState) => {
    const newProduct = await request(
        `http://localhost:8000/categories/${categoryId}/products`,
        "POST",
        product
    );

    const { products } = getState().products;

    dispatch({
        type: SET_PRODUCTS,
        payload: [
            ...products,
            {
                id: newProduct.id,
                ...product,
                categoryId,
            },
        ],
    });
};