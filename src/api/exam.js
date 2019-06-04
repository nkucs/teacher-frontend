import { axios } from '@/utils/request'

const api = {
  addexam: '/exam/examlist/add-exam',
  getnowexam:'/exam/examlist/get-nowexam',
  getlastexam:'/exam/examlist/get-lastexam',
  deleteexam: '/exam/examlist/delete-exam',
  getexamproblem:'/techer/exam/get-examproblem',
  getexamstudent: '/exam/student/get-examstudent',
  getallstudent: '/exam/student/get-allstudent',
  getallcontent: '/exam/student/get-allcontent',
  addstudent: '/exam/student/add-student',
  deletestudent: '/exam/student/delete-student',
  fixstudent: '/exam/student/fix-student',
  getallproblem: '/exam/examlist/get-allproblem'
}

// export default api

export function addexam(parameter) {
  return axios({
    url: api.addexam,
    method: 'post',
    data: parameter
  })
}
export function getnowexam(parameter) {
  return axios({
    url: api.getnowexam,    //后端url，对接时修改
    method: 'get',
    params: parameter
  })
}

export function getlastexam(parameter) {
  return axios({
    url: api.getlastexam,    //后端url，对接时修改
    method: 'get',
    params: parameter
  })
}

export function deleteexam(parameter){
  return axios({
    url: api.deleteexam,    //后端url，对接时修改
    method: 'post',
    data: parameter
  })
}


export function getexamproblem(parameter) {
  return axios({
    url: api.getexamproblem,
    method: 'post',
    data: parameter
  })
}

export default api

//删除考试学生(实现)
export function deletestudent(parameter) {
  return axios({
    url: api.deletestudent,
    method: 'post',
    data: parameter
  })
}

//添加考试学生(实现)
export function addstudent(parameter) {
  return axios({
    url: api.addstudent,
    method: 'post',
    data: parameter
  })
}

export function fixstudent(parameter) {
  return axios({
    url: api.fixstudent,    //后端url，对接时修改
    method: 'post',
    data: parameter
  })
}

//获取考试学生(实现)
export function getexamstudent(parameter) {
  return axios({
    url: api.getexamstudent,    //后端url，对接时修改
    method: 'get',
    params: parameter
  })
}


//获取所有学生
export function getallstudent(parameter) {
  return axios({
    url: api.getallstudent,
    method: 'get',
    params: parameter
  })
}

export function getallcontent(parameter) {
  return axios({
    url: api.getallcontent,
    method: 'post',
    data: parameter
  })
}

export function getallproblem(parameter){
  return axios({
    url: api.getallproblem,
    method: 'get',
    params: parameter
  })
}