import { actionAuthentications } from "../action";

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loading: false, loginFailed: false, loggedIn: false, user } : {};
console.log("initialState:" + initialState.user);
console.log("initialState:" + initialState.loggedIn);

export function reducerAuthentication(state = initialState, action) {
    switch (action.type) {
        case actionAuthentications.LOGIN_INITIAL:
            state.loginFailed = false;
            state.loading = false;
            return state;
        case actionAuthentications.LOGIN_REQUEST:
            state.loginFailed = false;
            state.loading = true;
            state.loggedIn = false;
            return state;
        case actionAuthentications.LOGIN_SUCCESS:
            state.loginFailed = false;
            state.loading = false;
            state.loggedIn = true;
            return state;
        case actionAuthentications.LOGIN_FAILURE:
            state.loginFailed = true;
            state.loading = false;
            state.loggedIn = false;
            return state;
        case actionAuthentications.LOGOUT:
            return {};
        default:
            return state
    }
}