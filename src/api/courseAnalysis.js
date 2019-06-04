import { axios } from '@/utils/request'

const apis_urls = {
  getWordCloud: '/teacher/submission/statistics/get-wordcloud',
  getSubmissionCount: '/teacher/submission/statistics/get-submission_count',
  getStatisticTable: '/teacher/submission/statistics/get_submission_info',
  submission_tags: 'teacher/submission/statistics/get_submission_tags'  // [映射] url名称: 实际url
  // 此处实际url: https://httpbin.org/anything
  // 基地址baseURL在vue.config.js中指定
}

export function problemTables(parameter) {
  return axios({
    url: apis_urls.getStatisticTable, // 此处url为上面定义的url
    method: 'get', // 一般 get 或 post
    params: {
        'course_id': parameter
    } // get方法
    // data: parameter // post方法
  })
}

export function get_submission_tags(parameter) {
  return axios({
    url: apis_urls.submission_tags,
    method: 'get',
    params: {
      'course_id': parameter
    }
  })
}


export function getWordCloud(parameter) {
  return axios({
    url: apis_urls.getWordCloud,
    method: 'get',
    params: {
        'course_id': parameter
    } // get方法
    // data: parameter // post方法
  })
}

export function getSubmissionCount(course_id, date_range) {
  return axios({
    url: apis_urls.getSubmissionCount,
    method: 'get',
    params: {
        'course_id': course_id,
        'date_range': date_range
    } // get方法
    // data: parameter // post方法
  })
}