const _ = require('lodash')

const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  return blogs.reduce((a, b) => a + b.likes, 0)
}

const favouriteBlog = blogs => {
  const likes = blogs.map(b => b.likes)
  const result = blogs.find(b => b.likes === Math.max(...likes))
  delete result._id
  delete result.url
  delete result.__v
  return result
}

const mostBlogs = blogs => {
  const authorsNameList = blogs.map(b => b.author)
  const authorsCount = _.countBy(authorsNameList)
  const maxBlogs = _.max(_.values(authorsCount))
  //console.log('maxblogs: ', maxBlogs)
  const authorWithMostBlogs = _.pickBy(authorsCount, a => a === maxBlogs)
  //console.log('author with the most blogs: ', authorWithMostBlogs)
  const result = {
    author: _.keys(authorWithMostBlogs)[0],
    blogs: maxBlogs
  }
  return result
}

const mostLikes = blogs => {
  let likesCount = {}
  blogs.forEach(b => {
    if (_.has(likesCount, b.author)) {
      likesCount[b.author] += b.likes
    } else {
      likesCount[b.author] = b.likes
    }
  })
  const maxLikes = _.max(_.values(likesCount))
  const authorWithMostLikes = _.pickBy(likesCount, a => a === maxLikes)
  const result = {
    author: _.keys(authorWithMostLikes)[0],
    likes: maxLikes
  }
  return result
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
}
