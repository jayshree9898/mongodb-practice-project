const router = require('express').Router();

const userController = require('../controller/user.controller');
const Auth = require('../middelware/auth')

router.post('/sign-up', userController.userSignup);

router.post('/login', userController.login);

router.get('/get-profile', Auth.AuthUser, userController.getProfile)

module.exports = router
