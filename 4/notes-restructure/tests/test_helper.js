// MODELS
const Note = require('../models/note');
const User = require('../models/user');

// DUMMY OBJECTS
const initialNotes = [
    {
        content: 'HTML is easy',
        important: false
    },
    {
        content: 'Browser can execute only Javascript',
        important: true
    }
];

const nonExistingId = async () => {
    const note = new Note({ content: 'willremovethissoon' });
    await note.save();
    await note.remove();

    return note._id.toString();
}

const notesInDb = async () => {
    const notes = await Note.find({});
    return notes.map(note => note.toJSON());
}

const usersInDb = async () => {
    const users = await User.find();
    return users.map(user => user.toJSON());
}

const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjVkOTc2NWU5NDlmMWEyOTAzMDhmOGRiZCIsImlhdCI6MTU3MDIwMzE4Mn0.a9jtioY8kGSGBAgEBBUturMsdSA7Jm9bwlQo-ExNrYE'


module.exports = {
    initialNotes,
    nonExistingId,
    notesInDb,
    validToken,
    usersInDb
}