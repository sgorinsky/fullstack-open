const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response, next) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
        .catch(error => next(error))
})

blogsRouter.get('/:id', (request, response, next) => {
    Blog.findById(request.params.id)
        .then(blog => {
            if (blog) {
                response.json(blog.toJSON())
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

blogsRouter.post('/', (request, response, next) => {
    const blog = new Blog(request.body)
    console.log(blog)
    
    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
        .catch(error => next(error))
})

blogsRouter.delete('/:id', (request, response, next) => {
    Blog
        .findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

// delete all
/*
blogsRouter.delete('/', (request, response, next) => {
    Blog
        .deleteMany({})
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})
*/

module.exports = blogsRouter;