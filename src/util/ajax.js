import axios from 'axios'
import { getLocal } from './storage'

async function getAjax() {
  let baseURL = '/'

  if (getLocal('baseUrl')) {
    baseURL = getLocal('baseUrl')
  } else {
    const config = await getStatic('/config.json')
    baseURL = config.basicUrl
  }

  const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: false
  })
  return axiosInstance
}

async function getStatic(url) {
  return axios.create({
    headers: {
      'Cache-Control': 'no-cache'
    }
  }).get(url).then(res => {
    return res.data
  })
}

export { getStatic, getAjax }
