import React from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';

import pageRoot from './pages/index';

const loading = props => props.error ? (<div>PreLoad Javascirpt Error</div>) : null;
loading.propTypes = {
  error: PropTypes.any,
};
// https://github.com/webpack/webpack/issues/3496
// https://github.com/hpherzog/require-ensure-shim
if (typeof (require.ensure) !== 'function') {
  require.ensure = (modules, callback) => {
    callback(require);
  };
}

const Home = Loadable({
  loader: () => import('./pages/Home'),
  loading,
});
const Profile = Loadable({
  loader: () => import('./pages/Profile'),
  loading,
});

const ProductList = Loadable({
  loader: () => import('./pages/ProductList'),
  loading,
});

const ProductDetail = Loadable({
  loader: () => import('./pages/ProductDetail'),
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
      {
        path: '/home',
        exact: true,
        component: Home,
      },
      {
        path: '/profile',
        exact: true,
        component: Profile,
      },
      {
        path: '/product',
        exact: true,
        component: ProductList,
      },
      {
        path: '/product/:id',
        exact: true,
        component: ProductDetail,
      },
    ],
  },

];

export default routes;
