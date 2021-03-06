const User = require('../models/user')
const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

usersRouter.get('/', async (request, response, next) => {
    try {
        const users = await User.find({}).populate('blogs', { 'title': 1, 'author': 1, 'body': 1, 'id': 1 });
        if (users) {
            response.status(200).json(users.map(user => user.toJSON())).end();
        } else {
            response.status(400).end()
        }
    } catch(exception) {
        next(exception);
    }
})

usersRouter.get('/:id', async (request, response, next) => {
    try {
        const user = await User.findById(request.params.id).populate('blogs', { 'likedBlogs':1, 'title': 1, 'author': 1, 'body': 1, 'id': 1 });
        if (user) {
            response.status(200).json(user.toJSON());
        } else {
            response.status(404).end();
        }
    } catch (error) {
        next(error)
    }
})

/*  
Create user requests are of the form:
    curl \
        -X POST \
        -H Content-Type:application/json \
        -d '{ \
                "user": "pass", \
                "name": "pass", \
                "password": "pass" \
            }' \
        http://localhost:3001/api/users
*/
usersRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body;
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(body.password, saltRounds);
        
        const token = jwt.sign({ username: body.username, name: body.name, password: passwordHash }, process.env.SECRET)
        const user = new User({
            username: body.username,
            passwordHash,
            name: body.name,
            token,
            likedBlogs: null,
        })

        if (user.username && user.passwordHash && user.name) {
            await user.save()
            response.status(201).json(user.toJSON());
        } else {
            response.status(400).end();
        }
    } catch (error) {
        next(error);
    }
})

usersRouter.put('/:id', async (request, response, next) => {
    try {
        const body = request.body;
        const updated = await User.findByIdAndUpdate(request.params.id, body, { new: true });

        if (updated) {
            response.status(200).json(updated.toJSON());
        } else {
            response.status(400).end()
        }

    } catch (error) {
        next(error)
    }
})

usersRouter.delete('/:id', async (request, response, next) => {
    try {
        await User.findByIdAndDelete(request.params.id)
        return response.status(204).end()
    } catch (error) {
        next(error)
    }
})

usersRouter.delete('/', async (request, response, next) => {
    try {
        await User.deleteMany({})
        return response.status(204).end()
    } catch(error) {
        next(error)
    }
})

module.exports = usersRouter;