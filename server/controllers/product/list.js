import { network } from 'utils';
import config from '../../config';

module.exports = (req, res, next) => {
  network
    .get(`${config.rest}/productindex`, {
      with: 'designer',
      limit: 32,
    })
    .then((data) => {
      res.json(data);
    })
    .catch(err => next(err));
};
