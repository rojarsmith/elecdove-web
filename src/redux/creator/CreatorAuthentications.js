import { actionAuthentications } from "../action";
import AuthService from "service/AuthService";

export const creatorAuthentications = {
    initial,
    login,
    logout,
    signup
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
                    //dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: actionAuthentications.SIGNUP_REQUEST, user } }
    function success(user) { return { type: actionAuthentications.SIGNUP_SUCCESS, user } }
    function failure(error) { return { type: actionAuthentications.SIGNUP_FAILURE, error } }
}
