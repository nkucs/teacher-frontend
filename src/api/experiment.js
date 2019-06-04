import { axios } from '@/utils/request'
// import Qs from 'qs'

const api = {
  getLabs: '/teacher/lab/get-my-labs',
  deleteLab: '/teacher/lab/delete-lab',
  createLab: '/teacher/lab/create-lab',
  editLab: '/teacher/lab/edit-lab',
  getLab: '/teacher/lab/get-lab/',
  filterProblems: '/teacher/lab/filter-problems'
}

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


export function filterProblems(parameter) {
  return axios({
    url: api.filterProblems,
    method: 'get',
    params: parameter
  })
}

