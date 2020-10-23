import { actionModals, actionRoles } from "../action";
import RoleService from "service/RoleService";

export const creatorRoles = {
    roleMultiAll
};

function roleMultiAll() {
    return async dispatch => {
        dispatch(request());

        await RoleService.roleMultiAll()
            .then(
                body => {
                    dispatch(success(body));
                    return Promise.resolve(true);
                },
                error => {
                    dispatch(failure(error));
                    dispatch({
                        type: actionModals.OPEN_SIMPLE, action:
                            () => {
                                try {
                                    if (error.response.data.message) {
                                        console.log(error.response.data.message);
                                    }
                                    return 'Update failed';
                                } catch (e) {
                                    return 'Service in maintenance.'
                                }
                            }
                    });
                    return Promise.reject();
                }
            );
    };

    function request(data) { return { type: actionRoles.ROLE_MULTI_ALL_REQUEST, data } }
    function success(body) { return { type: actionRoles.ROLE_MULTI_ALL_SUCCESS, body } }
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
            type: actionRoles.ROLE_MULTI_ALL_FAILURE, data: { message: emsg }
        }
    }
}
