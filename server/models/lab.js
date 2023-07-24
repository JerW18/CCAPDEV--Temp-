const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const labSchema = new Schema({
    labCode:{
        type: String,
        required: true,
        unique: true
    },
    labTables:{
        type: Array,
        required: true
    }
});

module.exports = mongoose.model('Lab', labSchema);