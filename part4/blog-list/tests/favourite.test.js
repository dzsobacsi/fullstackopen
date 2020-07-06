const list_helper = require('../utils/list_helper')

describe('favourite blog', () => {
  test('favourite is the one with the most likes: Canonical string reduction', () => {
    const expectedResult = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    }

    const result = list_helper.favouriteBlog(list_helper.bloglist)
    expect(result).toEqual(expectedResult)
  })
})
