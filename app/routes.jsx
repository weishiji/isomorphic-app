'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';

import pageRoot from './pages/index';

const loading = (props) => {
  return props.error ? (<div>PreLoad Javascirpt Error</div>) : null;
};
loading.propTypes = {
  error : PropTypes.any,
};
//https://github.com/webpack/webpack/issues/3496
//https://github.com/hpherzog/require-ensure-shim
if (typeof (require.ensure) !== 'function') {
  require.ensure = function (modules, callback) {
    callback(require);
  };
}

const Home = Loadable({
  loader : () => import( /* webpackChunkName: 'home' */ './pages/Home'),
  loading,
});

const routes = [
  {
    component: pageRoot,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home,
      },
    ],
  },

];

export default routes;
