const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
describe('connecting to notes api', () => {
    test('notes are returned as json', async () => {
    await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

    test('there are four notes', async () => {
        const response = await api.get('/api/notes')

        expect(response.body.length).toBe(4)
    })

    test('the first note is about HTTP methods', async () => {
        const response = await api.get('/api/notes')

        expect(response.body[0].content).toBe('HTML is easy')
    })

    afterAll(() => {
        mongoose.connection.close()
    })

})