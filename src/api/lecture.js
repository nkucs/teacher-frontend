import { axios } from '@/utils/request'

const api = {
    createLecture: '/teacher/lecture/create-lecture',
    addProblem: '/teacher/lecture/edit-problems',
    addFile: '/teacher/lecture/add-file'
  }
  
export default api

export function createLecture(parameter) {
    return axios({
      url: api.createLecture,
      method: 'post',
      params: parameter
    })
}

export function addProblem(parameter) {
  return axios({
    url: api.addProblem,
    method: 'post',
    params: parameter
  })
}

export function addFile(parameter) {
  return axios({
    url: api.addProblem,
    method: 'post',
    params: parameter
  })
}