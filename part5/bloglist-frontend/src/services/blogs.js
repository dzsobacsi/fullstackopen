import axios from 'axios'

const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addNewBlog = newBlog => {
  const config = {
    headers: { Authorization: token }
  }

  const request = axios.post(baseUrl, newBlog, config)
  return request.then(response => response.data)
}

const removeBlog = blog => {
  const config = {
    headers: { Authorization: token }
  }
  const url = baseUrl + '/' + blog.id
  const request = axios.delete(url, config)
  return request.then(response => response.data)
}

const addLike = blog => {
  const url = baseUrl + '/' + blog.id
  let body = { ...blog }
  delete body.id
  body.user = blog.user.id
  const request = axios.put(url, body)
  return request.then(response => response.data)
}

export default { getAll, addNewBlog, removeBlog, setToken, addLike }
