const User = require('../models/user');
const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');

usersRouter.get('/', async (request, response, next) => {
    try {
        const users = await User.find({}).populate('notes', { content: 1, date: 1 })
        response.json(users.map(u => u.toJSON()))
    } catch(error) {
        next(error);
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
        next(error);
    }
})

usersRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body;

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(body.password, saltRounds);

        const user = new User ({
            username: body.username,
            passwordHash,
            name: body.name
        });

        if (user.username && user.passwordHash && user.name) {
            const savedUser = await user.save();
            response.status(201).json(savedUser.toJSON());
        } else {
            response.status(400).end();
        }
    } catch(error) {
        next(error);
    }
})

module.exports = usersRouter



