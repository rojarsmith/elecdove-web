import {
    ACT1,
    ACT2
} from './actions';

export function account(
    state = {
        authenticated: false,
        currentUser: null,
        loading: false
    },
    action) {
    console.log('account', state, action);
    switch (action.type) {
        case ACT1:
            state.authenticated = true;
            return state;
        case ACT2:
            state.authenticated = false;
            return state;
        default: return state;
    };
};