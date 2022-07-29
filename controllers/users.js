const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')


userRouter.get('/', async (request, response) => {
    const users = await User
        .find({})
        .populate('blogs', {url: 1, title: 1, author: 1, id: 1})
    response.json(users)
})

userRouter.post('/', async (request, response, next) => {
    const { username, name, password } = request.body
    
    if (username === undefined || password === undefined || username.length < 3 || password.length < 3) {
        return next({
            name: 'InvalidCredentials',
            message: 'Username and password must be longer than 3 characters'
        })
    }

    const users = await User.find({})

    if (users.some(e => e.username === username)) {
        return next({
            name: 'InvalidCredentials',
            message: 'Username must be unique'
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    try {
        const savedUser = await user.save()
        response.status(201).json(savedUser)
    } catch(exception) {
        next(exception)
    }
})


module.exports = userRouter
