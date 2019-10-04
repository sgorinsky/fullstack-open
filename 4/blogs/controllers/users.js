const User = require('../models/user')
const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response, next) => {
    try {
        const users = await User.find({}).populate('blogs', { 'author': 1, 'title': 1});
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
        const user = await User.findById(request.params.id);
        if (user) {
            response.status(200).json(user.toJSON());
        } else {
            response.status(404).end();
        }
    } catch (error) {
        next(error)
    }
})

usersRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body;
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(body.password, saltRounds);

        const user = new User({
            username: body.username,
            passwordHash,
            name: body.name
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

module.exports = usersRouter;