import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import authReducer from "./Auth/reducer";
import commonReducer from "./Common/reducer";
import viewReducer from "./View/reducer";
import { watchAuth } from "./Auth/sagaWatcher";
import { watchView } from "./View/sagaWatcher";

const rootReducer = combineReducers({
  Auth: authReducer,
  Common: commonReducer,
  View: viewReducer,
});

const logger = (state) => {
  return (next) => {
    return (action) => {
      // console.log('[middleware] dispatching', action);

      next(action);
    };
  };
};

const composeEnhancers =
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true,
      traceLimit: 25,
    })) ||
  compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(logger, sagaMiddleware))
);

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchView);

export default store;
