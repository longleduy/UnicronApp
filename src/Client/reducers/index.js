import { combineReducers } from 'redux'
import user_info from './user_info'
import {
    ConnectedRouter,
    routerReducer,
    routerMiddleware,
    push
} from "react-router-redux";
const myReducer = combineReducers({
    user_info,
    router: routerReducer
})
export default myReducer;