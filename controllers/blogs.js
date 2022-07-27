const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) =>{
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.get('/:id', (request, response, next) => {
    Blog.findById(request.params.id)
    .then(blog => {
        if (blog) {
            response.json(blog)
        } else {
            response.status(404).end()
        }
    })
    .catch(error => next(error))
})

blogRouter.post('/', async (request, response, next) => {
    console.log('posting')
    const body = {...request.body}

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes ? body.likes : 0
    })


    try {
        const res = await blog.save()
        response.status(201).json(res)
    } catch (exception) {
        next(exception)
    }
})

blogRouter.delete('/:id', (request, response, next) => {
    Blog.findByIdAndDelete({ _id: request.params.id })
    .then(() => {
        response.status(204).end()
    })
    .catch(error => next(error))
})

module.exports = blogRouter