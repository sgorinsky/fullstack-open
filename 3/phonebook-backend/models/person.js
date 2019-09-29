const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI

// removes deprecation warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(url, { 
    useNewUrlParser: true 
    })
    .then(result => {
        console.log('connected to MongoDB phonebook')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB phonebook:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
        unique: true
    },
    number: {
        type: String,
        minlength: 8,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        required: true
    }

});

personSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' });

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)