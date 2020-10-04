import { actionModals } from "../action";

const initialState = { logoutOpen: false };

export function reducerModal(state = initialState, action) {
    switch (action.type) {
        case actionModals.OPEN_LOGOUT:
            state.logoutOpen = true;
            return state;
        case actionModals.CLOSE_LOGOUT:
            state.logoutOpen = false;
            return state;
        default:
            return state
    }
}
