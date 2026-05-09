export const SET_CATEGORIES = "SET_CATEGORIES";

export const CATEGORIES_LOADING = "CATEGORIES_LOADING";

export const CATEGORIES_ERROR = "CATEGORIES_ERROR";

import { request } from "../../api/api";


export const fetchCategories = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: CATEGORIES_LOADING,
            });

            const data = await request(
                "http://localhost:8000/categories"
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