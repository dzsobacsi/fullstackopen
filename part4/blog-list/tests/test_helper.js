const Blog = require('../models/blog')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

const blogsInDB = async () => {
  const allblogs = await Blog.find({})
  return allblogs.map(b => b.toJSON())
}

const usersInDB = async () => {
  const allusers = await User.find({})
  return allusers.map(u => u.toJSON())
}

const nonexistingID = async () => {
  const blog = new Blog({
    title: 'something to be deleted soon',
    url: 'a useless url'
  })
  await blog.save()
  await blog.remove()
  return blog._id.toString()
}

const makeNewUser = async (user) => {
  await User.deleteMany({})
  const newUser = await api
    .post('/api/users')
    .send(user)

  const loginResponse = await api
    .post('/api/login')
    .send({ username: user.username, password: user.password })
    .expect(200)

  return { newUser: newUser.body, token: loginResponse.body.token }
}

module.exports = {
  initialBlogs,
  blogsInDB,
  usersInDB,
  nonexistingID,
  makeNewUser,
}
