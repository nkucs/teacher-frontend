import { axios } from '@/utils/request'

const api = {
  getProblems: '/teacher/lecture/get-problems',
  deleteLab: '/teacher/lab/delete-lab',
  getLabs:'/teacher/lab/get-lab'
}

export default api

export function deleteLab(parameter) {
  return axios({
    url: api.user,
    method: 'get',
    params: parameter
  })
}

export function getProblems(parameter) {
  return axios({
    url: api.role,
    method: 'get',
    params: parameter
  })
}

export function getLabs(parameter){
  return axios({
    url:api.getLabs,
    method:'get',
    params:parameter
  })
}