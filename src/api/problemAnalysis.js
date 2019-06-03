import { axios } from '@/utils/request'

const apis = {
    getProblemSubmissionCount: '/teacher/submission/statistics/get_problem_submission_count',
    getProblemSubmissiontags: 'teacher/submission/statistics/get_problem_submission_tag' // [映射] url名称: 实际url
  // 此处实际url: https://httpbin.org/anything
  // 基地址baseURL在vue.config.js中指定

}

export function getProblemSubmissionCount(problem_id, date_range) {
    return axios({
      url: apis.getSubmissionCount,
      method: 'get',
      params: {
          'problem_id': problem_id, 
          'date_range': date_range 
      } // get方法 
      // data: parameter // post方法
    }) 
}

export function getProblemSubmissiontags(parameter) {
    return axios({
      url: apis.getProblemSubmissiontags,
      method: 'get',
      params: {
        'problem_id': parameter
      }
    })
  }