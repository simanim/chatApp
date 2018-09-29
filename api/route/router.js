var express = require('express');
var router = express.Router();
//var app = express();
var users = require('../controller/userController.js');
var authRouter=require("./authRouter.js");
// router.get('/:id/userlist',users.listOfUsers);
router.use('/auth',authRouter)
router.post("/login", users.login);
router.post('/register', users.registration);
//router.use('/auth',authRouter);
 //app.use('/', router)
module.exports = router;