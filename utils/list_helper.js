const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.length === 0
    ? 'empty list'
    : blogs.reduce((accumulator, blog) => accumulator + blog.likes, 0)
}


module.exports = {
    dummy,
    totalLikes
}