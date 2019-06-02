import { axios } from '@/utils/request'
// import Qs from 'qs'

const api = {
  getProblems: '/teacher/lecture/get-problems',
  deleteLab: '/teacher/lab/delete-lab',
  createLab: '/teacher/lab/create-lab',
  editLab: '/teacher/lab/edit-lab',
  getLab: '/teacher/lab/get-lab/',
  getSubmissionFile: '/teacher/lab/get-submission-file'
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


export function getLab(parameter) {
  return axios({
    url: api.getLab,
    method: 'get',
    params: parameter
  })
}


export function createLab(parameter) {
  return axios({
    url: api.createLab,
    method: 'post',
    data: parameter
  })
}

export function editLab(parameter) {
  return axios({
    url: api.editLab,
    method: 'post',
    data: parameter
  })
}

export function getSubmissionFile(parameter) {
  return axios({
    url: api.getSubmissionFile,
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}