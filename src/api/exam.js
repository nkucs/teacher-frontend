import { axios } from '@/utils/request'

const api = {
  getexamproblem:'/techer/exam/get-examproblem'
}

// export default api

export function getexamproblem(parameter) {
  return axios({
    url: api.getexamproblem,
    method: 'post',
    data: parameter
  })
}