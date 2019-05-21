import axios from 'axios'

// 创建axios实例
// noinspection JSUnresolvedVariable
const request = axios.create({
  timeout: 15 * 1000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default request