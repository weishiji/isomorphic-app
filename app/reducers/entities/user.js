import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { User } from 'actions';

// 个人信息
const info = (state = fromJS({}), { type, payload }) => {
  switch (type) {
    case User.LOAD_USERINFO_SUCCESS:
      return payload;
    default:
      return state;
  }
};
export default combineReducers({
  info,
});
