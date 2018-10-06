import { network } from 'utils';
import config from '../../config';

module.exports = (req, res, next) => {
  network
    .get(`${config.rest}/productindex`)
    .then((data) => {
      res.json(data);
    })
    .catch(err => next(err));
};
