import { axios } from '@/utils/request'

const apis = {
  distribution: '/distribution/get-all-distribution', // [映射] url名称: 实际url
  // 此处实际url: https://httpbin.org/anything
  // 基地址baseURL在vue.config.js中指定
  runtimes: '/distribution/get-runtime-ratio',
  studentnumberstatistics: '/teacher/course/stat/get-course-student-number'
}

export function distribution(parameter) { // 其他文件使用本接口时调用test
  return axios({
    url: apis.distribution, // 此处url为上面定义的url
    method: 'get', // 一般 get 或 post
    params: parameter // get方法
    // data: parameter // post方法
  })
}
export function runtimes(parameter) { // 其他文件使用本接口时调用test
  return axios({
    url: apis.runtimes, // 此处url为上面定义的url
    method: 'get', // 一般 get 或 post
    params: parameter // get方法
    // data: parameter // post方法
  })
}
export function studentnumberstatistics(parameter) { // 其他文件使用本接口时调用test
  return axios({
    url: apis.studentnumberstatistics, // 此处url为上面定义的url
    method: 'get', // 一般 get 或 post
    params: parameter // get方法
    // data: parameter // post方法
  })
}