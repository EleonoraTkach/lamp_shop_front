import {
    SET_PRODUCTS,
    PRODUCTS_LOADING,
    PRODUCTS_ERROR,
    CHANGE_PRODUCT_QUANTITY,
    SET_PRODUCT,
    PRODUCT_LOADING,
    PRODUCT_ERROR,
} from "../actions/productActions";

const initialState = {
    products: [],
    loading: false,
    error: null,
    selectedProduct: null,
};

export const productReducer = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case PRODUCTS_LOADING:
            return {
                ...state,
                loading: true,
            };

        case SET_PRODUCTS:
            return {
                ...state,
                loading: false,
                products: action.payload,
            };

        case PRODUCTS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case CHANGE_PRODUCT_QUANTITY:
            return {
                ...state,
                products: state.products.map(
                    (product) =>
                        product.id ===
                        action.payload.productId
                            ? {
                                ...product,
                                quantity:
                                action.payload.quantity,
                            }
                            : product
                ),
            };
        case PRODUCT_LOADING:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case SET_PRODUCT:
            return {
                ...state,
                loading: false,
                selectedProduct: action.payload,
            };

        case PRODUCT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};