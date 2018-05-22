const prefix = 'COUNTDOWN';

const START_COUNTDOWN = `${prefix}.START_COUNTDOWN`;
const UPDATE_COUNTDOWN = `${prefix}.UPDATE_COUNTDOWN`;
const STOP_COUNTDOWN = `${prefix}.STOP_COUNTDOWN`;
const update = countType => ({
  type: UPDATE_COUNTDOWN,
  payload: countType,
});

const timeHandler = {};

const start = countType => (dispatch, getState) => {
  dispatch({
    type: START_COUNTDOWN,
    payload: countType,
  });
  timeHandler[countType] = setInterval(() => {
    if (getState().getIn(['ui', 'countdown', 'counter'])[countType] <= 1) {
      dispatch({
        type: STOP_COUNTDOWN,
        payload: countType,
      });
      clearInterval(timeHandler[countType]);
    } else {
      dispatch(update(countType));
    }
  }, 1000);
};


export default {
  START_COUNTDOWN,
  UPDATE_COUNTDOWN,
  STOP_COUNTDOWN,
  start,
};
