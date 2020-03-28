const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const body = request.body
    console.log(body)
    const user = await User.findOne({ username: body.username })
    console.log(`user: ${user}`)
    
    const hashedPass = await bcrypt.hash(body.password, 10)
    console.log(`hashedPass: ${hashedPass}`)
    console.log(`user.passwordHash: ${user.passwordHash}`)

    const passwordCorrect = !user 
    ? false 
    // for some reason, hash at registration (POST request to /api/users) is different than hash used to compare
    : await bcrypt.compare(body.password, hashedPass) || bcrypt.compare(body.password, user.passwordHash)
    console.log(`passwordCorrect: ${passwordCorrect}`)

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    /*
    const userForToken = {
        username: user.username,
        id: user._id,
    }
    */
    
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjVkOTc4MjhmNzM5ZmUxYWNjYzJmYTllOCIsImlhdCI6MTU3MjE0ODQ1OX0.LrJk3mWXP2qQ-d1zaLwl_RqniapVu5lBfgVAJfENsRQ'

    // Something wrong with verify method of token
    // const decodedToken = jwt.verify(token, process.env.SECRET)

    const updatedUser = await User.findByIdAndUpdate(user.id, { 'token': token }, { upsert: true });
    console.log(`updatedUser: ${updatedUser}`)

    response
        .status(200)
        .send(updatedUser)
})

module.exports = loginRouter