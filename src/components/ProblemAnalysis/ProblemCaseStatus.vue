<template>
  <a-card :loading="loading" :bordered="false" title="测例标签">
    <a-row :gutter="12">
      <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card :loading="loading" :bordered="false">
          <ve-bar :data="testCaseData" :settings="passTestCaseSettings"></ve-bar>
          <div class="stext">通过测例标签</div>
        </a-card>
      </a-col>
      <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card :loading="loading" :bordered="false">
          <ve-bar :data="testCaseData" :settings="notPassTestCaseSettings"></ve-bar>
          <div class="stext">未通过测例标签</div>
        </a-card>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import {getProblemSubmissiontags} from '../../api/problemAnalysis.js'
export default {
  data() {
    this.passTestCaseSettings = {
      metrics: ['通过数'],
      dataOrder: {
        label: '通过数',
        order: 'desc'
      }
    }

    this.notPassTestCaseSettings = {
      metrics: ['未通过数'],
      dataOrder: {
        label: '未通过数',
        order: 'desc'
      }
    }
    return {
      testCaseData: {
        columns: ['标签', '通过数', '未通过数'],
        rows: []
      }
    }
  },
  created: function() {
    const that = this
    const problem_id = that.$route.params.problem_id
    getProblemSubmissiontags(problem_id).then(
      (response) => {
        const data = response.ans
        for (let i = 0; i < data.length; i++) {
          console.log(data[i])
          that.testCaseData.rows.push(data[i])
        }
      }
    )
  }
}
</script>

<style scoped>
.stext {
  text-align: center;
  font-family: '微软雅黑';
  font-size: large;
}
</style>
