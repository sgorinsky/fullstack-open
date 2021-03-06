require('dotenv').config()
const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')

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
  type User {
    username: String!
    favoriteGenre: String!
    id: String!
    token: Token!
  }

  type Token {
    value: String!
  }

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
    me: User

    authorCount: Int!
    findAuthor(name: String!): Author!
    allAuthors: [Author!]!

    bookCount: Int!
    findBook(title: String!): Book!
    allBooks(author: String, genre: String): [Book!]!
  }

  type Mutation {
    addUser(
      username: String!
      password: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token!

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
      genres: [String]
    ): Book
  }
`

const resolvers = {
  Query: {
    // User-related queries
    me: (root, args, context) => {
      return context.currentUser
    },

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
    allAuthors: async () => await Author.find(),
    // TODO: add logic for all specific author's books
    bookCount: () => Book.collection.countDocuments(), 

    // Book-related queries
    findBook: async (root, args) => {
      try {
        const book = await Book.findOne({ title: args.title })
        return book
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    allBooks: async () => await Book.find({})
  },

  Mutation: {
    // User-related mutations
    addUser: async (root, args) => {
      try {
        const password = await bcrypt.hash(args.password, Number(process.env.SALT_ROUNDS))
        const user = new User({ ...args, password })

        const token = jwt.sign({ ...user }, process.env.SECRET) // Must hash json object, not mongoose model
        user.token = token

        await user.save()
        return user
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    login: async (root, args) => {
      // Login format
      /*
      mutation {
        login(username: "username", password: "password") {
          value
        }
      }
      */
      try {
        const user = await User.findOne({ username: args.username })
        if (!user) {
          throw new UserInputError('Incorrect username', {
            invalidArgs: args.username
          })
        }

        const isCorrectPass = await bcrypt.compare(args.password, user.password)
        if (!isCorrectPass) {
          throw new UserInputError('Incorrect password', {
            invalidArgs: args.password
          })
        }

        // Something wrong with verify method of token
        const token = user.token
        const decodedToken = jwt.verify(token, process.env.SECRET)

        if (typeof decodedToken !== 'object') {
          throw new UserInputError('Something went wrong, please try again', {
            invalidArgs: args
          })
        }

        return { value: token }

      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },

    addAuthor: async (root, args, context) => {
      try {
        if (!context.currentUser) {
          throw new UserInputError('Must be logged in to add author')
        }

        const author = new Author({ ...args })
        await author.save()
        return author
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    editAuthor: async (root, args, context) => {
      try {
        if (!context.currentUser) {
          throw new UserInputError('Must be logged in to edit author')
        }

        // may want to include mongoose string matching instead of exact match lookups
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

    addBook: async (root, args, context) => {
      try {
        if (!context.currentUser) {
          throw new UserInputError('Must be logged in to add book')
        }

        // New book must have author
        let author = await Author.findOne({ name: args.author })
        // --> author goes in db if not already there
        if (!author) {
          author = new Author({ name: args.author })
          await author.save()
        }

        // Book can be ref'd by mongoose schema _id now
        const book = new Book({ ...args, author: author._id })
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
    editBook: async (root, args) => {
      try {
        // may want to include mongoose string matching instead of exact match lookups
        const book = await Book.findOne({ title: args.title })
        if (!book) {
          throw new UserInputError('Book with given fields doesn\'t exist', {
            invalidArgs: args
          })
        }

        if (args.published) book.published = args.published
        if (args.genres) book.genres = args.genres

        await book.save()
        return book
    
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    }
  },

  User: {
    token: (root) => {
      return {
        value: root.token
      }
    }
  },

  Author: {
    bookCount: async (root) => {
      try {
        const books = await Book.find({ author: root.id })
        return books.length
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: root.name
        })
      }
    }
  },

  Book: {
    author: async (root) => {
      const author = await Author.findById(root.author)
      return author
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,

  // Need to provide Query Variable http header with `bearer ${token}` format to provide context
  context: async ({ req }) => {
    try {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(
          auth.substring(7), process.env.SECRET
        )

        // Encoded User is in "_doc" field
        const currentUser = await User.findById(decodedToken._doc._id)
        return {
          currentUser,
        }
      } else {
        return {
          currentUser: null
        }
      }
    } catch (error) {
      throw new Error(error.message)
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
