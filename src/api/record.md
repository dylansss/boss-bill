# Axios使用及restAjax功能移植

**摆脱Jquery,享受更轻更快更强的axios吧**

ajax和axios、fetch的区别（想了解自行查看）[ajax和axios、fetch的区别](https://www.jianshu.com/p/8bc48f8fde75)


## axios使用
>这里只讲大华vue项目中使用axios

### 安装

执行命令：`npm install axios`

### 使用

```javascript
// axios执行get请求
axios.get('/user', {
    params: {
      ID: 12345
    }
  } // 除了url，其余参数均可选)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
// axios执行post请求
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
// axios执行并发请求
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // 两个请求现在都执行完成
  }));

// axios方法
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});
```
更多详情点击查看axios文档[axios](https://www.kancloud.cn/yunye/axios/234845)

### 在vue项目中使用axios

vue文件
```javascript
<script>
import api from '../api/api'
export default {
  methods: {
    getList () {
      const axiosData = Object.assign({}, this.searchParams, {
        start: this.start,
        size: this.size
      }, {
        startDate: new Date(this.searchParams.startDate).format('yyyy-MM-dd'),
        endDate: new Date(this.searchParams.endDate).format('yyyy-MM-dd')
      })
      api.getList(axiosData).then(res => {
        this.tableData = res.data.records
      })
    }
  },
  created () {
    this.getList()
  }
}
</script>
```

api.js
```javascript
import Axios from 'axios'
const api = {
  getList (params) {
    console.log(params)
    return Axios.post('fq', params)
    // return Axios({
    //   method: 'post',
    //   url: 'fq',
    //   data: params,
	//   isLoad: false, // 是否展示loading效果 默认为true，展示
    //   isAlert: false // 是否展示报错弹窗 默认为true，展示
    // })
	// 两种皆可，推荐使用第二种，更方便新增我们自定义配置，比如restAjax中的load，lock
  },
}
export default api
```

## restAjax功能移植

目前我们的restAjax主要用到的功能有三点：
1. 添加请求头信息（token）
2. 发起请求时页面loading效果，
3. 请求网络层报错的统一处理

没怎么在意但是也有的一些处理比如：
- 空格转+
- 忘了

以下部分针对这几点进行处理

### axios接口拦截器

这里只介绍了拦截器如何简单粗暴的使用，进一步的操作移步官方文档

```javascript
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
	// 我们的需求应该在这里添加请求头信息，并显示loading效果
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
	// 在这里对返回数据进行统一处理，这里建议return response.data就好了
    return response;
  }, function (error) {
    // 这里的报错只针对网络层报错，不涉及协议层报错
    // 对响应错误做点什么
    return Promise.reject(error);
  });
```

### 在大华vue项目中使用接口拦截器

1.新建接口拦截器文件inter.js

```javascript
import Axios from 'axios'
import store from '../store'
import { showLoading, hideLoading } from './loading'
import Vue from 'vue' // 也可以引入vue实例做一下需要的操作
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
    config.headers['X-subject-Token'] = store.state.token // 见下图
  }
  // loading事件加载
  if (setting.isLoad) {
    showLoading()
  }
  // 请求信息（地址，参数）修改
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
  // 错误返回存在error.response对象中，见图二
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

// 弹窗警告，类比我们的utils.showAlert()
function uAlert (str) {
  vm.$alert(str, '错误', {
    confirmButtonText: '确定'
  })
}
```

![config](http://tiebapic.baidu.com/forum/pic/item/b16cfe003af33a87724f3567d15c10385343b506.jpg "config")

![error详情](http://tiebapic.baidu.com/forum/w%3D580/sign=ad258f4cb68b87d65042ab1737082860/fa0447b30f2442a7c70ac0d8c643ad4bd113021f.jpg "error详情")

2.引入接口拦截器

main.js
```javascript
import './api/inter'
```

3.loading文件

```javascript
import { Loading } from 'element-ui'
let loadingCount = 0
let loading
const startLoading = () => {
  loading = Loading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
const endLoading = () => {
  loading.close()
}
export const showLoading = () => {
  if (loadingCount === 0) {
    startLoading()
  }
  loadingCount += 1
}
export const hideLoading = () => {
  if (loadingCount <= 0) {
    return
  }
  loadingCount -= 1
  if (loadingCount === 0) {
    endLoading()
  }
}
```

