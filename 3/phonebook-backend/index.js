require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const Person = require('./models/person')


app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())

// for now, morgan request logger is for dev build 
const morgan = require('morgan')
morgan.token('req-content', (req, res) => {
  if (req['body']) {
    return JSON.stringify(req['body']);
  } else {
    return '-';
  }
})

const requestLogger = morgan('method::method \
                              \nurl: :url \
                              \nstatus: :status \
                              \nremote address: :remote-addr \
                              \nrequest body: :req-content \
                              \nrequest length: :req[content-length] \
                              \nresponse length: :res[content-length] \
                              \nresponse time: :response-time ms\
                              \n----------------------');
app.use(requestLogger)

app.get('/', (request, response) => {
  app.use(requestLogger);
  response.send('<h1> Homepage </h1>')
})

app.get('/info', (request, response) => {
  const message = `Phonebook has ${Person.find().count()} people<br></br>${new Date()}`
  response.send(message);
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  
  var name;
  Person.find({ name: body.name }).then(person => {
    name = person.name;
  })
  var number;
  Person.find({ number: body.number }).then(person => {
    number = person.number;
  })

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'content missing'
    })
  } else if (name) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  } else if (number) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
    date: new Date(),
  })

  person.save().then(newPerson => {
    console.log(`${newPerson.name} has been saved in database!`);
    response.json(newPerson.toJSON());
  })
})

app.get('/api/persons', (request, response) => {
  Person.find().then(people => {
      response.json(people)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person
    .findById(request.params.id)
    .then(persons => {
      response.json(persons.toJSON())
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;
  
  const person = {
    number: body.number,
    name: body.name,
  }

  if (body.id !== undefined) {
    Person
      .findByIdAndUpdate(request.params.id, person, { new: true })
      .then(updatedPerson => {
        response.json(updatedPerson.toJSON())
      })
      .catch(error => next(error))
    
  } else {
    console.log(body)
    console.log(person)
    Person.findOneAndUpdate({ name: body.name }, person, { new: true })
      .then(updatedPersons => {
        console.log(updatedPerson)
        response.json(updatedPerson.toJSON())
      })
      .catch(error => next(error))
  }

})

app.delete('/api/persons/:id', (request, response, next) => {
  console.log(request.params)
  Person
    .findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error));
})

// ERROR HANDLING
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'wrong id' })
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

