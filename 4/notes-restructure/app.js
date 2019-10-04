// app
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

// routers
const usersRouter = require('./controllers/users')
const notesRouter = require('./controllers/notes')
const loginRouter = require('./controllers/login.js')

// DB
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const config = require('./utils/config')

const logger = require('./utils/logger')
logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(middleware.requestLogger)

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app