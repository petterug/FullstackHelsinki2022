const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogRouter.get('/', async (request, response) =>{
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
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
    const body = {...request.body}

    const user = request.user

    console.log('User found:', user)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes ? body.likes : 0,
        user: user
    })

    try {
        const res = await blog.save()
        response.status(201).json(res)
    } catch (exception) {
        next(exception)
    }
})

blogRouter.delete('/:id', async (request, response, next) => {

    // Find blog in database and return it
    const blog = await Blog.findById({ _id: request.params.id })

    // If no blog with matching ID is found, return error message
    if(!blog) {
        return response.status(404).json({ error: 'no blog with matching ID' })
    }

    //find creator of blog and logged in user
    const creatorId = blog.user.toString()
    const userId = request.user

    
    // compare the logged in user with the user who is set as creator
    if (userId === creatorId) {
        try {
            const deleted = await Blog.deleteOne({ _id: blog.id })
            return response.status(200).json(deleted)
        } catch(exception) {
            next(exception)
        }
    } else {
        return response.status(403).json({ error: 'Unauthorized deletion request'})
    }
})

blogRouter.patch('/:id', async (request, response, next) => {
    
    try {
        const update = await Blog.findByIdAndUpdate(request.params.id, request.body)

        response.status(200).json(update)
    } catch(exception) {
        next(exception)
    }
})

module.exports = blogRouter