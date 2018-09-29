var mongoose = require("mongoose");

// create instance of Schema
var mongoSchema = mongoose.Schema;
// create schema
var userSchema = new mongoSchema({
    "firstname": { type: String,  required: true },
    "lastname": { type: String,  required: true },
    "email": { type: String, required: true },
    "password": { type: String, required: true }
});

module.exports = mongoose.model('userLogin',userSchema);