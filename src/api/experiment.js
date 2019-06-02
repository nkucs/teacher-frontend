import { axios } from '@/utils/request'

export function deleteLab(parameter) {
  return axios({
    url: '/teacher/lab/delete-lab',
    method: 'get',
    params: parameter
  })
}

export function getLabs(parameter) {
  return axios({
    url: '/teacher/lab/get-my-labs',
    method: 'get',
    params: parameter
  })
}