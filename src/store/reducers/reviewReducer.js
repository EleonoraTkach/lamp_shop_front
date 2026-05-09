import {
    SET_REVIEWS,
    REVIEWS_LOADING,
    REVIEWS_ERROR,
} from "../actions/reviewActions";

const initialState = {
    reviews: [],
    loading: false,
    error: null,
};

export const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case REVIEWS_LOADING:
            return {
                ...state,
                loading: true,
            };

        case SET_REVIEWS:
            return {
                ...state,
                loading: false,
                reviews: action.payload,
            };

        case REVIEWS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};