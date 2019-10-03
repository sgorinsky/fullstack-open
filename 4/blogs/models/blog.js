const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    author: String,
    title: {
        type: String,
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
    id: String
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema);