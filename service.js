var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var router = require('./api/route/router.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended": false }));
app.use('/', router);
app.use(express.static('./public'))
mongoose.connect('mongodb://localhost:27017/userdb',{ useNewUrlParser: true });
app.listen(3000);
console.log("Listening to PORT 3000");