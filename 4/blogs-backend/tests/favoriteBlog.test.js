const favoriteBlog = require('../utils/list_helper').favoriteBlog;

describe('favorite blog', () => {
    const list = [
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        },
        {
            title: "A",
            author: "A",
            likes: 13
        },
        {
            title: "B",
            author: "B",
            likes: 11
        },
        {
            title: "C",
            author: "C",
            likes: 10
        }
    ]
    
    test('Which one is liked the most?', () => {
        expect(favoriteBlog(list)).toBe(list[1])
    })

    test('one blog', () => {
        expect(favoriteBlog([list[0]])).toBe(list[0])
    })

    test('no blogs', () => {
        expect(favoriteBlog([])).toBe(null)
    })
})