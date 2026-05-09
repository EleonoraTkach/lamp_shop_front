import { request } from "../../api/api";

export const SET_REVIEWS = "SET_REVIEWS";
export const REVIEWS_LOADING = "REVIEWS_LOADING";
export const REVIEWS_ERROR = "REVIEWS_ERROR";

export const fetchReviews = (productId) => {
    return async (dispatch) => {
        dispatch({ type: REVIEWS_LOADING });

        try {
            const data = await request(
                `http://localhost:8002/products/${productId}/reviews`
            );

            dispatch({
                type: SET_REVIEWS,
                payload: data.items,
            });
        } catch (err) {
            dispatch({
                type: REVIEWS_ERROR,
                payload: err.message,
            });
        }
    };
};

export const createReview = (productId, review) => {
    return async (dispatch) => {
        try {
            const data = await request(
                `http://localhost:8002/products/${productId}/reviews`,
                "POST",
                review
            );

            dispatch(fetchReviews(productId));
        } catch (err) {
            dispatch({
                type: REVIEWS_ERROR,
                payload: err.message,
            });
        }
    };
};