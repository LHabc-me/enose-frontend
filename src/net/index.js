import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API,
  timeout: 600000,
})

instance.interceptors.request.use(config => {
  config.headers.token = window.localStorage.getItem('token')
  return config
}, err => {
  return Promise.reject(err)
})

function post(url, data = {}, params = {}, headers = {}) {
  return instance.post(url, data, {
    headers,
    withCredentials: true,
    params,
  })
}

function get(url, params = {}, headers = {}) {
  return instance.get(url, {
    headers,
    withCredentials: true,
    params,
  })
}

export {get, post}
