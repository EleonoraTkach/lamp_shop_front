import {
    SET_SEARCH,
    SET_SORT,
    SET_ONLY_IN_STOCK,
    SET_CATEGORY,
} from "../actions/catalogActions";

const initialState = {
    search: "",
    sort: "cheap",
    onlyInStock: false,
    categoryId: "all",
};

export const catalogReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH:
            return { ...state, search: action.payload };

        case SET_SORT:
            return { ...state, sort: action.payload };

        case SET_ONLY_IN_STOCK:
            return { ...state, onlyInStock: action.payload };

        case SET_CATEGORY:
            return { ...state, categoryId: action.payload };

        default:
            return state;
    }
};