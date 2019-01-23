const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String },
    username: { type: String },
    mobile: { type: String },
    password: { type: String },
    address: { type: String },
    nationality: { type: String },
    publicKey: { type: String }
});

module.exports = mongoose.model('Users', UserSchema, 'user_collection');