// import { network } from 'utils';

module.exports = (req, res, next) => {
  // 模拟异步登录（http || mysql）
  setTimeout(() => {
    const userInfo = {
      username: 'Admin',
      userId: 1,
    };
    req.session.user = userInfo;
    res.json(userInfo);
  }, 1000);
  // network
  //   .post('', {
  //     userName: req.body.username,
  //     password: req.body.password,
  //   })
  //   .then((userInfo) => {
  //     req.session.user = userInfo;
  //     res.json(userInfo);
  //   })
  //   .catch(err => next(err));
};
