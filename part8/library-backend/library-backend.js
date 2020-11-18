const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const Author = require('./models/author')
const Book   = require('./models/book')
const User   = require('./models/user')

require('dotenv').config()

const JWT_SECRET  = process.env.JWT_SECRET
const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(
      author: String
      genre: String
    ): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login (
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.countDocuments(),
    authorCount: () => Author.countDocuments(),
    allBooks: async (root, args) => {

      if (!args.author && !args.genre) {
        return await Book
          .find({})
          .populate('author', { name: 1, born: 1 })

      } else if (args.author && !args.genre) {
        const author = await Author.findOne({ name: args.author })
        return await Book
          .find({ author: author })
          .populate('author', { name: 1, born: 1 })

      } else if (args.genre && !args.author) {
        return await Book
          .find({ genres: { $in: [args.genre] } })
          .populate('author', { name: 1, born: 1 })

      // if both arguments are given
      } else {
        const author = await Author.findOne({ name: args.author })
        return await Book
          .find({ author: author })
          .find({ genres: { $in: [args.genre] } })
          .populate('author', { name: 1, born: 1 })
      }
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => context.currentUser
  },
  Author: {
    bookCount: (root) => Book.find({ author: root }).countDocuments()
  },
  Mutation: {
    addBook: async (root, args, context) => {
      let author = await Author.findOne({ name: args.author })

      if(!context.currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      if (!author) {
        const newAuthor = new Author({ name: args.author })
        author = await newAuthor.save().catch((e) =>  {
          throw new UserInputError(e.message, {invalidArgs: args})
        })
      }
      const bookToSave = new Book({
        ...args,
        author: author._id
      })
      const savedBook = await bookToSave.save().catch((e) => {
        throw new UserInputError(e.message, {invalidArgs: args})
      })
      return await Book
        .findById(savedBook._id)
        .populate('author', { name: 1, born: 1 })
    },
    editAuthor: async (root, args, context) => {
      if(!context.currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const author = await Author.findOne({ name: args.name })
      if (!author) return null
      author.born = args.setBornTo
      return await author.save()
    },
    createUser: (root, args) => {
      const user = new User({ ...args })
      return user.save().catch(e => {
        throw new UserInputError(e.message, { invalidArgs: args })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'mypassword') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
