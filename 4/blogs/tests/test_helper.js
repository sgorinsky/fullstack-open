const Blog = require('../models/blog')

const someBlogs = [
    {
        title: "History of Blogging",
        author: "Trog Pullington III",
        body: "Trog created the first blog when he was only 34. Ever since then, the world's changed.",
        likes: 100

    },
    {
        title: "Moonlight",
        author: "Sam Gorinsky",
        body: "Under the moonlight are all the silhouettes of our dreams.",
        likes: 44

    },
    {
        title: "Charmed",
        author: "Farsi Chumploux",
        body: "It's a pleasure to meet you here, my friend.",
        likes: 73

    }
]

const nonExistentId = async () => {
    const blog = new Blog({ body: 'willremovethissoon' })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    someBlogs, nonExistentId, blogsInDB
}