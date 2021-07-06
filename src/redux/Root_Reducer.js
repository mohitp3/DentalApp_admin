import { combineReducers } from "redux";

import appointmentReducer from './Reducer';


const rootReducer = combineReducers({
    data:appointmentReducer
})


export default rootReducer;