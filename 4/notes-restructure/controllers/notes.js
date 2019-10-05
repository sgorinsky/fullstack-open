const notesRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Note = require('../models/note')
const User = require('../models/user')

// using async-await syntax for requests to rest api
notesRouter.get('/', async (request, response, next) => {
    try {
        const notes = await Note.find({})
        response.json(notes.map(note => note.toJSON()))
    } catch(exception) {
        next(exception)
    }
})

notesRouter.get('/:id', async (request, response, next) => {
    try {
        const note = await Note.findById(request.params.id)
        if (note) {
            response.json(note.toJSON())
        } else {
            response.status(404).end()
        }
    } catch (exception) {
        next(exception);
    }
})

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

notesRouter.post('/', async (request, response, next) => {
// example:
// curl -H "Content-type:application/json"
//      -H "Authorization:bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjVkOTc2NWU5NDlmMWEyOTAzMDhmOGRiZCIsImlhdCI6MTU3MDIwMzE4Mn0.a9jtioY8kGSGBAgEBBUturMsdSA7Jm9bwlQo-ExNrYE"
//      -d '{ "content":"root with auth token", "user":"5d9765e949f1a290308f8dbd", "important":"true" }'
//      http://localhost:3001/api/notes

    try {

        const token = getTokenFrom(request)
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        const body = request.body
        const user = await User.findById(body.user)

        if (user && user._id && body.content) {

            body.user = user._id
            const note = new Note(body);
            const savedNote = await note.save();

            user.notes = user.notes.concat(savedNote._id);
            await user.save();
            response.status(201).json(savedNote.toJSON());

        } else if (body.content) {
            const note = new Note(body);
            const savedNote = await note.save();
            response.status(201).json(savedNote.toJSON());

        } else {
            response.status(400).end();
        }
    } catch (exception) {
        next(exception);
    }
})

notesRouter.delete('/:id', async (request, response, next) => {
    try {
        await Note.findByIdAndRemove(request.params.id);
        response.status(204).end()
    } catch (exception) {
        next(exception)
    }
})

notesRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const note = {
        content: body.content,
        important: body.important,
    }

    try {
        const updated = await Note.findByIdAndUpdate(request.params.id, note, { new: true })
        response.status(200).json(updated.toJSON())
    } catch(exception) {
        next(exception)
    }
})

module.exports = notesRouter