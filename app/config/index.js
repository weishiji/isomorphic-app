require('dotenv').config('../../.env');

const host = process.env.HOST.replace(/(https)(:\/\/.*)/g, (str, $1, $2) =>
  process.env.HOME ? `http${$2}` : $1 + $2);
const config = {
  api_host: `${host}${process.env.API_PORT !== 80 ? `:${process.env.API_PORT}` : ''}/api`,
};

export default config;
