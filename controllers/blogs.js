const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')


// const getTokenFrom = (request) => {
//     const authorization = request.get('authorization')
//     console.log('auth', authorization)
//     if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
//         return authorization.substring(7)
//     }

//     return null
// }

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
    console.log('posting')
    const body = {...request.body}

    //const token = getTokenFrom(request)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    console.log('User found:', user)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes ? body.likes : 0,
        user: user.id
    })


    try {
        const res = await blog.save()
        response.status(201).json(res)
    } catch (exception) {
        next(exception)
    }
})

blogRouter.delete('/:id', async (request, response, next) => {
    try {
        const blog = await Blog.findByIdAndDelete({ _id: request.params.id })
        response.status(200).json(blog)
    } catch(exception) {
        next(exception)
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