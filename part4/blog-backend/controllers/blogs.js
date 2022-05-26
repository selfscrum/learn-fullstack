const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { info } = require('../utils/logger')

blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
  blogsRouter.get('/:id', (request, response) => {
    const blog = Blog.findById(request.params.id)
    .then(blog => {
        if(blog)
        response.json(blog)  
        else
        response.status(404).end()  
    })
})
  
  blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })
  

module.exports = blogsRouter
