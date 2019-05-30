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
        component: PageView,
        meta: { title: '课程管理', icon: 'dashboard', permission: [ 'dashboard' ] },
        children: [{
          path: '/course',
          name: '课程列表',
          component: () => import('@/views/course/Course'),
          meta: {title: '课程列表', permission: [ 'dashboard' ] }
        }]
      },
      {
        path: '/problem/list',
        name: '题目管理',
        component: PageView,
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
        },{
            path: '/problem/sourcecode', // todo
            name: '查看源代码',
            component: () => import('@/views/problem/SourceCode'),
            meta: { title: '查看源代码', permission: [ 'dashboard' ] }
          }]
      },
      {
        path: '/stat/course',
        name: '统计信息',
        component: PageView,
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
        },
        {
          path: '/stat/overview', // todo
          name: '统计概览',
          component: () => import('@/views/stat/StatOverview'),
          meta: { title: '统计概览', permission: [ 'dashboard' ] }
        },
        // chenbin_modify
        {
          path: '/stat/courseanalysis', // todo
          name: '课程分析',
          component: () => import('@/views/stat/StatCourseAnalysis'),
          meta: { title: '课程分析', permission: [ 'dashboard' ] }
        }
        // chenbin_modify
        ]
      },
      {
        path: '/exam/list',
        name: '考试中心',
        component: BlankLayout,
        meta: { title: '考试中心', icon: 'dashboard', permission: [ 'dashboard' ] },
        children: [{
          path: '/exam/addproblems', // todo
          name: '添加考试题目',
          component: () => import('@/views/exam/ExamAddProblems'),
          meta: { title: '添加考试题目'}
        },
        {
          path: '/exam/addstudent', // todo
          name: '添加考试学生',
          component: () => import('@/views/exam/ExamAddStudent'),
          meta: { title: '添加考试学生'}
        }]
      },
      {
        path: '/experiment/list',
        name: '实验列表',
        component: () => import('@/views/experiment/ExperimentList'),
        meta: { title: '实验列表', icon: 'dashboard', permission: [ 'dashboard' ] }
      },
      {
        path: '/experiment/new',
        name: '新建实验',
        component: () => import('@/views/experiment/CreateExperiment'),
        meta: { title: '新建实验', icon: 'dashboard', permission: [ 'dashboard' ] }
      },
      {
        path: '/experiment/edit',
        name: '编辑实验',
        component: () => import('@/views/experiment/EditExperiment'),
        meta: { title: '编辑实验', icon: 'dashboard', permission: [ 'dashboard' ] }
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
  {
    path: '/createrpage',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/course/lecture/editLecture')
  },
  {
    path: '/course/details',
    name: '主讲课管理',
    component: () => import('@/views/course/lecture/tab.vue')
  },
  {
    path: '/course/details/preview',
    name: '主讲课预览',
    component: () => import('@/views/course/lecture/preview.vue')
  },
  {
    path: '/course/details/createlecture',
    name: '新建课时',
    component: () => import('@/views/course/lecture/CreateLecture')
  },
  {
    path: '/course/details/chooseproblem',
    name: '选择题目',
    component: () => import('@/views/course/lecture/ChooseProblem')
  }

]
