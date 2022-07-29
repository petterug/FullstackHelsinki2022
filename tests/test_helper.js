const Blog = require('../models/blog')
const User = require('../models/user')

const initialUsers = [
    {
        username: 'root',
        name: 'superUser',
        password: 'sudo'
    }
]

const initialBlogs = [
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 15,
    },
    {
        title: 'My life as a eunuch',
        author: 'Donald Trump',
        url: 'http://www.shitlord.com/html',
        likes: 1,
    }
]

const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDB = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs,
    initialUsers,
    blogsInDB,
    usersInDB
}