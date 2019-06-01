import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import { VueAxios } from './axios'
import notification from 'ant-design-vue/es/notification'
import { ACCESS_SESSION } from '@/store/mutation-types'


// 创建 axios 实例
const service = axios.create({
  baseURL: '/nkcs', // api base_url
  timeout: 6000, // 请求超时时间
  withCredentials: true
})

const err = (error) => {
  if (error.response) {
    const data = error.response.data
    const session = Vue.ls.get(ACCESS_SESSION)
    if (error.response.status === 403) {
      notification.error({ message: 'Forbidden', description: data.message})
    }
    if (error.response.status === 401) {
      notification.error({ message: 'Unauthorized', description: 'Authorization verification failed' })
      if (session) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
}

// response interceptor
service.interceptors.response.use((response) => {
    return response.data
  }, err)

const installer = {
  vm: {},
  install (Vue, router = {}) {
    Vue.use(VueAxios, router, service)
  }
}

export {
  installer as VueAxios,
  service as axios
}