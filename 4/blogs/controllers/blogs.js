const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// REMEMBER:
// for a lot of these methods (the GETs, mainly), we are returning responses 
// if we want to get blogs, we have to check the response['body'] from the response we're returning

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
        if (blog) {
            response.json(blog.toJSON());
        } else {
            response.status(404).end()
        }
    } catch(error) {
        next(error);
    }
})

blogsRouter.put('/:id', async(request, response, next) => {
    const body = request.body;
    
    try {
        const updated = await Blog.findByIdAndUpdate(request.params.id, body, {new: true});
        if (updated) {
            response.status(200).json(updated.toJSON());
        } else {
            response.status(400).end()
        }
        
    } catch(error) {
        next(error)
    }
})
blogsRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request.body)

    try {
        if (blog['title']) {
            const result = await blog.save()
            response.status(201).json(result.toJSON());
        } else {
            response.status(400).end()
        }
        
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