import { axios } from '@/utils/request'

const api = {
  getmycourse: '/teacher/course/getmycourse',
  getallcourse: '/teacher/course/getallcourse',
  seekcourse: '/teacher/course/seekcourse',
  deletecourse: '/teacher/course/deletecourse',
  copycourse: '/teacher/course/copycourse',
  editcourse: '/teacher/course/editcourse',
  addcourse: '/teacher/course/addcourse'
}

// export default api

export function deletecourse(parameter) {
  return axios({
    url: api.deletecourse,
    method: 'get',
    params: parameter
  })
}

export function copycourse(parameter) {
  return axios({
    url: api.copycourse,
    method: 'get',
    params: parameter
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
export function editcourse(parameter) {
	return axios({
	  method: 'post',
	  url: api.editcourse,
	  data: parameter
	});
  
export function addcourse(parameter) {
  return axios({
    url: api.addcourse,
    method: 'post',
    params: parameter
  })
}