import { axios } from '@/utils/request'

const api = {
  getmycourse: '/teacher/course/get-my-course',
  getallcourse: '/teacher/course/get-all-course',
  seekcourse: '/teacher/course/get-all-course',
  deletecourse: '/teacher/course/delete-course',
  copycourse: '/teacher/course/duplicate-course',
  addcourse: '/teacher/course/add-course'
}

// export default api

export function deletecourse(parameter) {
  return axios({
    url: api.deletecourse,
    method: 'post',
    data: parameter
  })
}

export function copycourse(parameter) {
  return axios({
    url: api.copycourse,
    method: 'post',
    data: parameter
  })
}

export function getallcourse(parameter) {
  return axios({
    url: api.getallcourse,    //后端url，对接时修改
    method: 'get',
    params: parameter
  })
}

export function getmycourse(parameter) {
  return axios({
    url: api.getmycourse,
    method: 'get',
    params: parameter
  })
}

export function seekcourse(parameter) {
  return axios({
    url: api.seekcourse,
    method: 'get',
    params: parameter
  })
}

// 新建课程
export function addcourse(parameter) {
  return axios({
    url: api.addcourse,
    method: 'post',
    data: parameter
  })
}