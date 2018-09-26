module.exports = (req, res, next) => res.json(req.session.user);
