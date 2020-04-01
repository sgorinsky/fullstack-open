const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body
        const user = await User.findOne({ username: body.username })

        const passwordCorrect = !user
            ? false
            : await bcrypt.compare(body.password, user.passwordHash)

        if (!user || !passwordCorrect) {
            return response.status(401).json({
                error: 'invalid username or password'
            })
        }

        // Something wrong with verify method of token
        const token = user.token
        const decodedToken = jwt.verify(token, process.env.SECRET)

        if (typeof decodedToken !== 'object') {
            return response.status(401).json({
                error: decodedToken
            })
        }
        const updatedUser = await User.findByIdAndUpdate(user.id, { token }, { upsert: true });

        response
            .status(200)
            .send(updatedUser)

    } catch(error) {
        next(error)
    }
})

module.exports = loginRouter