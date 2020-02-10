import Axios from 'axios'
import store from '../store'
import { showLoading, hideLoading } from './loading'
import Vue from 'vue' // 引入vue
// 必须实例化 Vue
let vm = new Vue()

const currentSetting = {
  isLoad: true,
  isAlert: true,
  isNeedToken: true,
  token: ''
}
// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 添加自定义配置和自定义事件处理
  let setting = Object.assign({}, currentSetting, config, { token: store.state.token })
  // 是否需要token
  if (setting.isNeedToken) { // 请求头token信息添加
    config.headers['X-subject-Token'] = store.state.token
  }
  // loading事件加载
  if (setting.isLoad) {
    showLoading()
  }
  // 请求信息（地址，参数）修改
  // const publicPath = 'http://106.54.44.66:8080/watter/'
  // let currentUrl = config.url
  // config.url = publicPath + currentUrl
  config.data._ = new Date().getTime()
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
  return response.data // 这里的response包含所有请求返回信息，我们通常只需要使用data，也就是我们ajax请求的返回值
}, function (error) {
  console.log(error.response)
  hideLoading()
  let errorCode = error.response.status
  let setting = Object.assign({}, currentSetting, error.response.config)
  switch (errorCode) {
    case 405:
      if (setting.isAlert) {
        uAlert('服务器地址错误！')
      }
      break
    default:
      break
  }
  // 对响应错误做点什么
  return Promise.reject(error)
})

function uAlert (str) {
  vm.$alert(`${str}`, '错误', {
    confirmButtonText: '确定'
  })
}
