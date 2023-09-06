const express = require("express");
const router = express.Router();
const resultRoute = require('./result.route');
const testRoute = require('./test.route');
const userRoute = require('./user.route');
const authRoute = require('./auth.route');

router.use('/auth',authRoute);
router.use('/tests',testRoute);
router.use('/users',userRoute);
router.use('/results',resultRoute);

module.exports = router ;
