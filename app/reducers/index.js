import { combineReducers } from 'redux-immutable';
import { reducer as form } from 'redux-form/immutable';

import ui from './ui';
import entities from './entities';

const rootReducer = combineReducers({
  ui,
  form,
  socket,
  entities,
});

export default rootReducer;
