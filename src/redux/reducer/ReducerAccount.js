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
            state.user = action.payload;
            return state;
        case actionAccounts.GET_USER_FAILURE:
            state.response = true;
            state.responseSuccess = false;
            state.responseData = action.payload.message;
            state.loading = false;
            return state;

        case actionAccounts.GET_CURRENT_INITIAL:
            return state;
        case actionAccounts.GET_CURRENT_REQUEST:
            state.response = false;
            state.responseOK = false;
            state.responseData = '';
            state.loading = true;
            delete state.account;
            return state;
        case actionAccounts.GET_CURRENT_SUCCESS:
            state.response = true;
            state.responseOK = true;
            state.responseData = action.data;
            state.loading = false;
            state.account = action.data;
            return state;
        case actionAccounts.GET_CURRENT_FAILURE:
            state.response = true;
            state.responseOK = false;
            state.responseData = action.data.message;
            state.loading = false;
            delete state.account;
            return state;

        case actionAccounts.UPDATE_ACCOUNT_DETAIL_REQUEST:
            state.response = false;
            state.responseOK = false;
            state.responseData = '';
            state.loading = true;
            return state;
        case actionAccounts.UPDATE_ACCOUNT_DETAIL_SUCCESS:
            state.response = true;
            state.responseOK = true;
            state.responseData = action.data;
            state.loading = false;
            return state;
        case actionAccounts.UPDATE_ACCOUNT_DETAIL_FAILURE:
            state.response = true;
            state.responseOK = false;
            state.responseData = action.data.message;
            state.loading = false;
            return state;

        case actionAccounts.GET_ACCOUNT_REQUEST:
            state.response = false;
            state.responseSuccess = false;
            state.responseData = '';
            state.loading = true;
            return state;
        case actionAccounts.GET_ACCOUNT_SUCCESS:
            state.response = true;
            state.responseSuccess = true;
            state.responseData = action.payload;
            state.loading = false;
            return state;
        case actionAccounts.GET_ACCOUNT_FAILURE:
            state.response = true;
            state.responseSuccess = false;
            state.responseData = action.payload.message;
            state.loading = false;
            return state;

        case actionAccounts.USER_ALL_REQUEST:
            state.response = false;
            state.responseOK = false;
            state.responseData = '';
            state.loading = true;
            return state;
        case actionAccounts.USER_ALL_SUCCESS:
            state.response = true;
            state.responseOK = true;
            state.responseData = action.body;
            state.loading = false;
            state.userAll = action.body;
            return state;
        case actionAccounts.USER_ALL_FAILURE:
            state.response = true;
            state.responseOK = false;
            state.responseData = action.data.message;
            state.loading = false;
            return state;

        default:
            return state
    }
}