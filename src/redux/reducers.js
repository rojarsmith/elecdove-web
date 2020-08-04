import {
    LOADING_BEGIN,
    LOADING_COMPLETED,
    SET_CURRENT_PERSON,
    ACT1,
    ACT2
} from './actions';

export function personReducer(
    state = {
        authenticated: false,
        currentUser: null,
        loading: false
    },
    action) {
    console.log('personReducer', state, action);
    switch (action.type) {        
        case LOADING_BEGIN:
            state.loading = true;
            return state;
        case LOADING_COMPLETED:
            state.loading = false;
            return state;
        case SET_CURRENT_PERSON:
            state.authenticated = true;
            return state;
        case ACT1:
            state.authenticated = true;
            return state;
        case ACT2:
            state.authenticated = false;
            return state;
        default: return state;
    };
};