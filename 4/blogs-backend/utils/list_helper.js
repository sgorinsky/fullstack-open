const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.length === 0 ? 0 : 
        blogs.reduce((total, current) => {
            return current.likes !== undefined ? total + current.likes : total;
        }, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    var favorite = [0, null]

    for (var i = 0; i < blogs.length; i++) {
        if (blogs[i].likes > favorite[0]) {
            favorite[1] = blogs[i];
            favorite[0] = blogs[i].likes
        }
    }
    return favorite[1];
}

const mostBlogs = (blogs) => {
    var authors = {};
    var top = [0, 'none']

    blogs.forEach((blog) => {
        if (authors[blog.author] !== undefined) {
            ++authors[blog.author];
        } else {
            authors[blog.author] = 1;
        }

        if (authors[blog.author] > top[0]) {
            top[0] = authors[blog.author];
            top[1] = blog.author;
        } 
    })

    return top[1];

}

const mostLikes = (blogs) => {
    var authors = {};
    var top = [0, 'none']

    blogs.forEach((blog) => {
        if (authors[blog.author] !== undefined) {
            authors[blog.author] += blog.likes;
        } else {
            authors[blog.author] = blog.likes;
        }

        if (authors[blog.author] > top[0]) {
            top[0] = authors[blog.author];
            top[1] = blog.author;
        }
    })

    return top[1];

}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}