const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const returnedBlog = await Blog.findById(request.params.id)
  if (returnedBlog) {
    response.json(returnedBlog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const body = request.body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })
  const addedBlog = await blog.save()

  user.blogs = user.blogs.concat(addedBlog._id)
  await user.save()

  response.status(201).json(addedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  const options = {
    new: true,
    runValidators: true,
    context: 'query'
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, options)
  response.status(200).json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const blogToDelete = await Blog.findById(request.params.id)
  if (blogToDelete.user.toString() === decodedToken.id) {
    const result = await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'entry can be deleted only by the user who created it' })
  }
})

module.exports = blogsRouter
