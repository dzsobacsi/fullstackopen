const { ApolloServer, gql } = require('apollo-server')
//const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')

const Author = require('./models/author')
const Book = require('./models/book')

require('dotenv').config()

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

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(
      author: String
      genre: String
    ): [Book!]!
    allAuthors: [Author!]!
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
    allAuthors: () => Author.find({})
  },
  Author: {
    bookCount: (root) => Book.find({ author: root }).count()
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })

      if (!author) {
        const newAuthor = new Author({ name: args.author })
        author = await newAuthor.save()
      }
      const bookToSave = new Book({
        ...args,
        author: author._id
      })
      const savedBook = await bookToSave.save()
      return await Book
        .findById(savedBook._id)
        .populate('author', { name: 1, born: 1 })
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      if (!author) return null
      author.born = args.setBornTo
      return await author.save()
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
