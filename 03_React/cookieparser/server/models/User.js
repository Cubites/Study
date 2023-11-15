const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const salfRounds = 10;

const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String
    }
});

userSchema.pre('save', (next) => {
    let user = this;
    console.log(user);
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = { User };