import { actionRoles } from "../action";

const initialState = {};

export function reducerRole(state = initialState, action) {
    switch (action.type) {
        case actionRoles.ROLE_MULTI_ALL_REQUEST:
            state.response = false;
            state.responseOK = false;
            state.responseData = '';
            state.loading = true;
            return state;
        case actionRoles.ROLE_MULTI_ALL_SUCCESS:
            state.response = true;
            state.responseOK = true;
            state.responseData = action.body;
            state.loading = false;
            state.allRoles = action.body;
            let rolesFlat = state.allRoles.map((ro) => {
                return ro.permissionList.map((item2) => { return item2.code })
            }).flat()
            let pAllow = [...(new Set(rolesFlat))];
            state.allRolesflat = pAllow;
            return state;
        case actionRoles.ROLE_MULTI_ALL_FAILURE:
            state.response = true;
            state.responseOK = false;
            state.responseData = action.data.message;
            state.loading = false;
            return state;

        default:
            return state
    }
}