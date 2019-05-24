import { axios } from '@/utils/request'

const api = {
  getProblems: '/teacher/lecture/get-problems',
  deleteLab: '/teacher/lab/delete-lab'
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