var express = require('express');
var router = express.Router();
var users = require('../controller/userController.js');
var authRouter=require("./authRouter.js");
router.use('/auth',authRouter)
router.post("/login", users.login);
router.post('/register', users.registration);
router.post('/forgotPass', users.forgotPass);
router.post('/changePass', users.changePass);
router.post('/chatList', users.chatList);
module.exports = router;