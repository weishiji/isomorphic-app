import { Countdown } from 'actions';
import { combineReducers } from 'redux-immutable';

const counter = (state = {}, { type, payload }) => {
  switch (type) {
    case Countdown.START_COUNTDOWN:
      return {
        ...state,
        [payload]: 59,
      };
    case Countdown.UPDATE_COUNTDOWN:
      return {
        ...state,
        [payload]: state[payload] - 1,
      };
    case Countdown.STOP_COUNTDOWN:
      return {
        ...state,
        [payload]: 1000000,
      };
    default:
      return state;
  }
};


export default combineReducers({
  counter,
});
