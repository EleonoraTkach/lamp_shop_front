import { request } from "../../api/api";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGOUT = "LOGOUT";

export const loginUser = (username, password) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: LOGIN_REQUEST,
            });
            const response = await request(
                "http://localhost:8005/login",
                "POST",
                    {
                        username,
                        password,
                    },
            );

            localStorage.setItem(
                "access_token",
                response.access_token
            );

            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.access_token,
            });
        } catch (e) {
            dispatch({
                type: LOGIN_ERROR,
                payload:
                    e?.message ||
                    "Ошибка авторизации",
            });
        }
    };
};

export const logout = () => {
    localStorage.removeItem("access_token");

    return {
        type: "LOGOUT",
    };
};