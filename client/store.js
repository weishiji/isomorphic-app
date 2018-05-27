
import { fromJS } from 'immutable';
import rootReducer from 'reducers';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { createStore, applyMiddleware, compose } from 'redux';

const history = createHistory();
const routeMiddleware = routerMiddleware(history);

const preloadedState = global.__PRELOADED_STATE__;
delete global.__PRELOADED_STATE__;

let store;

if (!(global.__REDUX_DEVTOOLS_EXTENSION__ || global.__REDUX_DEVTOOLS_EXTENSION__)) {
  store = createStore(
    rootReducer,
    fromJS(preloadedState),
    applyMiddleware(
      routeMiddleware,
      thunkMiddleware,
    )
  );
} else {
  store = createStore(
    rootReducer,
    fromJS(preloadedState),
    compose(
      applyMiddleware(
        routeMiddleware,
        thunkMiddleware,
      ), global.__REDUX_DEVTOOLS_EXTENSION__ && global.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
}

const immutableStore = store;


export default immutableStore;
