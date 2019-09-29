const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

// better name for database we want to connect to would be notes-app, not test
const app = 'notes-app'
const username = 'samg'
const url =
  `mongodb+srv://samg:${password}@fullstack-open-yxrow.mongodb.net/${app}?retryWrites=true&w=majority`
//mongodb+srv://samg@fullstack-open-yxrow.mongodb.net/
mongoose.connect(url, { useNewUrlParser: true })

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

/*
const note = new Note({
  content: 'HTML is Easy',
  date: new Date(),
  important: true,
})


note.save().then(response => {
  console.log('note saved!')
  mongoose.connection.close()
})
*/

Note.find({important: true}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})
