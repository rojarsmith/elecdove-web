import { actionAuthentications } from "../action";

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loading: false, loginFailed: false, loggedIn: true, user } : {};

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
        default:
            return state
    }
}