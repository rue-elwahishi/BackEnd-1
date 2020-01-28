const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    content: {
        type: String,
        required: [true, 'please enter a body']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    hobby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hobby'
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'event'
    },
    deactivated: {
        type: Boolean,
        default: false
    },
    file: {
        type: String
    }
})

module.exports = mongoose.model('post', PostSchema)