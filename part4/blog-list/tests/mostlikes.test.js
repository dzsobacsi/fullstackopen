const list_helper = require('../utils/list_helper')

describe('most likes', () => {
  test('author with the most likes is Edsger W. Dijkstra', () => {
    const result = list_helper.mostLikes(list_helper.bloglist)
    const expectedResult = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }
    expect(result).toEqual(expectedResult)
  })
})
