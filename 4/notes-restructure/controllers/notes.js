const notesRouter = require('express').Router()
const Note = require('../models/note')

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
        const note = await Note.findById(request.params.id);
        response.json(note.toJSON());
    } catch (exception) {
        next(exception);
    }
})

notesRouter.post('/', async (request, response, next) => {
    const body = request.body

    const note = new Note({
        content: body.content,
        important: body.important === undefined ? false : body.important,
        date: new Date(),
    })

    try {
        const savedNote = await note.save();
        response.json(savedNote.toJSON());
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
        response.json(updated.toJSON())
    } catch(exception) {
        next(exception)
    }
})

module.exports = notesRouter