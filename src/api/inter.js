import Axios from 'axios'
import { showLoading, hideLoading } from './loading'

// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const publicPath = 'http://106.54.44.66:8080/watter/'
  let currentUrl = config.url
  config.url = publicPath + currentUrl
  showLoading()
  return config
}, function (error) {
  hideLoading()
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
Axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  hideLoading()
  return response.data
}, function (error) {
  hideLoading()
  // 对响应错误做点什么
  return Promise.reject(error)
})
