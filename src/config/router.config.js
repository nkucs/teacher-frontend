// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/components/layouts'

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/course',
    children: [
      {
        path: '/course',
        name: '课程管理',
        component: () => import('@/views/course/Course'),
        meta: { title: '课程管理', icon: 'dashboard', permission: [ 'dashboard' ] }
      },
      {
        path: '/problem/list',
        name: '题目管理',
        component: BlankLayout,
        meta: { title: '题目管理', icon: 'dashboard', permission: [ 'dashboard' ] },
        children: [{
          path: '/problem/list', // todo
          name: '题目列表',
          component: () => import('@/views/problem/ProblemList'),
          meta: { title: '题目列表', permission: [ 'dashboard' ] }
        },
        {
          path: '/problem/add', // todo
          name: '添加题目',
          component: () => import('@/views/problem/ProblemDetail'),
          meta: { title: '添加题目', permission: [ 'dashboard' ] }
        },{
          path: '/problem/modify', // todo
          name: '修改题目',
          component: () => import('@/views/problem/ProblemModify'),
          meta: { title: '修改题目', permission: [ 'dashboard' ] }
        }]
      },
      {
        path: '/stat/course',
        name: '统计信息',
        component: () => import('@/views/stat/StatCourse'),
        meta: { title: '统计信息', icon: 'dashboard', permission: [ 'dashboard' ] },
        children: [{
          path: '/stat/course', // todo
          name: '课程统计',
          component: () => import('@/views/stat/StatCourse'),
          meta: { title: '课程统计', permission: [ 'dashboard' ] }
        },
        {
          path: '/stat/problem', // todo
          name: '题目分析',
          component: () => import('@/views/stat/StatProblem'),
          meta: { title: '题目分析', permission: [ 'dashboard' ] }
        },
        {
          path: '/stat/exam', // todo
          name: '考试情况',
          component: () => import('@/views/stat/StatExam'),
          meta: { title: '考试情况', permission: [ 'dashboard' ] }
        }]
      },
      {
        path: '/exam/list',
        name: '考试中心',
        component: () => import('@/views/exam/ExamList'),
        meta: { title: '考试中心', icon: 'dashboard', permission: [ 'dashboard' ] }
      },
      {
        path: '/experiment/list',
        name: '实验列表',
        component: () => import('@/views/experiment/ExperimentList'),
        meta: { title: '实验列表', icon: 'dashboard', permission: [ 'dashboard' ] }
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      }
    ]
  },

  {
    path: '/test',
    component: BlankLayout,
    redirect: '/test/home',
    children: [
      {
        path: 'home',
        name: 'TestHome',
        component: () => import('@/views/Home')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  },

]
