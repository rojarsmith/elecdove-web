import AuthService from "service/AuthService";

//System
export const LOADING_BEGIN = 'LOADING_BEGIN';
export const LOADING_END = 'LOADING_END';

//Account
export const SET_ACCOUNT = 'SET_ACCOUNT';
export const CLEAR_ACCOUNT = 'CLEAR_ACCOUNT';

//Test
export const ACT1 = 'ACT1';
export const ACT2 = 'ACT2';

export const userActionTypes = {
    REGISTER_REQUEST: 'USERS_REGISTER_REQUEST',
    REGISTER_SUCCESS: 'USERS_REGISTER_SUCCESS',
    REGISTER_FAILURE: 'USERS_REGISTER_FAILURE',

    LOGIN_REQUEST: 'USERS_LOGIN_REQUEST',
    LOGIN_SUCCESS: 'USERS_LOGIN_SUCCESS',
    LOGIN_FAILURE: 'USERS_LOGIN_FAILURE',

    LOGOUT: 'USERS_LOGOUT',

    GETALL_REQUEST: 'USERS_GETALL_REQUEST',
    GETALL_SUCCESS: 'USERS_GETALL_SUCCESS',
    GETALL_FAILURE: 'USERS_GETALL_FAILURE',

    DELETE_REQUEST: 'USERS_DELETE_REQUEST',
    DELETE_SUCCESS: 'USERS_DELETE_SUCCESS',
    DELETE_FAILURE: 'USERS_DELETE_FAILURE'
};

export const userActions = {
    login
};

function login(username, password, from) {
    return dispatch => {
        console.log(username);
        dispatch(request({ username }));

        console.log(username + ' ' + password)
        AuthService.login({ username, password })
            .then(
                user => {
                    dispatch(success(user));
                    //history.push(from);
                },
                error => {
                    dispatch(failure(error.toString()));
                    //dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userActionTypes.LOGIN_REQUEST, user } }
    function success(user) { return { type: userActionTypes.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userActionTypes.LOGIN_FAILURE, error } }
}



