import {actionAuthentications} from "../action";
import AuthService from "service/AuthService";

export const creatorAuthentications = {
    initial,
    login
};

function initial() {
    return dispatch => {
        dispatch({ type: actionAuthentications.LOGIN_INITIAL, action: "" })
    }
}

function login(username, password, from) {
    return dispatch => {
        console.log(username);
        dispatch(request({ username }));

        console.log(username + ' ' + password + ' ' + from)
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
