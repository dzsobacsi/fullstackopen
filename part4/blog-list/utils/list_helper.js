const _ = require('lodash')

const bloglist = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

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
  bloglist,
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
}
