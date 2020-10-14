import { actionAccounts } from "../action";

const initialState = {};

export function reducerAccount(state = initialState, action) {
    switch (action.type) {
        case actionAccounts.GET_USER_REQUEST:
            state.response = false;
            state.responseSuccess = false;
            state.responseData = '';
            state.loading = true;
            return state;
        case actionAccounts.GET_USER_SUCCESS:
            state.response = true;
            state.responseSuccess = true;
            state.responseData = action.payload;
            state.loading = false;
            return state;
        case actionAccounts.GET_USER_FAILURE:
            state.response = true;
            state.responseSuccess = false;
            state.responseData = action.payload.message;
            state.loading = false;
            return state;
        default:
            return state
    }
}