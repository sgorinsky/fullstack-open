require('dotenv').config()
const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')

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
    id: ID!
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
    me: User!

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
      genres: [String]
    ): Book
  }
`

const resolvers = {
  Query: {
    // User-related queries
    me: (root, args, context) => {
      console.log(context)
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
    addUser: async (root, args) => {
      try {
        const User = new User({ ...args })
        await User.save()
        
        return User
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },

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

    addBook: async (root, args) => {
      try {
        // New book must have author
        let author = await Author.findOne({ name: args.author })
        // --> author goes in db if not already there
        if (!author) {
          author = new Author({ name: args.author })
          console.log(author)
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
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.SECRET
      )
      const currentUser = await User.findById(decodedToken.id).populate('friends')
      return { currentUser }
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
