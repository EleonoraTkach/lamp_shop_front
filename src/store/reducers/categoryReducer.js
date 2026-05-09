import {
    SET_CATEGORIES,
    CATEGORIES_LOADING,
    CATEGORIES_ERROR,
} from "../actions/categoryActions";

const initialState = {
    categories: [],
    loading: false,
    error: null,
};

export const categoryReducer = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case CATEGORIES_LOADING:
            return {
                ...state,
                loading: true,
            };

        case SET_CATEGORIES:
            return {
                ...state,
                loading: false,
                categories: action.payload,
            };

        case CATEGORIES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};