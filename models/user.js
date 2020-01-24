const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        required: [true, 'please enter a username'],
        type: String,
        unique: true
    },
    firstname: {
        required: [true, 'please enter a first name'],
        type: String
    },
    lastname: {
        required: [true, 'please enter a last name'],
        type: String
    },
    email: {
        type: String,
        unique: true,
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please add a valid email"
        ]
    },
    password: {
        required: [true, 'please enter a password'],
        type: String,
        unique: true
    },
    birthdate: {
        required: true,
        type: Date
    },
    deactivated: {
        type: Boolean,
        default: false,
    },
    file: {
        type: String
    },
    bio: {
        type: String
    },
    admin: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('User', UserSchema)