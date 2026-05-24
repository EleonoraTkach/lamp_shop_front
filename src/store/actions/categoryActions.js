export const SET_CATEGORIES = "SET_CATEGORIES";

export const CATEGORIES_LOADING = "CATEGORIES_LOADING";

export const CATEGORIES_ERROR = "CATEGORIES_ERROR";

import { request } from "../../api/api";


export const loadCategories  = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: CATEGORIES_LOADING,
            });

            const data = await request(
                "http://localhost:8000/categories?delete_flg=False"
            );

            dispatch({
                type: SET_CATEGORIES,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: CATEGORIES_ERROR,
                payload: error.message,
            });
        }
    };
};

export const deleteCategory = (id) => async (dispatch, getState) => {
    await request(
        `http://localhost:8000/categories/${id}`,
        "DELETE"
    );

    const { categories } = getState().categories;

    dispatch({
        type: SET_CATEGORIES,
        payload: categories.filter((c) => c.id !== id),
    });
};

export const updateCategory = (id, name) => async (dispatch, getState) => {
    const updated = await request(
        `http://localhost:8000/categories/${id}`,
        "PUT",
        { name }
    );

    const { categories } = getState().categories;

    dispatch({
        type: SET_CATEGORIES,
        payload: categories.map((c) =>
            c.id === id ? updated : c
        ),
    });
};

export const addCategory = (name) => async (dispatch, getState) => {
    const newCategory = await request(
        "http://localhost:8000/categories/",
        "POST",
        { name }
    );

    const { categories } = getState().categories;

    dispatch({
        type: SET_CATEGORIES,
        payload: [...categories, {
            id: newCategory.id,
            name,
        }],
    });
};