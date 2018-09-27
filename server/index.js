import 'ignore-styles';

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, './../.env') });
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const errorhandler = require('errorhandler');
const cookieParser = require('cookie-parser');
const express = require('express');
const cluster = require('cluster');

const app = express();
const Loadable = require('react-loadable');
const timeout = require('connect-timeout');

const api = require('./routes/api');
const ssr = require('./routes/ssr');
const config = require('./config/index');
// CPU
const cpus = require('os').cpus().length;

const haltOnTimedout = (req, res, next) => {
  if (!req.timedout) next();
};

// set view directory
app.set('views', path.join(__dirname, 'views'));

// use pug as view engine
app.set('view engine', 'pug');

app.use(timeout('25s'));

app.use(haltOnTimedout);

// compress everything
app.use(compression());

// session
app.use(session({
  store: new RedisStore(config.redis),
  secret: 'isomorphic',
  resave: false,
  saveUninitialized: false,
}));


// security patch
app.use(helmet());

// corss domain setting
app.use(cors({
  origin: [
    `${process.env.HOST}:${process.env.PORT}`,
    `${process.env.HOST}`,
  ],
  credentials: true,
}));

// logs on console
app.use(morgan('dev'));

// parse json
app.use(bodyParser.json({ limit: '50mb' }));

// parse url encoding
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// use cookie
app.use(cookieParser());

// errorhandler
if (process.env.NODE_ENV === 'development') {
  app.use(errorhandler());
}
app.use(haltOnTimedout);

// server side rendering
app.use(ssr);

// api 所有接口都是以api为开头
app.use('/api', api);

// spicify the public folder
app.use(express.static(path.join(__dirname, 'public'), {
  options: {
    maxAge: 3600000,
  },
}));


// creative 健康监测
app.use('/creative/health', (req, res) => res.send('OK'));

// 404
app.use((req, res) => res.status(404).end());


// 500
app.use((err, req, res) => {
  console.error('-------------------');
  console.error(err);
  console.error('-------------------');

  res.status(500).json(err);
});
// 504
app.use((err, req, res) => res.status(504).json(err));


// 子进程监听消息处理函数
const workerListener = (msg) => {
  if (msg.access) console.log('user access %s, worker [%d]', msg.access, msg.workerid);
};
// fork新的子进程函数
const forkWorker = (listener) => {
  const worker = cluster.fork();
  console.log('worker [%d] has been created', worker.process.pid);
  worker.on('message', listener);
  return worker;
};

// Cluster处理
if (cluster.isMaster) {
  for (let i = 0; i < cpus / 2; i += 1) {
    forkWorker(workerListener);
  }
} else {
  // 通过LoadAble预加载code split 组建后再启动服务
  Loadable.preloadAll().then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Express server started on port:${port} and env:${process.env.NODE_ENV}`);
    });
  }).catch(e => console.log(e, 'start server error'));
}
// Cluster收到子进程退出消息
cluster.on('exit', (worker, code, signal) => {
  console.log('worker [%d] died %s, fork a new one.', worker.process.pid, code || signal);
  forkWorker(workerListener);
});
// Cluster收到子进程运行消息
cluster.on('online', (worker) => {
  console.log('worker [%d] is running.', worker.process.pid);
});
