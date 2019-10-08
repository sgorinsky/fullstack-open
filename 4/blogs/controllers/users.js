const User = require('../models/user')
const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')

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
        const user = await User.findById(request.params.id).populate('blogs', { 'title': 1, 'author': 1, 'body': 1, 'id': 1 });
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
            name: body.name,
            token: body.token
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
        console.log(body);
        const updated = await User.findByIdAndUpdate(request.params.id, body, { new: true });
        console.log(updated);
        if (updated) {
            response.status(200).json(updated.toJSON());
        } else {
            response.status(400).end()
        }

    } catch (error) {
        next(error)
    }
})

module.exports = usersRouter;