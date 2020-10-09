import { actionModals } from "../action";

const initialState = { logoutOpen: false, termsOpen: false, errorOpen: false };

export function reducerModal(state = initialState, action) {
    switch (action.type) {
        case actionModals.OPEN_ERROR:
            state.errorOpen = true;
            state.message = action.action;
            return state;
        case actionModals.CLOSE_ERROR:
            state.errorOpen = false;
            return state;
        case actionModals.OPEN_LOGOUT:
            state.logoutOpen = true;
            return state;
        case actionModals.CLOSE_LOGOUT:
            state.logoutOpen = false;
            return state;
        case actionModals.OPEN_TERMS:
            state.termsOpen = true;
            return state;
        case actionModals.CLOSE_TERMS:
            state.termsOpen = false;
            return state;
        default:
            return state
    }
}
