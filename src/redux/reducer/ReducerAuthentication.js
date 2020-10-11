import { actionAuthentications } from "../action";

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? {
    loading: false,
    loginFailed: false,
    loggedIn: true,
    confirmed: -1,
    confirmMessage: '',
    user
} : {};

export function reducerAuthentication(state = initialState, action) {
    switch (action.type) {
        case actionAuthentications.LOGIN_INITIAL:
            state.loginSuccess = false;
            state.loginFailed = false;
            state.loading = false;
            state.logout = false;
            state.preAction = action.type;
            state.loggedIn = action.action;
            return state;
        case actionAuthentications.LOGIN_REQUEST:
            state.loginFailed = false;
            state.loading = true;
            state.loggedIn = false;
            state.preAction = action.type;
            return state;
        case actionAuthentications.LOGIN_SUCCESS:
            state.loginSuccess = true;
            state.loginFailed = false;
            state.loading = false;
            state.loggedIn = true;
            state.preAction = action.type;
            return state;
        case actionAuthentications.LOGIN_FAILURE:
            state.loginSuccess = false;
            state.loginFailed = true;
            state.loading = false;
            state.loggedIn = false;
            state.preAction = action.type;
            return state;
        case actionAuthentications.LOGOUT:
            state.loginFailed = false;
            state.loading = false;
            state.loggedIn = false;
            state.logout = true;
            state.mobileOpen = false;
            state.preAction = action.type;
            return state;
        case actionAuthentications.LOGOUT_SUCCESS:
            state.logout = false;
            state.mobileOpen = false;
            state.preAction = action.type;
            return state;
        case actionAuthentications.SIGNUP_INITIAL:
            state.signedup = false;
            state.loading = false;
            return state;
        case actionAuthentications.SIGNUP_REQUEST:
            state.loading = true;
            return state;
        case actionAuthentications.SIGNUP_SUCCESS:
            state.signedup = true;
            state.loading = false;
            return state;
        case actionAuthentications.SIGNUP_FAILURE:
            state.loading = false;
            return state;
        case actionAuthentications.CONFIRM_REQUEST:
            state.confirmed = -1;
            state.confirmMessage = '';
            state.loading = true;
            return state;
        case actionAuthentications.CONFIRM_SUCCESS:
            state.confirmed = 1;
            state.confirmMessage = action.payload.message;
            state.loading = false;
            return state;
        case actionAuthentications.CONFIRM_FAILURE:
            state.confirmed = 0;
            state.confirmMessage = action.payload.message;
            state.loading = false;
            return state;
        case actionAuthentications.ASK_FORGET_INITIAL:
            state.resetPassword = -1;
            state.rp = false;
            state.rcg = false;
            state.resetPasswordMessage = '';
            state.loading = false;
            return state;
        case actionAuthentications.ASK_FORGET_REQUEST:
            state.resetPassword = -1;
            state.rp = false;
            state.rcg = false;
            state.resetPasswordMessage = '';
            state.loading = true;
            return state;
        case actionAuthentications.ASK_FORGET_SUCCESS:
            state.resetPassword = 1;
            state.rp = true;
            state.rcg = true;
            state.resetPasswordMessage = action.payload.message;
            state.loading = false;
            return state;
        case actionAuthentications.ASK_FORGET_FAILURE:
            state.resetPassword = 0;
            state.rp = false;
            state.rcg = true;
            state.resetPasswordMessage = action.payload.message;
            state.loading = false;
            return state;
        case actionAuthentications.FORGET_INITIAL:
            state.responseSuccess= false;
            state.responseMessage= action.payload.message;
            state.confirmed = -1;
            state.confirmMessage = '';
            state.response = false;
            state.loading = false;
            return state;
        case actionAuthentications.FORGET_REQUEST:
            state.responseSuccess= false;
            state.confirmed = -1;
            state.confirmMessage = '';
            state.response = false;
            state.loading = true;
            return state;
        case actionAuthentications.FORGET_SUCCESS:
            state.responseSuccess= true;
            state.responseMessage= action.payload.message;
            state.confirmed = 1;
            state.confirmMessage = action.payload.message;
            state.response = true;
            state.loading = false;
            return state;
        case actionAuthentications.FORGET_FAILURE:
            state.responseSuccess= false;
            state.responseMessage= action.payload.message;
            state.confirmed = 0;
            state.confirmMessage = action.payload.message;
            state.response = true;
            state.loading = false;
            return state;
        default:
            return state
    }
}