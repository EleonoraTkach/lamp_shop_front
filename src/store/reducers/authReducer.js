import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT,
} from "../actions/authActions";

const initialState = {
    token:
        localStorage.getItem(
            "access_token"
        ) || null,
    loading: false,
    error: null,
};

export const authReducer = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                token: action.payload,
            };

        case LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case LOGOUT:
            return {
                ...state,
                token: null
            };

        default:
            return state;
    }
};