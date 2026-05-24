import { request } from "../../api/api";

export const SET_REVIEWS = "SET_REVIEWS";
export const REVIEWS_LOADING = "REVIEWS_LOADING";
export const REVIEWS_ERROR = "REVIEWS_ERROR";

export const loadReviews = (productId) => {
    return async (dispatch) => {
        dispatch({ type: REVIEWS_LOADING });

        try {
            const data = await request(
                `http://localhost:8002/products/${productId}/reviews?delete_flg=False`
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

            dispatch(loadReviews(productId));
        } catch (err) {
            dispatch({
                type: REVIEWS_ERROR,
                payload: err.message,
            });
        }
    };
};

export const deleteReview = (productId, reviewId) => {
    return async (dispatch) => {
        await request(
            `http://localhost:8002/reviews/${reviewId}`,
            "DELETE"
        );

        dispatch(loadReviews(productId));
    };
};