import { combineReducers } from 'redux';

import { reducerAuthentication } from "./ReducerAuthentication";

const allReducer = combineReducers({
    authentication: reducerAuthentication
});

export default allReducer;