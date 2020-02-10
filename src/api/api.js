// import './inter'
import Axios from 'axios'

const api = {
  save (params) {
    console.log(params, 'params')
    const axiosData = {
      name: params.name,
      money: params.money,
      picUrl: params.picUrl,
      status: params.status,
      memo: params.memo,
      date: new Date(params.date).format('yyyy-MM-dd')
    }
    return Axios.post('fq/save', axiosData)
  },
  edit (params) {
    return Axios.post('fq/edit', params)
  },
  getList (params) {
    // console.log(params)
    // return Axios.post('fq', params)
    return Axios({
      method: 'post',
      url: 'fq',
      data: params,
      isLoad: false,
      isAlert: false
    })
  },
  // file (params) {
  //   return Axios.post('fq/file', params)
  // },
  uploadImg (params) {
    return Axios.post('fq/file', params)
  }
}
export default api
