const User = require('../models/user');
const Blog = require('../models/blog');

const mongoose = require('mongoose');
const helper = require('./test_helper');
const app = require('../app');
const api = require('supertest')(app);

beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})
    const user = new User({ username: 'root', password: 'sekret', name: 'root' })
    await user.save()
});

describe('basic gets', () => {
    test('/', async () => {
        const response = await api.get('/api/users');
        expect(response.body[0].username).toBe('root');
    })

    test('/id', async () => {
        const users = await helper.usersInDB();
        const response = await api
            .get(`/api/users/${users[0].id}`)
            .expect(200)
            .expect('Content-type', /application\/json/);

        expect(response.body.id).toBe(users[0].id);
    })

    test('is json response', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-type', /application\/json/);
    })
})

describe('creating users', () => {
    test('post new user', async () => {
        const usersBefore = await helper.usersInDB();
        const newUser = {
            username: 'samg',
            password: 'samg123',
            name: 'samg'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/);
        
        const usersAfter = await helper.usersInDB();
        expect(usersAfter.length).toBe(usersBefore.length+1);
    })

    test('fail post request due to missing fields', async () => {
        const newUser = {
            username: 'samg',
            password: 'samg123'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })
})

describe('users and blogs', () => {
    test('linking post to user', async () => {
        var users = await helper.usersInDB();
        const user = users[0];

        const newBlog = {
            'body': 'to whom are we linking this one?',
            'user': user.id,
            'author': user.username,
            'title': 'testing the post!'
        }

        await api
            .post('/api/blogs')
            .set({
                'Authorization': `bearer ${helper.validToken}`,
                'Content-Type': 'application/json'
            })
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        users = await helper.usersInDB();
        const blog = await Blog.find({ 'user': `${users[0].id}` });

        expect(blog.id).toBe(users[0].blogs.id);

    })

    test('THE BIG KAHUNA', async () => {
        const newUser = {
            "name":"Kahuna Lenape",
            "username":"testing",
            "password":"testing123",
            "token": helper.validToken
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
        
        const user = await User.findOne({"name":"Kahuna Lenape"});
        console.log(user)
        const newBlog ={
            "title": "One",
            "body": "Drop the the",
            "author": newUser.name,
            "user": user._id.toString(),
            "likes": 1000
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set({'Authorization':`bearer ${newUser.token}`})
            .expect(201)
        
        const blog = await Blog.findOne({ "body": "Drop the the" });
        await api
            .delete(`/api/blogs/${blog._id.toString()}`)
            .set('Authorization',`bearer ${newUser.token}`)
            .expect(204)
    })

})

afterAll(() => {
    mongoose.connection.close();
})