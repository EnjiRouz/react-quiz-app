import {AUTH_SUCCEED, AUTH_LOGOUT} from "../actions/actionTypes";

const initialState = {
    authToken: null
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_SUCCEED:
            return {
                ...state,
                authToken: action.authToken
            };
        case AUTH_LOGOUT:
            return {
                ...state,
                authToken: null
            };
        default:
            return state;
    }
}