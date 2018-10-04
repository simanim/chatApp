var mongoose = require("mongoose");

/**
 *@description creating instance of Schema
 */
var mongoSchema = mongoose.Schema;

/**
 *@description creating a Schema for chat storage
 */
var peerSchema = new mongoSchema({
    "senId" :{ type: String, required: true },
    "recId": { type: String, required: true },
    "senEmail" :{ type: String, required: true },
    "recEmail": { type: String, required: true },
    "message": { type: String, required: true },
    "date": { type: Date, default: Date.now }
});

module.exports = mongoose.model('peerChat',peerSchema);