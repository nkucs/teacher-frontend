import { axios } from '@/utils/request'

const api = {
  getexamproblem:'/techer/exam/get-examproblem',
  getexamstudent: '/exam/student/get-examstudent',
  getallstudent: '/exam/student/get-allstudent',
  getallcontent: '/exam/student/get-allcontent',
  addstudent: '/exam/student/add-student',
  deletestudent: '/exam/student/delete-student',
  fixstudent: '/exam/student/fix-student',
  // searchidstudent: '/exam/student/get-idstudent',
  // searchnamestudent: '/exam/student/get-namestudent',
  // searchidstuall: '/exam/student/get-idstuall',
  // searchnamestuall: '/exam/student/get-namestuall',
}

// export default api

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

// //按id搜索学生
// export function searchidstudent(parameter) {
//   return axios({
//     url: api.searchidstudent,
//     method: 'get',
//     params: parameter
//   })
// }

// //按名字搜索学生
// export function searchnamestudent(parameter) {
//   return axios({
//     url: api.searchnamestudent,
//     method: 'get',
//     data: parameter
//   })
// }

// //按id搜索学生(所有)
// export function searchidstuall(parameter) {
//     return axios({
//       url: api.searchidstuall,
//       method: 'get',
//       params: parameter
//     })
//   }
  
//   //按名字搜索学生(所有)
// export function searchnamestuall(parameter) {
//     return axios({
//       url: api.searchnamestuall,
//       method: 'get',
//       data: parameter
//     })
//   }
  
// // export default api