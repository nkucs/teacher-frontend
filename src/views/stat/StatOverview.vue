<template>
  <div class="page-header-index-wide">
    <a-col>
      <a-card
        class="antd-pro-pages-dashboard-analysis-salesCard"
        :loading="loading"
        :bordered="true"
        title="选课学生"
        :style="{ marginTop: '24px', minHeight: '50px' }"
      >
        <div>
          <div>
            <ve-pie :data="stuData"></ve-pie>
          </div>
        </div>
      </a-card>
    </a-col>

    <a-col>
      <a-card :style="{ marginTop: '24px' }">
        <div class="left-graph">
          <h4>课程题目总数</h4>
          <ve-ring :data="problemData"></ve-ring>
        </div>
        <div class="right-graph">
          <h4>AC次数</h4>
          <ve-ring :data="acData"></ve-ring>
        </div>
      </a-card>
    </a-col>

    <a-col>
      <a-card
        class="antd-pro-pages-dashboard-analysis-salesCard"
        :loading="loading"
        :bordered="true"
        title="完成题目所属课程占比"
        :style="{ marginTop: '24px', minHeight: '50px' }"
      >
        <div>
          <div>
            <ve-pie :data="ACProblemData"></ve-pie>
          </div>
        </div>
      </a-card>
    </a-col>
  </div>
</template>

<script>
import { axios } from '@/utils/request'

export default {
  data() {
    return {
      stuData: {
        columns: ['年份', '人数'],
        rows: [
          { 年份: '2015', 人数: 1393 },
          { 年份: '2016', 人数: 3530 },
          { 年份: '2017', 人数: 2923 },
          { 年份: '2018', 人数: 1723 },
          { 年份: '2019', 人数: 3792 }
        ]
      },
      problemData: {
        columns: ['课程名称', '题目总数'],
        rows: [
          { 课程名称: '课程1', 题目总数: 1393 },
          { 课程名称: '课程2', 题目总数: 3530 },
          { 课程名称: '课程3', 题目总数: 3530 },
          { 课程名称: '课程4', 题目总数: 3530 },
          { 课程名称: '课程5', 题目总数: 3530 }
        ]
      },
      acData: {
        columns: ['是否ac', '次数'],
        rows: [{ 是否ac: 'ac次数', 次数: 1393 }, { 是否ac: '未ac次数', 次数: 3530 }]
      },
      ACProblemData: {
        columns: ['课程名称', '题目数'],
        rows: [
          { 课程名称: 'JAVA', 题目数: 4 },
          { 课程名称: 'C++', 题目数: 5 },
          { 课程名称: 'Python', 题目数: 9 },
          { 课程名称: '数据结构', 题目数: 10 },
          { 课程名称: '算法', 题目数: 3 }
        ]
      }
    }
  },
  created: function(){
    this.getACProblemInfo()
  },
  methods:{
    getACProblemInfo:function(){
      axios({
        method: 'get',
        url: '/teacher/course/stat/problem-data'
      }).then(response => {
        var num = Object.keys(response.data).length
        var problemKey = Object.keys(response.data)
        var problemValue = Object.values(response.data)
        this.problemData.rows = []
        for (let index = 0; index < num; index++) {
          this.problemData.rows.push({'课程名称': problemKey[index],
            '题目总数': problemValue[index]})
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getStuData:function(){
      const that = this
      axios({
        method: 'get',
        url: '/teacher/student/stat/get_student_num_by_year'
      }).then(response => {
        var num = Object.keys(response.data).length
        var stuKey = Object.keys(response.data)
        var stuValue = Object.values(response.data)
        that.stuData.rows = []
        for (let index = 0; index < num; index++) {
          this.problemData.rows.push({'年级': stuKey[index]+'级',
            '人数': stuValue[index]})
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getACData:function(){
      const that = this
      axios({
        method: 'get',
        url: '/teacher/submission/stat/get_submission_stat'
      }).then(response => {
        var acValue = Object.values(response.data)
        that.acData.rows = []
        that.acData.rows.push({'是否ac': 'AC次数','题目总数': acValue[0]})
        that.acData.rows.push({'是否ac': '非AC次数','题目总数': acValue[1]})
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.extra-wrapper {
  line-height: 55px;
  padding-right: 24px;

  .extra-item {
    display: inline-block;
    margin-right: 24px;

    a {
      margin-left: 20px;
    }
  }
}
.left-graph {
  width: 40%;
  float: left;
}
.right-graph {
  width: 40%;
  float: right;
  margin-right: 5%;
}
</style>
