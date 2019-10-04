const app = require('../app');
const api = require('supertest')(app);
const mongoose = require('mongoose');
const helper = require('./test_helper');

const Blog = require('../models/blog');

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.someBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save()) // creating an array of promises
    await Promise.all(promiseArray) // resolving them in parallel
})

describe('gets', () => {
    
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

    test('by id', async () => {
        const blogsAtStart = await helper.blogsInDB();

        const blogToView = blogsAtStart[0];
    
        const resultBlog = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect(resultBlog.body).toEqual(blogToView);
        expect(resultBlog).toBeDefined();

    
    })
})

describe('posts', () => {
    test('new blog', async () => {

        const newBlog = {
            body: 'new blog',
            author: 'me',
            title: 'testing posts to server',
            likes: 12
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set({
                'Authorization': `bearer ${helper.validToken}`,
                'Content-Type': 'application/json'
            })
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const dbBlogs = await helper.blogsInDB();
        expect(dbBlogs.length).toBe(helper.someBlogs.length + 1);

    })

    test('missing likes', async () => {

        const newBlog = {
            body: 'post should have no likes field',
            author: 'Patrick Star',
            title: 'Zero Likes',
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set({
                'Authorization': `bearer ${helper.validToken}`,
                'Content-Type': 'application/json'
            })
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
            .set({
                'Authorization': `bearer ${helper.validToken}`,
                'Content-Type': 'application/json'
            })
            .send(newBlog)
            .expect(400)
    })

})
   
describe('deletes', () => {
    test('post then delete by id', async () => {
        const allBlogs = await helper.blogsInDB();
        const blogToDelete = allBlogs[0];
        const users = await helper.usersInDB();

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set({
                'Authorization': `bearer ${helper.validToken}`,
                'User': `id ${users[0].id}`
            })
            .expect(204)
        
        const nowBlogs = await helper.blogsInDB();
        
        expect(nowBlogs.length).toBe(helper.someBlogs.length-1);
    })

    test('lookup failure after delete', async () => {
        const allBlogs = await helper.blogsInDB();
        const blogToDelete = allBlogs[0];
        const users = await helper.usersInDB();

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set({
                'Authorization': `bearer ${helper.validToken}`,
                'User': `id ${users[0].id}`
            })
            .expect(204)

        await api
            .get(`/api/blogs/${blogToDelete.id}`)
            .expect(404)
    })
})

describe('puts', () => {
    test('update body', async () => {
        
        const blogs = await helper.blogsInDB();
        
        await api
            .put(`/api/blogs/${blogs[0].id}`)
            .send({'title': 'PUT New Title'})
            .expect(200)

        const updatedBlog = await api.get(`/api/blogs/${blogs[0].id}`);
        expect(updatedBlog.body.title).toBe('PUT New Title');
    })
})

describe('slightly closer to corner cases', () => {
    test('fails with statuscode 404 if blog doesn\'t exist', async () => {
        const validNonexistentId = await helper.nonExistentId()

        await api
            .get(`/api/blogs/${validNonexistentId}`)
            .expect(404)
    })

})
    




afterAll(() => {
    mongoose.disconnect()
})



