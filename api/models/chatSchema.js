var mongoose = require("mongoose");

// create instance of Schema
var mongoSchema = mongoose.Schema;
// create schema
var chatSchema = new mongoSchema({
    "message": { type: String, required: true },
    "userid": { type: String, required: true },
    "date": { type: Date, default: Date.now }
});

module.exports = mongoose.model('userChat',chatSchema);