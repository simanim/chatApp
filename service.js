var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var router = require('./api/route/router.js');
var socket = require('socket.io');
var users = require('./api/controller/userController')

mongoose.connect('mongodb://localhost:27017/userdb',{ useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended": false }));
app.use('/', router);
app.use(express.static('./public'))

var server = app.listen(4200);
console.log("Listening to PORT 4200");

var io = socket(server);
io.on('connection', function(client) {
    console.log("system responding");
    
    client.on('disconnected', function() {
        console.log("disconnected");
    })
    client.on('tobackend', function(data) {
        users.chatList(data.userid, data.email, data.message, data.date);
        io.emit('tofrontend',data)
    })
    client.on('peertobackend', function(data) {
        users.peerchatList(data.senId, data.recId, data.senEmail, data.recEmail, data.message, data.date);
        io.emit(data.recId,data)
    })
});