import { combineReducers } from 'redux-immutable';

import countdown from './countdown';

const ui = combineReducers({
  countdown,
});

export default ui;
