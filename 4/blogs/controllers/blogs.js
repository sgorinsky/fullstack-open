const jwt = require('jsonwebtoken');
const blogsRouter = require('express').Router();
const middleware = require('../utils/middleware');
const Blog = require('../models/blog');
const User = require('../models/user');

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

blogsRouter.post('/', async (request, response, next) => {
    try {
        const token = middleware.tokenExtractor(request)
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        const body = request.body
        const user = await User.findById(body.user)
        console.log(user)
        if (body['title'] && user && user._id) {
            
            body.user = user._id
            const blog = new Blog(body);
            const savedBlog = await blog.save();
            
            user.blogs = user.blogs.concat(blog);
            await user.save()
            response.status(201).json(savedBlog.toJSON());

        } else if (body['title']) {
            const blog = new Blog(body);
            const savedBlog = await blog.save();
            response.status(201).json(savedBlog.toJSON());
        } else {
            console.log(body)
            response.status(400).end()
        }

    } catch (error) {
        console.log(error)
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

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        const token = middleware.tokenExtractor(request)
        const decodedToken = jwt.verify(token, process.env.SECRET)
        const user = await User.findOne({token: token})
        const blog = await Blog.findById(request.params.id)
        
        if (!token || !decodedToken.id || (user._id.toString() !== blog.user.toString())) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        await Blog.findByIdAndRemove(request.params.id);
        response.status(204).end();

    } catch(error) {
        next(error);
    }
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