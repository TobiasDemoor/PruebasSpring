const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
    name: String,
    age: Number,
    country: String
});

module.exports = mongoose.model('User', userSchema);