import axios from 'axios'
const baseUrl = 'http://localhost:8080/api/blogs'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }
  
  // Vain moduulin sisällä näkyvä muuttuja token jolle asetetaan arvo
  // moduulin exportaamalla funktiolla setToken
  let token = null
  const setToken = newToken => {
    token = `Bearer ${newToken}`
  }
  // Blogin lisääminen
  // create myös exportataan, sitä käytetään handeCreate funktiossa
  const create = async newObject => {
    const config = {
      headers: { Authorization: token },
    }
  
    const res = await axios.post(baseUrl, newObject, config)
    return res.data
  }
  
  // Blogin tykkääminen ( muokkaaminen )
  const update = async (id, newObject) => {
    const config = {
      headers: { Authorization: token },
    }
    const Url = `${baseUrl}/${id}`
    const res = await axios.put(Url, newObject, config)
    return res.data
  }
  
  // Poisto
  const deleteBlog = async id => {
    const config = {
      headers: { Authorization: token }
    }
    const Url = `${baseUrl}/${id}`
    const res = await axios.delete(Url, config)
    return res.data
  }
  
  
  export default { getAll, create, setToken, update, deleteBlog }