var express= require('express');
var router=express.Router();
var users=require('../controller/userController');
var auth=require('../authentication');

router.get('/users/:id/userlist',auth, users.listOfUsers);

module.exports = router;