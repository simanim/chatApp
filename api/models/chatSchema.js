var mongoose = require("mongoose");

/**
 *@description creating instance of Schema
 */
var mongoSchema = mongoose.Schema;

/**
 *@description creating a Schema for chat storage
 */
var chatSchema = new mongoSchema({
    "userid" :{ type: String, required: true },
    "message": { type: String, required: true },
    "email": { type: String, required: true },
    "date": { type: Date, default: Date.now }
});

module.exports = mongoose.model('userChat',chatSchema);