const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({});
        response.json(blogs.map(blog => blog.toJSON()));
    } catch (exception) {
        next(exception);
    }
})

blogsRouter.get('/:id', async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id);
        if (blog !== undefined) {
            response.json(blog.toJSON());
        } else {
            response.status(404).end()
        }
    } catch(error) {
        next(error);
    }
})

blogsRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request.body)

    try {
        const result = await blog.save()
        response.status(201).json(result.toJSON());
    } catch (error) {
        next(error);
    }
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