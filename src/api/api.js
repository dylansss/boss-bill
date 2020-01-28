import './inter'
import Axios from 'axios'

const api = {
  save (params) {
    const axiosData = {
      name: params.name,
      money: params.money,
      picurl: params.picurl,
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
  }
}
export default api
