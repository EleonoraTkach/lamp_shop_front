export const SET_SEARCH = "SET_SEARCH";
export const SET_SORT = "SET_SORT";
export const SET_ONLY_IN_STOCK = "SET_ONLY_IN_STOCK";
export const SET_CATEGORY = "SET_CATEGORY";

export const setSearch = (value) => ({
    type: SET_SEARCH,
    payload: value,
});

export const setSort = (value) => ({
    type: SET_SORT,
    payload: value,
});

export const setOnlyInStock = (value) => ({
    type: SET_ONLY_IN_STOCK,
    payload: value,
});

export const setCategory = (value) => ({
    type: SET_CATEGORY,
    payload: value,
});