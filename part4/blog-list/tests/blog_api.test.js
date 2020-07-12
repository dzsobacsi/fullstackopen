const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

const initialBlogs = helper.initialBlogs

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = initialBlogs.map(b => new Blog(b))
  const promiseArray = blogObjects.map(b => b.save())
  await Promise.all(promiseArray)
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const allblogs = await helper.blogsInDB()
    expect(allblogs).toHaveLength(initialBlogs.length)
  })

  test('a specific blog is among the returned ones', async () => {
    const allblogs = await helper.blogsInDB()
    const titles = allblogs.map(r => r.title)
    expect(titles).toContain('React patterns')
  })

  test('unique identfier is id instead of _id', async () => {
    const allblogs = await helper.blogsInDB()
    const firstBlog = allblogs[0]
    expect(firstBlog.id).toBeDefined()
  })

  describe('viewing a specific blog', () => {
    test('a specific blog can be viewed', async () => {
      const allblogs = await helper.blogsInDB()
      const firstBlog = allblogs[0]
      const response = await api
        .get(`/api/blogs/${firstBlog.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(response.body).toEqual(firstBlog)
    })

    test('fails with code 404 if a blog does not exist', async () => {
      const wrongID = await helper.nonexistingID()
      const response = await api
        .get(`/api/blogs/${wrongID}`)
        .expect(404)
    })

    test('fails with code 400 in case of invalid request', async () => {
      const response = await api
        .get(`/api/blogs/somethingbullshit`)
        .expect(400)
    })
  })

  describe('addition of a new blog', () => {
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

    test('if likes is missing, it defaults to zero', async () => {
      const newBlog = {
        title: 'Anoter test blog to add',
        author: 'Joe',
        url: 'https://joe.com/blogs',
      }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)

      const response = await api.get('/api/blogs')
      const newlyAddedBlog = response.body.filter(b => b.title === newBlog.title)[0]
      expect(newlyAddedBlog.likes).toEqual(0)
    })

    test('if title is missing, error 400 is returned', async () => {
      const newBlog = {
        author: 'Joel',
        url: 'https://joel.com/blogs',
        likes: 66
      }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    })

    test('if url is missing, error 400 is returned', async () => {
      const newBlog = {
        title: 'a blog without an url',
        author: 'Joel',
        likes: 66
      }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    })
  })


  describe('delete of a blog', () => {
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
  })


  describe('update of an existing blog', () => {
    test('a specific blog can be updated', async () => {
      const allblogs = await helper.blogsInDB()
      const blogToUpdate = allblogs[0]
      let newBlog = {...blogToUpdate}
      newBlog.likes = 999
      const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(newBlog)
        .expect(200)

      expect(response.body.likes).toEqual(999)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})
