import axios from "../../axios/axios-quiz";
import {AUTH_SUCCEED, AUTH_LOGOUT} from "./actionTypes";

export function auth(email, password, isLogIn) {
    return async dispatch => {
        const authData = {
            email,
            password,
            returnSecureToken: true
        };

        const FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
        const loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;
        const signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`;

        const response = await axios.post(isLogIn ? loginUrl : signUpUrl, authData);
        const data = response.data;
        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);

        localStorage.setItem("token", data.idToken);
        localStorage.setItem("expirationDate", expirationDate);

        dispatch(authSucceed(data.idToken));
        dispatch(autoLogout(data.expiresIn));
    }
}

export function autoLogin() {
    return dispatch => {
        const token = localStorage.getItem("token");
        const expirationDate = new Date(localStorage.getItem("expirationDate"));

        if (!token || expirationDate <= new Date())
            dispatch(logout());
        else {
            dispatch(authSucceed(token));
            dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000));
        }
    }
}

export function autoLogout(timeInSeconds) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, timeInSeconds * 1000);
    }
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");

    return {
        type: AUTH_LOGOUT
    }
}

export function authSucceed(authToken) {
    return {
        type: AUTH_SUCCEED,
        authToken: authToken
    }
}