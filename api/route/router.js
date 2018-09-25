var express = require('express');
var router = express.Router();
var app = express();
var users = require('../controller/userController.js');
router.post("/login", users.login);
router.post('/register', users.registration);
app.use('/', router);

module.exports = router;