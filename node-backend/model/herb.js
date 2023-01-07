const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let herb = new Schema({
    name: {
        type: String
    }
})

module.exports = mongoose.model('herb', herb);