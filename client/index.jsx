import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import Loadable from 'react-loadable';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from 'theme';
import routes from 'app/routes';

import store from './store';


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

global.main = () => {
  Loadable.preloadReady().then(() => {
    hydrate(<App />, global.document.getElementById('root'), () => {
      const ssStyles = global.document.getElementById('jss-server-side');
      ssStyles.parentNode.removeChild(ssStyles);
    });
    global._ASYNC_FETCH = true;
  });
};
