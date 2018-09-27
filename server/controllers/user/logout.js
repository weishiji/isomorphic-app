module.exports = (req, res, next) => {
  // 模拟异步登录（http || mysql）
  setTimeout(() => {
    req.session.user = '';
    res.json({
      code: 0,
      message: 'success',
    });
  }, 1000);
};
