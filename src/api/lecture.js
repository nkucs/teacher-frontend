import { axios } from '@/utils/request'

const api = {
    createLecture: '/teacher/lecture/create-lecture',
  }
  
export default api

export function createLecture(parameter) {
    return axios({
      url: api.createLecture,
      method: 'post',
      params: parameter
    })
  }