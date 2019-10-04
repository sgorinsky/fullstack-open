const User = require('../models/user');
const Note = require('../models/note');

const mongoose = require('mongoose');
const helper = require('./test_helper');
const app = require('../app');
const api = require('supertest')(app);

beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({ username: 'root', password: 'sekret' })
    await user.save()
});

describe('basic gets', () => {
    test('json response', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-type', /application\/json/);
    })

    test('/', async () => {
        const response = await api.get('/api/users');
        expect(response.body[0].username).toBe('root');
    })

    test('/id', async () => {
        const users = await helper.usersInDb();
        const response = await api
            .get(`/api/users/${users[0].id}`)
            .expect(200)
            .expect('Content-type', /application\/json/);

        expect(response.body.id).toBe(users[0].id);
    })
})

describe('user already in db', () => {

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('username with same fields already in db', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length);
    })

    test('attaching a note to user', async () => {
        var users = await helper.usersInDb();

        const newNote = new Note({
            'content': 'checking if note is users',
            'important': true,
            'user': users[0].id
        })

        users = await helper.usersInDb();
        await api
            .post('/api/notes')
            .send(newNote)
            .set('Authorization', `bearer ${helper.validToken}`)
            .expect(201)

        const response = await api
            .get(`/api/users/${users[0].id}`)
            .expect(200)
        expect(response.body.notes[0].id).toBe(users[0].notes.id);
    })
})

afterAll(() => {
    mongoose.connection.close()
})