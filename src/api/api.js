import './inter'
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
    return Axios.post('fq', params)
  },
  file (params) {
    return Axios.post('fq/file', params)
  }
}
export default api
