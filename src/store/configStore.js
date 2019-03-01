import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import groupsReducer from "./reducers/groups";
import photosReducer from "./reducers/photos";
import loadingReducer from "./reducers/loading";

const rootReducer = combineReducers({
  groups: groupsReducer,
  photos: photosReducer,
  loading: loadingReducer
});

const middlewares = [thunk];
let composeEnhancers = compose;
composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const storeConfig = () => {
  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middlewares))
  );
};
export default storeConfig;

