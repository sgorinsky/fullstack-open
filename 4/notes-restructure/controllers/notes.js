const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

//using async-await syntax for requests to rest api
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

notesRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body
        const user = await User.findById(body.user)

        if (user && user._id) {

            body.user = user._id
            const note = new Note(body);
            const savedNote = await note.save();

            user.notes = user.notes.concat(savedNote._id);
            await user.save();
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