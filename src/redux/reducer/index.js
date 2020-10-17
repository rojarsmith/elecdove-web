import { combineReducers } from 'redux';
import { reducerAccount } from "./ReducerAccount";
import { reducerAuthentication } from "./ReducerAuthentication";
import { reducerMessage } from "./ReducerMessage";
import { reducerModal } from "./ReducerModal";

const allReducer = combineReducers({
    account: reducerAccount,
    authentication: reducerAuthentication,
    message: reducerMessage,
    modal: reducerModal
});

export default allReducer;