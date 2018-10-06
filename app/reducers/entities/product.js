import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { Product } from 'actions';

// 商品列表
const list = (state = fromJS([]), { type, payload }) => {
  switch (type) {
    case Product.LOAD_PRODUCT_LIST_SUCCESS:
      return payload.get('list');
    default:
      return state;
  }
};
export default combineReducers({
  list,
});
