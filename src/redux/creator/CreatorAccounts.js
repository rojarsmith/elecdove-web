import { actionModals, actionAccounts } from "../action";
import AccountService from "service/AccountService";
import { creatorAuthentications } from "redux/creator";

export const creatorAccounts = {
    getUser,
    current,
    getAccountDetail
};

function getUser(data) {
    return dispatch => {
        dispatch(request(data));

        AccountService.getUser(data)
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
                                    return error.response.data.error_description;
                                } catch (e) {
                                    return 'Service in maintenance.'
                                }
                            }
                    });

                    dispatch(creatorAuthentications.logout());
                    localStorage.removeItem('user');
                    data.history.push('/');
                }
            );
    };

    function request(data) { return { type: actionAccounts.GET_USER_REQUEST, data } }
    function success(payload) { return { type: actionAccounts.GET_USER_SUCCESS, payload } }
    function failure(error) {
        let emsg = '';
        try {
            if (!error.response) {
                emsg = error.message;
            } else {

                emsg = error.response.data.message;
            }
        } catch (e) {
            emsg = 'Service in maintenance.';
        }

        return {
            type: actionAccounts.GET_USER_FAILURE, payload: { message: emsg }
        }
    }
}

function current(data) {
    return async dispatch => {
        dispatch(request());

        await AccountService.current()
            .then(
                body => {
                    dispatch(success(body));
                },
                error => {
                    dispatch(failure(error));
                    dispatch({
                        type: actionModals.OPEN_ERROR, action:
                            () => {
                                try {
                                    return error.response.data.error_description;
                                } catch (e) {
                                    return 'Service in maintenance.'
                                }
                            }
                    });

                    dispatch(creatorAuthentications.logout());
                    data.history.push('/');
                }
            );
    };

    function request() { return { type: actionAccounts.GET_CURRENT_REQUEST } }
    function success(data) { return { type: actionAccounts.GET_CURRENT_SUCCESS, data } }
    function failure(error) {
        let emsg = '';
        try {
            emsg = error.response.data.message
        } catch (e) {
            emsg = 'Service in maintenance.'
        }

        return {
            type: actionAccounts.GET_CURRENT_FAILURE, data: { message: emsg }
        }
    }
}

function getAccountDetail(data) {
    return dispatch => {
        dispatch(request(data));

        AccountService.getAccountDetail(data)
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
                                    return error.response.data.error_description;
                                } catch (e) {
                                    return 'Service in maintenance.'
                                }
                            }
                    });

                    dispatch(creatorAuthentications.logout());
                    localStorage.removeItem('user');
                    data.history.push('/');
                }
            );
    };

    function request(data) { return { type: actionAccounts.GET_ACCOUNT_REQUEST, data } }
    function success(payload) { return { type: actionAccounts.GET_ACCOUNT_SUCCESS, payload } }
    function failure(error) {
        let emsg = '';
        try {
            emsg = error.response.data.message
        } catch (e) {
            emsg = 'Service in maintenance.'
        }

        return {
            type: actionAccounts.GET_ACCOUNT_FAILURE, payload: { message: emsg }
        }
    }
}
