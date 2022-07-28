const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
})

test('blogs are returned as JSON', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('correct number of blogs returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('returned objects contain unique ID called "id"', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('post request creates new entry in DB', async () => {
    const newBlog = {
        title: 'Newest blog',
        author: 'Some guy',
        url: 'myspace.com/dudebro',
        likes: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
})

test('creating blog without "likes" property defaults to likes: 0', async () => {
    const newBlog = {
        title: 'No likes blog',
        author: 'Nerd',
        url: 'www.lamo.net'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    console.log('response body', response.body)
    const createdBlog = response.body.filter(blog => blog.title === newBlog.title)
    console.log('created blog', createdBlog[0].likes)
    expect(createdBlog[0].likes).toBe(0)
})

test('creating blog without title and URL returns 400 bad request.', async () => {
    const newBlog = {
        author: 'Forgetful Sammy',
        likes: 1
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test('delete request removes blog from DB', async () => {
    let blogs = await helper.blogsInDB()
    const toBeDeleted = blogs[0]
        
   await api
        .delete(`/api/blogs/${toBeDeleted.id}`)
        .expect(200)

    blogs = await helper.blogsInDB()
    const length = blogs.filter(blog => blog.id === toBeDeleted.id).length
    expect(length).toBe(0)

})

test('patch request updates blog in DB', async () => {
    const blogs = await helper.blogsInDB()
    let toBeUpdated = blogs[0]

    const updated = await api
        .patch(`/api/blogs/${toBeUpdated.id}`)
        .send({likes: 10})
        .expect(200)

    console.log('updated is:', updated.body)

    expect(updated.likes).not.toBe(toBeUpdated.likes)
})

afterAll(() => {
    mongoose.connection.close()
})