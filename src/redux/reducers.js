import { userActionTypes } from "redux/actions";

import {
    LOADING_BEGIN,
    LOADING_END,
    SET_ACCOUNT,
    CLEAR_ACCOUNT,
    // ACT1,
    // ACT2
} from './actions';

export function accountReducer(
    state = {
        authenticated: false,
        currentUser: null,
    },
    action) {
    switch (action.type) {
        case SET_ACCOUNT:
            state.authenticated = true;
            return state;
        case CLEAR_ACCOUNT:
            state.currentUser = null;
            return state;
        default: return state;
    };
};

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loading: false, loggedIn: true, user } : {};
console.log("initialState:" + initialState.user);
console.log("initialState:" + initialState.loggedIn);

export function authenticationReducer(state = initialState, action) {
    switch (action.type) {
        case userActionTypes.LOGIN_REQUEST:
            state.loading = true;
            return {
                loading: true,
                loggingIn: true,
                user: action.user
            };
        case userActionTypes.LOGIN_SUCCESS:
            state.loading = false;
            return {
                loading: false,
                loggedIn: true,
                user: action.user
            };
        case userActionTypes.LOGIN_FAILURE:
            state.loading = false;
            return {
                loading: false,
            };
        case userActionTypes.LOGOUT:
            return {};
        default:
            return state
    }
}

export function systemReducer(
    state = {
        loading: false
    },
    action) {
    console.log('systemReducer', state, action);
    switch (action.type) {
        case LOADING_BEGIN:
            state.loading = true;
            return state;
        case LOADING_END:
            state.loading = false;
            return state;
        default: return state;
    };
};