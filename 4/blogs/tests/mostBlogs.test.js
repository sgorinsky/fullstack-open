const mostBlogs = require('../utils/list_helper').mostBlogs;

describe('most blogs', () => {
    const list = [
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        },
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        },
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        },
        {
            title: "The Stranger",
            author: "Albert Camus",
            likes: 20
        },
        {
            title: "To Kill A Mockingbird",
            author: "Harper Lee",
            likes: 50
        }
    ]

    test('blog list', () => {
        expect(mostBlogs(list)).toBe("Edsger W. Dijkstra");
    })

    test('none', () => {
        expect(mostBlogs([])).toBe('none');
    })

    test('one', () => {
        expect(mostBlogs([list[4]])).toBe("Harper Lee");
    })


})