import { axios } from '@/utils/request'

const apis = {
  wordlist: '/teacher/submission/statistics/get-wordcloud' // [映射] url名称: 实际url
  // 此处实际url: https://httpbin.org/anything
  // 基地址baseURL在vue.config.js中指定
}

export function wordcloud() { // 其他文件使用本接口时调用test
  return axios({
    url: apis.wordlist, // 此处url为上面定义的url
    method: 'get', // 一般 get 或 post
    // params: {
    //     'sub-id': parameter
    // } // get方法
    // data: parameter // post方法
  })
}