import { axios } from '@/utils/request'
import { getCookie } from '@/utils/util'

const api = {
    createLecture: '/teacher/lecture/create-lecture',
    addProblem: '/teacher/lecture/edit-problems',
    addFile: '/teacher/lecture/add-file',
    getMyLectures: 'http://188.131.129.220:8001/api/get-my-lectures/',
    getLectureByName: 'http://188.131.129.220:8001/api/get-lecture-by-name/',
    deleteLecture: 'http://188.131.129.220:8001/api/delete-lectures/'
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

// sessionID暂时用data来传输, 前端加上代理后用cookie
export function getMyLectures(lectureData) {
  return axios({
    url: api.getMyLectures,
    method: 'get',
    data: lectureData,
    headers: {
      Authorization: getCookie('sessionID')
    }
  })
}

export function getLectureByName(lectureName) {
  return axios({
    url: api.getLectureByName,
    method: 'get',
    data: { name: lectureName }
  })
}

export function deleteLecture(lectureID) {
  return axios({
    url: api.deleteLecture,
    method: 'post',
    data: lectureID
  })
}
