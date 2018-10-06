import { combineReducers } from 'redux-immutable';

import user from './user';
import product from './product';

export default combineReducers({
  user,
  product,
});
