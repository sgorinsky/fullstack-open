const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blog');

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.someBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save()) // creating an array of promises
    await Promise.all(promiseArray) // resolving them in parallel
})

describe('connecting to blogs test db', () => {
    
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
    })

    test('checking length of Blogs', async () => {
        const response = await api.get('/api/blogs');
        expect(response.body.length).toBe(3);
    })

    test('get id', async () => {
        const blogsAtStart = await helper.blogsInDB();

        const blogToView = blogsAtStart[0];
    
        const resultBlog = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect(resultBlog.body).toEqual(blogToView);
        expect(resultBlog).toBeDefined();

    
    })

    test('post new blog to db', async () => {
        
        const newBlog = {
            body: 'new blog',
            author: 'me',
            title: 'testing posts to server',
            likes: 12
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const dbBlogs = await helper.blogsInDB();
        expect(dbBlogs.length).toBe(helper.someBlogs.length+1);

    })

    test('post blog with missing likes', async () => {
        
        const newBlog = {
            body: 'post should have no likes field',
            author: 'Patrick Star',
            title: 'Zero Likes',
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const dbBlogs = await helper.blogsInDB();

        for (var blog of dbBlogs) {
            expect(blog.likes).toBeDefined()
        }


    })

    test('urls aren\'t required, but titles are', async () => {
        
        const newBlog = {
            body: 'blog shouldn\'t post',
            author: 'No title, no url',
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })

    test('fails with statuscode 404 if blog doesn\'t exist', async () => {
        const validNonexistingId = await helper.nonExistentId()

        console.log(validNonexistentId)

        await api
            .get(`/api/blogs/${validNonexistentId}`)
            .expect(404)
    })

})


afterAll(() => {
    mongoose.disconnect()
})



