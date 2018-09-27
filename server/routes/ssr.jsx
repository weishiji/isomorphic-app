import fs from 'fs';
import path from 'path';
import express from 'express';
import React from 'react';
import { fromJS } from 'immutable';
import { Helmet } from 'react-helmet';
import { renderToString } from 'react-dom/server';
import pathToRegexp from 'path-to-regexp';

import { create } from 'jss';
import thunk from 'redux-thunk';
import Loadable from 'react-loadable';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { getBundles } from 'react-loadable/webpack';
import { createStore, applyMiddleware } from 'redux';
import { JssProvider, SheetsRegistry } from 'react-jss';
import StaticRouter from 'react-router-dom/StaticRouter';
import { MuiThemeProvider, createMuiTheme, createGenerateClassName, jssPreset } from '@material-ui/core/styles';

import theme from 'theme';
import routes from 'routes';
import reducers from 'reducers';

import stats from 'public/react-loadable.json';

import {
  Countdown as CountdownAction,
  User as UserAction,
} from 'actions';

const router = express.Router();

const defaultBunles =
  fs.existsSync(path.join(__dirname, '../public/react-loadable.json')) ?
    require('public/webpack-assets.json') :
    {
      vendors: {
        js: 'vendor.js',
        css: 'vendor.css',
      },
      runtime: {
        js: 'runtime.js',
      },
      client: {
        js: 'client.js',
      },
    };

// 从前端路有配置中读取所有的routes的path，匹配到后端路由中去
const routesPath = [];
const getPath = (_routes) => {
  _routes.map((route) => {
    if (route.path) {
      routesPath.push(route.path);
    }
    if (route.routes) {
      getPath(route.routes);
    }
    return null;
  });
};

getPath(routes);

router.get(routesPath, (req, res, next) => {
  const { path, url, query, params } = req;
  const store = createStore(reducers, applyMiddleware(thunk));

  if (url.match('api')) {
    return next();
  }
  // Create a sheetsRegistry instance.
  const sheetsRegistry = new SheetsRegistry();

  // Configure JSS
  const jss = create(jssPreset());
  jss.options.createGenerateClassName = createGenerateClassName;

  // preload data
  const promises = [];

  let userId = 0;
  // user session store
  if (req.session && req.session.user) {
    store.dispatch(UserAction.load(req.session.user));
    // userId = store.getState().user.data.userId;
  }
  /* eslint camelcase: "off" */
  let _async_fetch = true;

  if (path.match(pathToRegexp('/editorial/channel/:type(\\w+-\\d+-\\d+)'))) {
    _async_fetch = false;
    // promises.push(store.dispatch(EditorialChannelAction.fetch(params)));
  }

  return Promise.all(promises).then(() => {
    const context = {};
    const modules = [];
    const html = renderToString(
      <JssProvider registry={sheetsRegistry} jss={jss}>
        <MuiThemeProvider theme={createMuiTheme(theme)} sheetsManager={new Map()}>
          <Provider store={store}>
            <Loadable.Capture report={moduleName => modules.push(moduleName)}>
              <StaticRouter location={req.url} context={context}>
                {renderRoutes(routes)}
              </StaticRouter>
            </Loadable.Capture>
          </Provider>
        </MuiThemeProvider>
      </JssProvider>
    );

    const helmet = fromJS(Helmet.renderStatic())
      .map(item => item.toJS().toString())
      .valueSeq().filter(item => !!item)
      .toArray()
      .join('');

    const bundles = getBundles(stats, modules);
    const scripts = bundles
      .filter(bundle => bundle.file.endsWith('.js'))
      .map(item => item.file);
    const styles = bundles
      .filter(bundle => bundle.file.endsWith('.css'))
      .map(item => item.file);

    if (context.status === 404) {
      res.status(404);
    }
    if (context.status === 302) {
      return res.redirect(302, context.url);
    }

    // TODO:禁止服务端渲染
    res.render('index', {
      html: process.env.NODE_ENV === 'production' ? html : '',
      _async_fetch,
      helmet,
      preloadedState: JSON.stringify(store.getState())
        .replace(/</g, '\\u003c')
        .replace(/\u2028/g, '\\u2028')
        .replace(/\u2029/g, '\\u2029'),
      css: sheetsRegistry.toString(),
      scripts: [
        defaultBunles.vendors.js,
        defaultBunles.runtime.js,
        defaultBunles.client.js,
        ...scripts
      ],
      styles: [
        defaultBunles.vendors.css,
        ...styles,
      ],
      userId,
    });
    return null;
  });
});


module.exports = router;
