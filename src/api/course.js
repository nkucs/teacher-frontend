import { axios } from '@/utils/request'

const api = {
  getmycourse: '/teacher/course/getallcourse',
  deletecourse: '/teacher/course/deletecourse',
  copycourse: '/teacher/course/copycourse'
}

export default api

export function deletecourse(parameter) {
  return axios({
    url: api.delete,
    method: 'get',
    params: parameter
  })
}

export function copycourse(parameter) {
    return axios({
      url: api.copy,
      method: 'get',
      params: parameter
    })
  }

export function getallcourse(parameter) {
  return axios({
    url: api.allCourse,
    method: 'get',
    params: parameter
  })
}

export function getmycourse(parameter) {
    return axios({
      url: api.myCourse,
      method: 'get',
      params: parameter
    })
  }