const { ApolloServer, gql, UserInputError } = require('apollo-server')
const uuid = require('uuid/v1')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

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
  }
`

const resolvers = {
  Query: {
    // Author-related queries
    authorCount: () => authors.length,
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
    addAuthor: (root, args) => {
      if (authors.find(a => a.name === args.name)) {
        return UserInputError('Author already exists', {
          invalidArgs: args.name
        })
      }

      const author = {...args, id: uuid()}
      authors = authors.concat(author)
      return author
    },

    editAuthor: (root, args) => {
      if (!args.name || !args.born) {
        throw new UserInputError('Need name and born fields to edit author\'s birthdate', {
          invalidArgs: {...args}
        })
      }

      authors = authors.map(a => args.name === a.name ? {...a, born: args.born} : a)
      let author = authors.find(a => a.name === args.name)
      if (!author) {
        throw new UserInputError('Author doesn\'t exist in database', {
          invalidArgs: { ...args }
        })
      }
      return author
    },

    addBook: (root, args) => {
      if (!(args.title && args.author && args.genres && args.published)) {
        throw new UserInputError('Field missing')
      }

      const book = {
        title: args.title,
        author: args.author,
        genres: args.genres,
        published: args.published,
        id: uuid()
      }

      books = books.concat(book)
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
