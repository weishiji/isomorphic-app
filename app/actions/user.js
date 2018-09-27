import { network } from 'utils';
import config from 'config';
import { fromJS } from 'immutable';

const prefix = 'USER';

const LOAD_USERINFO_REQUEST = `${prefix}.LOAD_USERINFO_REQUEST`;
const LOAD_USERINFO_SUCCESS = `${prefix}.LOAD_USERINFO_SUCCESS`;
const LOAD_USERINFO_FAIL = `${prefix}.LOAD_USERINFO_FAIL`;

const load = user => (dispatch) => {
  if (user) {
    return dispatch({
      payload: fromJS(user),
      type: LOAD_USERINFO_SUCCESS,
    });
  }
  dispatch({
    type: LOAD_USERINFO_REQUEST,
  });
  return network.get(`${config.api}/user`)
    .then(fromJS)
    .then(result => dispatch({
      payload: result,
      type: LOAD_USERINFO_SUCCESS,
    }))
    .catch(error => dispatch({
      payload: error,
      type: LOAD_USERINFO_FAIL,
    }));
};

const logout = () => (dispatch) => {
  return network.del(`${config.api}/user`)
    .then(() => dispatch({
      payload: fromJS({}),
      type: LOAD_USERINFO_SUCCESS,
    }));
};

const login = () => (dispatch) => {
  return network.post(`${config.api}/user`)
    .then(fromJS)
    .then(result => dispatch({
      payload: result,
      type: LOAD_USERINFO_SUCCESS,
    }));
};

export default {
  LOAD_USERINFO_REQUEST,
  LOAD_USERINFO_SUCCESS,
  load,
  logout,
  login,
};
