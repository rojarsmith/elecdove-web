import { combineReducers } from 'redux';
import { reducerAuthentication } from "./ReducerAuthentication";
import { reducerModal } from "./ReducerModal";

const allReducer = combineReducers({
    authentication: reducerAuthentication,
    reducer: reducerModal
});

export default allReducer;