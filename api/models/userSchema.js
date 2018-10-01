var mongoose = require("mongoose");

/**
 *@description creating instance of Schema
 */
var mongoSchema = mongoose.Schema;

/**
 *@description creating a Schema for store user details
 */
var userSchema = new mongoSchema({
    "firstname": { type: String,  required: true },
    "lastname": { type: String,  required: true },
    "email": { type: String, required: true },
    "password": { type: String, required: true }
});

module.exports = mongoose.model('userLogin',userSchema);