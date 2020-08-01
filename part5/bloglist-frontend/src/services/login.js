import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  if (response.status === 200) {
    console.info('Successful login: ', credentials.username)
  }
  return response.data
}

export default { login }
