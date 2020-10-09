import { combineReducers } from 'redux';
import { reducerAuthentication } from "./ReducerAuthentication";
import { reducerMessage } from "./ReducerMessage";
import { reducerModal } from "./ReducerModal";

const allReducer = combineReducers({
    authentication: reducerAuthentication,
    message: reducerMessage,
    reducer: reducerModal
});

export default allReducer;