import { actionModals, actionAuthentications } from "../action";
import AuthService from "service/AuthService";

export const creatorAuthentications = {
    initial,
    login,
    logout,
    signup,
    confirmMail,
    askResetPassword
};

function initial() {
    return dispatch => {
        let user = JSON.parse(localStorage.getItem("user"));

        if (user) {
            let token = user.access_token;
            AuthService.check({ token })
                .then(
                    user => {
                        console.log(user);
                        dispatch({ type: actionAuthentications.LOGIN_INITIAL, action: user.active });
                    },
                    error => {
                        console.log(error);
                        localStorage.removeItem("user");
                        dispatch({ type: actionAuthentications.LOGIN_INITIAL });
                    }
                );
        } else {
            dispatch({ type: actionAuthentications.LOGIN_INITIAL });
        }
    }
}

function login(username, password, from) {
    return dispatch => {
        dispatch(request({ username }));

        AuthService.login({ username, password })
            .then(
                user => {
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error.toString()));
                    //dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: actionAuthentications.LOGIN_REQUEST, user } }
    function success(user) { return { type: actionAuthentications.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: actionAuthentications.LOGIN_FAILURE, error } }
}

function logout() {
    AuthService.logout();
    return { type: actionAuthentications.LOGOUT };
}

function signup(user) {
    return dispatch => {
        dispatch(request(user));

        AuthService.signup(user)
            .then(
                user => {
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error));
                    dispatch({
                        type: actionModals.OPEN_ERROR, action:
                            () => {
                                try {
                                    return error.response.data.message;
                                } catch (e) {
                                    return 'Service in maintenance.'
                                }
                            }
                    });
                }
            );
    };

    function request(user) { return { type: actionAuthentications.SIGNUP_REQUEST, user } }
    function success(user) { return { type: actionAuthentications.SIGNUP_SUCCESS, user } }
    function failure(error) { return { type: actionAuthentications.SIGNUP_FAILURE, error } }
}

function confirmMail(token) {
    return dispatch => {
        dispatch(request(token));

        AuthService.confirmMail(token)
            .then(
                payload => {
                    dispatch(success(payload));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request(token) { return { type: actionAuthentications.CONFIRM_REQUEST, token } }
    function success(payload) { return { type: actionAuthentications.CONFIRM_SUCCESS, payload } }
    function failure(error) {
        let emsg = '';
        try {
            emsg = error.response.data.message
        } catch (e) {
            emsg = 'Service in maintenance.'
        }

        return {
            type: actionAuthentications.CONFIRM_FAILURE, payload: { message: emsg }
        }
    }
}

function askResetPassword(email) {
    return dispatch => {
        dispatch(request(email));

        AuthService.askResetPassword(email)
            .then(
                payload => {
                    dispatch(success(payload));
                },
                error => {
                    dispatch(failure(error));
                    dispatch({
                        type: actionModals.OPEN_ERROR, action:
                            () => {
                                try {
                                    return error.response.data.message;
                                } catch (e) {
                                    return 'Service in maintenance.'
                                }
                            }
                    });
                }
            );
    };

    function request(email) { return { type: actionAuthentications.ASK_FORGET_REQUEST, email } }
    function success(payload) { return { type: actionAuthentications.ASK_FORGET_SUCCESS, payload } }
    function failure(error) {
        let emsg = '';
        try {
            emsg = error.response.data.message
        } catch (e) {
            emsg = 'Service in maintenance.'
        }

        return {
            type: actionAuthentications.ASK_FORGET_FAILURE, payload: { message: emsg }
        }
    }
}

