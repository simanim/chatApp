var express= require('express');
var router=express.Router();
var users=require('../controller/userController');
var auth=require('../authentication');

router.get('/users/:id/userlist',auth, users.listOfUsers);
router.get('/users/getChat',auth, users.getChat);
router.get('/users/:id/peergetChat/:recId',auth, users.peergetChat);

module.exports = router;