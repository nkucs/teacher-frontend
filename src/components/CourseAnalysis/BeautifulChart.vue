<template>
  <a-card :bordered="false" title="测例标签">
    <a-row :gutter="12">
      <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card :bordered="false">
          <ve-bar :data="testCaseData" :settings="passTestCaseSettings"></ve-bar>
          <div class="stext">通过测例标签</div>
        </a-card>
      </a-col>
      <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card :bordered="false">
          <ve-bar :data="testCaseData" :settings="notPassTestCaseSettings"></ve-bar>
          <div class="stext">未通过测例标签</div>
        </a-card>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import {get_submission_tags} from '../../api/courseAnalysis.js'
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
    // 这里添加course_id
    get_submission_tags(this.$route.query.course_id).then(
      (response) => {
        const data = response.ans
        for (let i = 0; i < data.length; i++) {
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
