import { axios } from '@/utils/request'

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

export function getMyLectures(parameter) {
  return axios({
    url: api.getMyLectures,
    method: 'get',
    params: parameter,
  })
}

export function getLectureByName(lectureName) {
  return axios({
    url: api.getLectureByName,
    method: 'get',
    params: { name: lectureName }
  })
}

export function deleteLecture(lectureID) {
  return axios({
    url: api.deleteLecture,
    method: 'post',
    params: lectureID
  })
}
