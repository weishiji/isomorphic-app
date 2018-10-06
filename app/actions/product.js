import { network } from 'utils';
import config from 'config';
import { fromJS } from 'immutable';

const prefix = 'PRODUCT';

const LOAD_PRODUCT_LIST_REQUEST = `${prefix}.LOAD_PRODUCT_LIST_REQUEST`;
const LOAD_PRODUCT_LIST_SUCCESS = `${prefix}.LOAD_PRODUCT_LIST_SUCCESS`;
const LOAD_PRODUCT_LIST_FAIL = `${prefix}.LOAD_PRODUCT_LIST_FAIL`;

const list = () => (dispatch) => {
  dispatch({
    type: LOAD_PRODUCT_LIST_REQUEST,
  });
  return network.get(`${config.api}/productindex`)
    .then(fromJS)
    .then(result => dispatch({
      payload: result,
      type: LOAD_PRODUCT_LIST_SUCCESS,
    }))
    // .catch(error => console.log(error, 'ssfsfsfsf'));
    .catch(error => dispatch({
      payload: error,
      type: LOAD_PRODUCT_LIST_FAIL,
    }));
};

export default {
  LOAD_PRODUCT_LIST_REQUEST,
  LOAD_PRODUCT_LIST_SUCCESS,
  list,
};
