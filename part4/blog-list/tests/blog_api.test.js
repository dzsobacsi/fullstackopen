const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

const initialBlogs = helper.initialBlogs.slice(0, 2)

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('tere are two notes', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('there is a blog about react patterns', async () => {
  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)
  expect(titles).toContain('React patterns')
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Test blog to add',
    author: 'Jackson from Jackwille',
    url: 'https://jackson.com/blogs',
    likes: 2
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)
  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(titles).toContain('Test blog to add')
})

test('a specific blog can be viewed', async () => {
  const allblogs = await helper.blogsInDB()
  const firstBlog = allblogs[0]
  const response = await api
    .get(`/api/blogs/${firstBlog.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toEqual(firstBlog)
})

test('a specific blog can be deleted', async () => {
  const allblogs = await helper.blogsInDB()
  const blogToDelete = allblogs[0]
  const response = await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAfterDelete = await helper.blogsInDB()
  expect(blogsAfterDelete).toHaveLength(initialBlogs.length - 1)
  const contents = blogsAfterDelete.map(b => b.title)
  expect(contents).not.toContain(blogToDelete.title)
})

afterAll(() => {
  mongoose.connection.close()
})
