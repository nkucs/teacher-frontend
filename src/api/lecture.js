import { axios } from '@/utils/request'
import { getCookie } from '@/utils/util'

const api = {
    createLecture: '/teacher/lecture/create-lecture',
    addProblem: '/teacher/lecture/edit-problems',
    addFile: '/teacher/lecture/add-file',
    getMyLectures: '/teacher/lecture/get-my-lectures/',
    getLectureByName: '/teacher/lecture/get-lecture-by-name/',
    deleteLecture: '/teacher/lecture/delete-lecture/'
  }
  
export default api

export function createLecture(parameter) {
    return axios({
      url: api.createLecture,
      method: 'post',
      data: parameter,
      headers: {
        'X-CSRFToken': getCookie('csrftoken')
      }
    })
}

export function addProblem(parameter) {
  return axios({
    url: api.addProblem,
    method: 'post',
    params: parameter
  })
}

export function addFile(data) {
  return axios({
    url: api.addProblem,
    method: 'post',
    data: data
  })
}

export function getMyLectures(parameter) {
  return axios({
    url: api.getMyLectures,
    method: 'get',
    params: parameter,
  })
}

export function getLectureByName(parameter) {
  return axios({
    url: api.getLectureByName,
    method: 'get',
    params: parameter
  })
}

export function deleteLecture(data) {
  return axios({
    url: api.deleteLecture,
    method: 'post',
    data: data,
    headers: {
      'X-CSRFToken': getCookie('csrftoken')
    }
  })
}
