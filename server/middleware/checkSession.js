/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * 检测是否有登录权限
 */
module.exports = (req, res, next) => (req.session && req.session.user) ? next() : res.status(401).json('Unauthorized');
