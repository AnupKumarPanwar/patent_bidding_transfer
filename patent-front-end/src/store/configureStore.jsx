import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import mergeReducers from "./reducer/reducers";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  mergeReducers,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;