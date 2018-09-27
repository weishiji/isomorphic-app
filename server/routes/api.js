import express from 'express';
import controllers from '../controllers';
import middlewares from '../middleware';


const router = express.Router();

// 用户信息
router.post('/user', controllers.user.login);
router.get('/user', middlewares.checkSession, controllers.user.userInfo);
router.delete('/user', middlewares.checkSession, controllers.user.logout);

module.exports = router;
