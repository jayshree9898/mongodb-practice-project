const router = require('express').Router();

const userRouter = require('./user.router');

router.use(userRouter);

module.exports = router