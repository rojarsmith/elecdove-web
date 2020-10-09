import { actionMessages } from "../action";

const initialState = { type: '' };

export function reducerMessage(state = initialState, action) {
    switch (action.type) {
        case actionMessages.TO_MESSAGE:
            state.type = action.action.type;
            return state;
        case actionMessages.INITIAL_MESSAGE:
            state.type = '';
            return state;
        default:
            return state
    }
}
