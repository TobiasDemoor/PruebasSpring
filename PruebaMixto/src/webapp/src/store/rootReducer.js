import {combineReducers} from "redux";
import userReducer from './user/userReducer';
import groupsReducer from './groups/groupsReducer';

const rootReducer = combineReducers({
    user: userReducer,
    groups: groupsReducer
})

export default rootReducer;
