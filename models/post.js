const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'please enter a body']
    },
    _user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    _hobby: {
        type: Schema.Types.ObjectId,
        ref: 'Hobby'
    },
    _event: {
        type: Schema.Types.ObjectId,
        ref: 'Event'
    },
    deactivated: {
        type: Boolean,
        default: false
    },
    file: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Post', PostSchema)