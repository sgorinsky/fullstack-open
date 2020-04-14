require('dotenv').config()
const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')

const Book = require('./models/Book')
const Author = require('./models/Author')

const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to MONGODB_URI')

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    id: String!
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: String!
    genres: [String!]!
  }

  type Query {
    authorCount: Int!
    findAuthor(name: String!): Author!
    allAuthors: [Author!]!

    bookCount: Int!
    findBook(title: String!): Book!
    allBooks(author: String, genre: String): [Book!]!
  }

  type Mutation {
    addAuthor(
      name: String!
      born: Int
    ): Author

    editAuthor(
      name: String!
      born: Int!
    ): Author

    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book

    editBook (
      title: String!
      published: Int
      author: String
      genres: [String]
    ): Book
  }
`

const resolvers = {
  Query: {
    // Author-related queries
    authorCount: () => Author.collection.countDocuments(),
    findAuthor: (root, args) => {
      if (!args.name) {
        throw new UserInputError('Name must be used to search through authors', {
          invalidArgs: args.name
        })
      }
      return authors.find(a => a.name === args.name)
    },
    allAuthors: () => authors,

    // Book-related queries
    bookCount: () => books.length,
    findBook: (root, args) => {
      if (!args.title) {
        throw new UserInputError('Title needed to search for book', {
          invalidArgs: args.title
        })
      }
      const book = books.find(b => b.title === args.title)
      if (!book) {
        throw new UserInputError('No book found', {
          invalidArgs: args.title
        })
      }
      return book
    },
    allBooks: (root, args) => {
      if (args.author && args.genre) {
        return books.filter(b => b.author === args.author && b.genres.includes(args.genre))
      } else if (args.author) {
        return books.filter(b => b.author === args.author)
      } else if (args.genre) {
        return books.filter(b => b.genres.includes(args.genre))
      }
      return books
    }
  },

  Mutation: {
    addAuthor: async (root, args) => {
      const author = new Author({ ...args })
      try {
        await author.save()
        return author
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    editAuthor: async (root, args) => {
      try {
        const author = await Author.findOne({ name: args.name })
        if (!author) {
          throw new UserInputError('Author doesn\'t exist with given fields', {
            invalidArgs: args
          })
        }
        author.born = args.born

        await author.save()
        return author
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },

    addBook: async (root, args) => {
      try {
        const book = new Book({ ...args })
        if (!book) {
          throw new UserInputError('Book doesn\'t exist with given fields', {
            invalidArgs: args
          })
        }

        await book.save()
        return book
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }      
    },
    editBook: (root, args) => {
      if (!args.title) {
        throw new UserInputError('Title required to edit book fields', {
          invalidArgs: args.title
        })
      }

      let book = books.find(b => b.title === args.title)
      if (!book) {
        throw new UserInputError('Title doesn\'t match any books in library')
      }

      if (args.published) book.published = args.published
      if (args.genres) book.genres = args.genres
      if (args.author) book.author = args.author

      books = books.map(b => b.title === book.title ? book : b)
      return book
    }
  },

  Author: {
    bookCount: (root) => {
      let count = 0;
      for (var i = 0; i < books.length; ++i) {
        if (books[i].author === root.name) {
          count = count + 1
        }
      }
      return count
    }
  },

  Book: {
    author: (root) => {
      return {
        name: root.author
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
