// DEPENDENCIES
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const Note = require('./models/note')

app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())

// MIDDLEWARE
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(requestLogger)

// REQUEST HANDLING
app.post('/api/notes', (request, response, next) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note
    .save()
    .then(newNote => {
      console.log('note saved!');
      response.json(newNote.toJSON());
    })
    .catch(error => next(error));
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes);
  })
})

app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note.toJSON()) ;
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
})

app.put('/api/notes/:id', (request, response, next) => { // handles update queries from frontend
  const body = request.body;
  const note = {
    content: body.content,
    important: body.important,
  }
  // https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote.toJSON())
    })
    .catch(error => next(error));
})

app.delete('/api/notes/:id', (request, response, next) => {
  // https://mongoosejs.com/docs/api.html#model_Model.findByIdAndRemove
  Note.findByIdAndRemove(request.params.id)
    .then(result => {
      console.log(result)
      response.status(204).end()
    })
    .catch(error => next(error))
})

// ERROR HANDLING
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'wrong id' })
  } else if (error.name === 'ValidationError') {
    console.log(error);
    return response.status(400).json({ error: error.message }) ;
  }
  next(error)
}
app.use(errorHandler)


const PORT = process.env.PORT2
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

