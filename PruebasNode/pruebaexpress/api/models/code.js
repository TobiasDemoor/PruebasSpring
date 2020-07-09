const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    language: String,
    body: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Code', codeSchema);