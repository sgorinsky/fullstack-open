const express = require('express')
const app = express()

const bodyParser = require('body-parser')

app.use(bodyParser.json())

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

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  }

  persons = persons.concat(note)

  response.json(note)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = persons.find(note => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(note => note.id !== id)

  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

