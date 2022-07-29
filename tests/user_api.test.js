const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')


beforeEach(async () => {
    await User.deleteMany({})

    const userObjects = helper.initialUsers
        .map( user => {
            const saltRounds = 10
            user.password = bcrypt.hashSync(user.password, saltRounds)
            return new User({ username: user.username, name: user.name, passwordHash: user.password })
        })
    const promiseArray = userObjects.map(user => user.save())
    await Promise.all(promiseArray)
})


describe('Creating invalid users', () => {
    test('username too short', async () => {
        const user = {
            username: 'ol',
            name: 'Caroline',
            password: 'drinkMore'
        }

        const request = await api
            .post('/api/users')
            .send(user)
            .expect(403)
    })

    test('password too short', async () => {
        const user = {
            username: 'Beers',
            name: 'Caroline',
            password: 'mo'
        }

        const request = await api
            .post('/api/users')
            .send(user)
            .expect(403)
    })

    test('username not unique', async () => {
        const user = {
            username: 'root',
            name: 'Caroline',
            password: 'moMoney'
        }

        const request = await api
            .post('/api/users')
            .send(user)
            .expect(403)
    })
})




afterAll(() => {
    mongoose.connection.close()
})