import { axios } from '@/utils/request'

const api = {
    createLecture: '/teacher/lecture/create-lecture',
    addProblem: '/teacher/lecture/edit-problems',
    addFile: '/teacher/lecture/add-file',
    getLecture:'/teacher/lecture/get-lecture',
    downLoadFile:'/teacher/lecture/download-file',
    delFile:'/teacher/lecture/delete-file',
    delProblem:'/teacher/lecture/delete-problems'
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
    url: api.addFile,
    method: 'post',
    data: parameter
  })
}

export function getLecture(parameter) {
  return axios({
    url: api.getLecture,
    method: 'get',
    params: parameter
  })
}

export function downLoadFile(parameter) {
  return axios({
    url: api.downLoadFile,
    method: 'post',
    data: parameter,
    dataType: 'json',
    responseType: 'blob'
  })
}

export function delFile(parameter){
  return axios({
    url: api.delFile,
    method: 'get',
    params: parameter
  })
}
export function delProblem(parameter){
  return axios({
    url: api.delProblem,
    method: 'get',
    params: parameter
  })
}
