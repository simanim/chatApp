var express = require('express');
var router = express.Router();
var app = express();
var users = require('../controller/userController.js');
var authRouter=require("./authRouter.js")
router.post("/login", users.login);
router.post('/register', users.registration);
//router.get("/users/:id/list",users.listOfUsers)
// app.use('/', router);
router.use('/auth',authRouter);
 
module.exports = router;