const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
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
  const body = request.body
  const blog = new Blog(body)
  const addedBlog = await blog.save()
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
  const result = await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter
