const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.length === 0
    ? 'empty list'
    : blogs.reduce((accumulator, blog) => accumulator + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    const mostNumberOfLikes = blogs.reduce((accumulator, blog) => Math.max(accumulator, blog.likes), 0)
    return blogs.filter(blog => blog.likes === mostNumberOfLikes)[0]
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}