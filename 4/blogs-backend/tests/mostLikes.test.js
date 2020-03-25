const mostLikes = require('../utils/list_helper').mostLikes;

describe('most Likes', () => {
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
        expect(mostLikes(list)).toBe("Harper Lee");
    })

    test('none', () => {
        expect(mostLikes([])).toBe('none');
    })

    test('one', () => {
        expect(mostLikes([list[4]])).toBe("Harper Lee");
    })


})