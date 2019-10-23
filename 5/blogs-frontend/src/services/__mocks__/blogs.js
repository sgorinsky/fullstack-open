const blogs = [
    {
        id: '5a451df7571c224a31b5c8ce',
        title: 'sam is testing',
        author: 'sam g',
        body: 'NUMBER 2',
        likes: 0
    },
    {
        id: '5a451df7571c224a31b5c8ce',
        title: 'sam is testing',
        author: 'sam g',
        body: 'NUMBER 2',
        likes: 0
    },
    {
        id: '5a451df7571c224a31b5c8ce',
        title: 'sam is testing',
        author: 'sam g',
        body: 'NUMBER 3',
        likes: 0
    },
    {
        id: '5a451df7571c224a31b5c8ce',
        title: 'sam is testing',
        author: 'sam g',
        body: 'NUMBER 4',
        likes: 0
    }
]

const getAll = () => {
    return Promise.resolve(blogs)
}

export default { getAll }