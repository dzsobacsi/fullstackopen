import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  //console.log('getAll called')
  return axios.get(baseUrl).then(response => response.data)
}

const add = (newPerson) => {
  return axios.post(baseUrl, newPerson).then(response => response.data)
}

const remove = (person) => {
  return axios.delete(`${baseUrl}/${person.id}`)
}

const update = (person) => {
  //console.log('pbService: ', person)
  return axios
    .put(`${baseUrl}/${person.id}`, person)
    .then(response => response.data)
}

export default { getAll, add, remove, update }
