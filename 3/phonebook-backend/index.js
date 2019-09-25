const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const cors = require('cors')

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

/*
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
*/
app.use(requestLogger)




let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  },
  {
    "name": "James Madison",
    "number": "252-116-8344",
    "id": 6
  },
  {
    "name": "Joe Biden",
    "number": "30330",
    "id": 7
  },
  {
    "name": "Johnny DeMarco",
    "number": "220-461-4977",
    "id": 8
  },
  {
    "name": "Yolanta Gunderson",
    "number": "882-342-9544",
    "id": 5
  },
  {
    "name": "Tiffany Anderson",
    "number": "221-981-4400",
    "id": 9
  },
  {
    "name": "Kimmy Yu",
    "number": "011-330-330",
    "id": 10
  },
  {
    "name": "Nova Scotia",
    "number": "32-119-0644",
    "id": 11
  }
]


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/', (request, response) => {
  app.use(requestLogger);
  response.send('<h1> Homepage </h1>')
})

app.get('/info', (request, response) => {
  const message = `Phonebook has ${persons.length} people<br></br>${new Date()}`

  response.send(message);
})

const generateId = () => {
  return Math.round(Math.random()*1000000 + persons.length);
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'content missing'
    })
  } else if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  } else if (persons.find(person => person.number === body.number)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    date: new Date(),
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

