import {createStore,applyMiddleware} from "redux"
import logger from "redux-logger"
import thunk from "redux-thunk"

import rootReducer from './Root_Reducer'

const middleware = [thunk];

// if(process.env.Node_env === "development"){
    middleware.push(logger)
// }

const store = createStore(rootReducer,applyMiddleware(...middleware));
    
export default store;