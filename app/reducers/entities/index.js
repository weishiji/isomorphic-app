import { combineReducers } from 'redux-immutable';

const test = () => ({
  type: 'TEST',
});

const entities = combineReducers({
  test,
});

export default entities;
