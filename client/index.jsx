import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';
import Loadable from 'react-loadable';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from 'reducers';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from 'theme';
import routes from 'app/routes';

const history = createHistory();
const routeMiddleware = routerMiddleware(history);

const preloadedState = window.__PRELOADED_STATE__;

console.log(preloadedState, 'this is pre');

// delete window.__PRELOADED_STATE__;

let store;
if (!(window.__REDUX_DEVTOOLS_EXTENSION__ || window.__REDUX_DEVTOOLS_EXTENSION__)) {
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
      ), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
}

const App = () => (
  <MuiThemeProvider theme={createMuiTheme(theme)}>
    <CssBaseline />
    <Provider store={store}>
      <BrowserRouter>
        {renderRoutes(routes)}
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>
);

window.main = () => {
  Loadable.preloadReady().then(() => {
    hydrate(<App />, global.document.getElementById('root'), () => {
      const ssStyles = global.document.getElementById('jss-server-side');
      ssStyles.parentNode.removeChild(ssStyles);
    });
    window._ASYNC_FETCH = true;
  });
};
