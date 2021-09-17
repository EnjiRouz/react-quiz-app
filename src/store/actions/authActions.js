import axios from "../../axios/axios-quiz";
import {AUTH_SUCCEED, AUTH_LOGOUT} from "./actionTypes";

export function auth(email, password, isLogIn) {
    return async dispatch => {
        const authData = {
            email,
            password,
            returnSecureToken: true
        };

        const loginUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD_Nt0gWgkjXb09KWmoUfz-vcrKe2R9k2Q";
        const signUpUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD_Nt0gWgkjXb09KWmoUfz-vcrKe2R9k2Q";

        const response = await axios.post(isLogIn ? loginUrl : signUpUrl, authData);
        const data = response.data;
        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 100);

        localStorage.setItem("token", data.idToken);
        localStorage.setItem("userId", data.localId);
        localStorage.setItem("expirationDate", expirationDate);

        dispatch(authSucceed(data.idToken));
        dispatch(autoLogout(data.expiresIn));
    }
}

export function autoLogout(timeInSeconds) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, timeInSeconds * 1000);
    }
}

export function authSucceed(authToken) {
    return {
        type: AUTH_SUCCEED,
        authToken: authToken
    }
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expirationDate");

    return {
        type: AUTH_LOGOUT
    }
}