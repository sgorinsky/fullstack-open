const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const blogSchema = mongoose.Schema({
    author: String,
    title: {
        type: String,
        unique: true
    },
    body: String,
    url: {
        type: String,
        required: false
    },
    likes: {
        type: Number,
        default: 0
    },
    id: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    usersLiked: {}
})
blogSchema.plugin(uniqueValidator);
blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema);