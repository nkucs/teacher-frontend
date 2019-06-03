import { axios } from '@/utils/request'


const apis = {
  getSubmission: '/teacher/submission/get-submission',
  getAllProblems: '/teacher/problem/get-all-problems',
  createProblem: '/teacher/problem/create-problem',
  editProblem: '/teacher/problem/edit-problem',
  getProblemDetail: '/teacher/problem/get-problem',
  deleteProblem: '/teacher/problem/delete-problem',
  getAllSubmissions: '/teacher/problem/get-all-submissions'

}

export function getSubmission(parameter) {
  return axios({
    url: apis.getSubmission,
    method: 'get',
    params: parameter
  })
}

export function getAllProblems(parameter) {
  return axios({
    url: apis.getAllProblems,
    method: 'get',
    params: parameter
  })
}

export function createProblem(parameter) {
  return axios({
    url: apis.createProblem,
    method: 'get',
    params: parameter
  })
}

export function editProblem(parameter) {
  return axios({
    url: apis.editProblem,
    method: 'get',
    params: parameter
  })
}

export function getProblemDetail(parameter) {
  return axios({
    url: apis.getProblemDetail,
    method: 'get',
    params: parameter
  })
}

export function deleteProblem(parameter) {
  return axios({
    url: apis.deleteProblem,
    method: 'get',
    params: parameter
  })
}

export function getAllSubmissions(parameter) {
  return axios({
    url: apis.getAllSubmissions,
    method: 'get',
    params: parameter
  })
}
