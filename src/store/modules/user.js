import Vue from 'vue'
import { login, getInfo, logout } from '@/api/login'
import { ACCESS_SESSION } from '@/store/mutation-types'
import { welcome } from '@/utils/util'
import { loadLanguageAsync } from '@/lang'

const user = {
  state: {
    session: false,
    id: 0,
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {},
    lang: 'en-US'
  },

  mutations: {
    SET_SESSION: (state, session) => {
      state.session = session
    },
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_LANG: (state, lang) => {
      state.lang = lang
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then((res) => {
            const data = res.data
            const user_id = data['user_id']         
            Vue.ls.set(ACCESS_SESSION, true)
            commit('SET_SESSION', true)
            commit('SET_ID', user_id)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetInfo({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then(response => {
            const result = response.result

            if (result.role && result.role.permissions.length > 0) {
              const role = result.role
              role.permissions = result.role.permissions
              role.permissions.map(per => {
                if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
                  const action = per.actionEntitySet.map(action => {
                    return action.action
                  })
                  per.actionList = action
                }
              })
              role.permissionList = role.permissions.map(permission => {
                return permission.permissionId
              })
              commit('SET_ROLES', result.role)
              commit('SET_INFO', result)
            } else {
              reject('getInfo: roles must be a non-null array !')
            }

            commit('SET_NAME', { name: result.name, welcome: welcome() })
            commit('SET_AVATAR', result.avatar)

            // 设置界面语言
            dispatch('SetLang', result.lang)

            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 登出
    Logout({ commit, state }) {
      return new Promise(resolve => {
        commit('SET_SESSION', false)
        commit('SET_ID', 0)
        commit('SET_ROLES', [])
        Vue.ls.remove(ACCESS_SESSION)

        logout(state.session)
          .then(() => {
            resolve()
          })
          .catch(() => {
            resolve()
          })
      })
    },

    // 设置界面语言
    SetLang({ commit }, lang) {
      return new Promise(resolve => {
        commit('SET_LANG', lang)
        loadLanguageAsync(lang)
        resolve()
      })
    }
  }
}

export default user
