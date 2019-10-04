const jwt = require('jsonwebtoken');
const blogsRouter = require('express').Router();

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

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

        
blogsRouter.post('/', async (request, response, next) => {
    try {
        const token = getTokenFrom(request)
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        const body = request.body
        const user = await User.findById(body.user)

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
            response.status(400).end()
        }

    } catch (error) {
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

const getUserFrom = request => {
    // getting headers from request
    const user = request.get('user')
    if (user && user.toLowerCase().startsWith('id ')) {
        return user.substring(3)
    }
    return null
}

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        const token = getTokenFrom(request)
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        const blog = await Blog.findById(request.params.id)
        const user = getUserFrom(request)
        if (blog.user !== user && blog.user) {
            return response.status(401).json({ error: 'incorrect user id' })
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