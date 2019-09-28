const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('give password as argument');
    process.exit(1);
}

const password = process.argv[2]

// better name for database we want to connect to would be notes-app, not test
const app = 'phonebook'
const username = 'samg'
const url =
    `mongodb+srv://${username}:${password}@fullstack-open-yxrow.mongodb.net/${app}?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    date: Date,
    
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
  date: new Date()
})


person.save().then(response => {
  console.log(`added ${person['name']} to phonebook`)
  
})

Person.find({}).then(result => {
    result.forEach(address => {
        console.log(address)
    })
    mongoose.connection.close()
})

