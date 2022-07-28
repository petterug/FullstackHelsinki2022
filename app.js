const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const logger = require('./utils/logger')
const middelware = require('./utils/middelware')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI, 'on', config.PORT)
mongoose.connect(config.MONGODB_URI)
    .then( () => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB', error.message)
    })



app.use(express.json())
app.use(express.static('build'))
app.use(cors())
app.use(middelware.requestLogger)

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use(middelware.unknownEndpoint)
app.use(middelware.errorHandler)


module.exports = app