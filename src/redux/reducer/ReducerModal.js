import { actionModals } from "../action";

const initialState = {
    logoutOpen: false,
    termsOpen: false,
    simpleOpen: false,
    errorOpen: false
};

export function reducerModal(state = initialState, action) {
    let atLeastOneOpened = false;
    for (let [key, value] of Object.entries(state)) {
        if (key && value === true) {
            atLeastOneOpened = true;
            break;
        }
    }

    switch (action.type) {
        case actionModals.OPEN_ERROR:
            if (!atLeastOneOpened) state.errorOpen = true;
            state.message = action.action;
            return state;
        case actionModals.CLOSE_ERROR:
            state.errorOpen = false;
            return state;
        case actionModals.OPEN_LOGOUT:
            if (!atLeastOneOpened) state.logoutOpen = true;
            return state;
        case actionModals.CLOSE_LOGOUT:
            state.logoutOpen = false;
            return state;
        case actionModals.OPEN_SIMPLE:
            if (!atLeastOneOpened) state.simpleOpen = true;
            state.message = action.action;
            return state;
        case actionModals.CLOSE_SIMPLE:
            state.simpleOpen = false;
            return state;
        case actionModals.OPEN_TERMS:
            if (!atLeastOneOpened) state.termsOpen = true;
            return state;
        case actionModals.CLOSE_TERMS:
            state.termsOpen = false;
            return state;
        default:
            return state
    }
}
