const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        unique: true,
    },
});

const Data = mongoose.model('data', dataSchema);
module.exports = Data;