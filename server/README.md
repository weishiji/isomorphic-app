# serser篇

├── README.md
├── config
├── controllers
├── index.js
├── middleware
├── public
├── routes
└── views

说明
-----
增加api接口代理，权限控制等

config
--------

```javascript
module.exports = {
  development: {
    redis: {
      host: '127.0.0.1',
      port: 6379,
      db: 1,
    },
  },
  production: {
    redis: {
      host: '127.0.0.1',
      port: 6379,
      db: 1,
    },
  },
};

```

controllers
-------

```javascript
module.exports = (req, res, next) => res.json(req.session.user);
```

middleware
----------

```javascript
module.exports = (req, res, next) => (req.session && req.session.user) ? next() : res.status(401).json('Unauthorized');
```

敲黑板划重点 routes
-------------

```javascript
// api.js
router.post('/user', controllers.user.login);
router.get('/user', middlewares.checkSession, controllers.user.userInfo);
// ssr.js

```

redis使用
---------------
```javascript
// session
app.use(session({
  store: new RedisStore(config.redis),
  secret: 'isomorphic',
  resave: false,
  saveUninitialized: false,
}));
```



