import axios from 'axios'

export default {
  hi () {
    return axios.create({
      //baseURL: 'https://trooveo.com/api/',
      baseURL: 'http://localhost:3000',
      method: 'get'
    })
  },
  downserver () {
    return axios.create({
      // baseURL: 'http://www.api.peakwaves.com/api',
      baseURL: 'http://localhost:3001',
      method: 'get'
    })
  }
}
