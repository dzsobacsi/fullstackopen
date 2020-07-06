const list_helper = require('../utils/list_helper')

describe('most blogs', () => {
  test('author with the most blogs is Robert C. Martin', () => {
    const result = list_helper.mostBlogs(list_helper.bloglist)
    const expectedResult = {
      author: 'Robert C. Martin',
      blogs: 3
    }
    expect(result).toEqual(expectedResult)
  })
})
