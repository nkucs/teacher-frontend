<template>
  <a-card :loading="loading" :bordered="false" title="提交次数统计">
    <a-menu v-model="current" mode="horizontal">
      <a-menu-item @click="sendSubmissionCountMsg(1, 'day')" key="day">
        <a-icon type="calendar"/>日
      </a-menu-item>
      <a-menu-item @click="sendSubmissionCountMsg(1, 'week')" key="week">
        <a-icon type="calendar"/>周
      </a-menu-item>
      <a-menu-item @click="sendSubmissionCountMsg(1, 'month')" key="month">
        <a-icon type="calendar"/>月
      </a-menu-item>
      <a-menu-item @click="sendSubmissionCountMsg(1, 'year')" key="year">
        <a-icon type="calendar"/>年
      </a-menu-item>
    </a-menu>
    <div>
      <ve-line :data="LineChartData"></ve-line>
    </div>
  </a-card>
</template>

<script>
import { getProblemSubmissionCount } from '@/api/problemAnalysis'

export default {

  created() {
    getProblemSubmissionCount(this.$route.params.problem_id, 'day').then((response) => {
      console.log(response)
      if (response['data'].length != 0) {
          for (let i = 0; i < 12; i++) {
            this.LineChartData_day.rows[i]['总提交次数'] = response['data']['total'][i]
            this.LineChartData_day.rows[i]['AC提交次数'] = response['data']['AC'][i]
            this.LineChartData_day.rows[i]['非AC提交次数'] = response['data']['not_AC'][i]
            this.LineChartData = this.LineChartData_day
          }
      }
    })

  },

  data() {
    return {
        LineChartData: {
        columns: ['时间', '总提交次数', 'AC提交次数', '非AC提交次数'],
        rows: []
      },


      LineChartData_day: {
        columns: ['时间', '总提交次数', 'AC提交次数', '非AC提交次数'],
        rows: [
          { 时间: '0-2时', 总提交次数: 1393, AC提交次数: 1093, 非AC提交次数: 300 },
          { 时间: '2-4时', 总提交次数: 3530, AC提交次数: 3230, 非AC提交次数: 300 },
          { 时间: '4-6时', 总提交次数: 2923, AC提交次数: 2623, 非AC提交次数: 300 },
          { 时间: '6-8时', 总提交次数: 1723, AC提交次数: 1423, 非AC提交次数: 300 },
          { 时间: '8-10时', 总提交次数: 3792, AC提交次数: 3492, 非AC提交次数: 300 },
          { 时间: '10-12时', 总提交次数: 4593, AC提交次数: 4293, 非AC提交次数: 300 },
          { 时间: '12-14时', 总提交次数: 4321, AC提交次数: 3921, 非AC提交次数: 400 },
          { 时间: '14-16时', 总提交次数: 3593, AC提交次数: 3093, 非AC提交次数: 500 },
          { 时间: '16-18时', 总提交次数: 1593, AC提交次数: 993, 非AC提交次数: 600 },
          { 时间: '18-20时', 总提交次数: 4193, AC提交次数: 3993, 非AC提交次数: 200 },
          { 时间: '20-22时', 总提交次数: 2793, AC提交次数: 2693, 非AC提交次数: 100 },
          { 时间: '22-24时', 总提交次数: 1093, AC提交次数: 593, 非AC提交次数: 500 }
        ]
      },

      LineChartData_week: {
        columns: ['时间', '总提交次数', 'AC提交次数', '非AC提交次数'],
        rows: [
          { 时间: '5.30', 总提交次数: 1393, AC提交次数: 1093, 非AC提交次数: 300 },
          { 时间: '5.31', 总提交次数: 3530, AC提交次数: 3230, 非AC提交次数: 300 },
          { 时间: '6.1', 总提交次数: 2923, AC提交次数: 2623, 非AC提交次数: 300 },
          { 时间: '6.2', 总提交次数: 1723, AC提交次数: 1423, 非AC提交次数: 300 },
          { 时间: '6.3', 总提交次数: 3792, AC提交次数: 3492, 非AC提交次数: 300 },
          { 时间: '6.4', 总提交次数: 4593, AC提交次数: 4293, 非AC提交次数: 300 },
          { 时间: '6.5', 总提交次数: 4321, AC提交次数: 3921, 非AC提交次数: 400 }
        ]
      },

      LineChartData_month: {
        columns: ['时间', '总提交次数', 'AC提交次数', '非AC提交次数'],
        rows: [
          { 时间: '1月', 总提交次数: 1193, AC提交次数: 893, 非AC提交次数: 300 },
          { 时间: '2月', 总提交次数: 3730, AC提交次数: 3430, 非AC提交次数: 300 },
          { 时间: '3月', 总提交次数: 2923, AC提交次数: 2623, 非AC提交次数: 300 },
          { 时间: '4月', 总提交次数: 1723, AC提交次数: 1423, 非AC提交次数: 300 },
          { 时间: '5月', 总提交次数: 3792, AC提交次数: 3492, 非AC提交次数: 300 },
          { 时间: '6月', 总提交次数: 4593, AC提交次数: 4293, 非AC提交次数: 300 },
          { 时间: '7月', 总提交次数: 2321, AC提交次数: 1921, 非AC提交次数: 400 },
          { 时间: '8月', 总提交次数: 3593, AC提交次数: 3093, 非AC提交次数: 500 },
          { 时间: '9月', 总提交次数: 1593, AC提交次数: 993, 非AC提交次数: 600 },
          { 时间: '10月', 总提交次数: 4193, AC提交次数: 3993, 非AC提交次数: 200 },
          { 时间: '11月', 总提交次数: 2793, AC提交次数: 2693, 非AC提交次数: 100 },
          { 时间: '12月', 总提交次数: 1093, AC提交次数: 593, 非AC提交次数: 500 }
        ]
      },

      LineChartData_year: {
        columns: ['时间', '总提交次数', 'AC提交次数', '非AC提交次数'],
        rows: [
          { 时间: '2015', 总提交次数: 9456, AC提交次数: 7456, 非AC提交次数: 2000 },
          { 时间: '2016', 总提交次数: 6730, AC提交次数: 3430, 非AC提交次数: 3300 },
          { 时间: '2017', 总提交次数: 7923, AC提交次数: 6623, 非AC提交次数: 1300 },
          { 时间: '2018', 总提交次数: 10000, AC提交次数: 5000, 非AC提交次数: 5000 },
          { 时间: '2019', 总提交次数: 8792, AC提交次数: 4492, 非AC提交次数: 4300 }
        ]
      },

    }
  },

  methods: {
    sendSubmissionCountMsg: function(problem_id, date_range) {
      if (date_range == 'day') {
        getProblemSubmissionCount(this.$route.params.problem_id, 'day').then((response) => {
        console.log('enter day')
        if (response['data'].length != 0) {
          for (let i = 0; i < 12; i++) {
            this.LineChartData_day.rows[i]['总提交次数'] = response['data']['total'][i]
            this.LineChartData_day.rows[i]['AC提交次数'] = response['data']['AC'][i]
            this.LineChartData_day.rows[i]['非AC提交次数'] = response['data']['not_AC'][i]
          }
          this.LineChartData = this.LineChartData_day
        }
      })        
      }

      else if (date_range == 'week') {
        getProblemSubmissionCount(this.$route.params.problem_id, 'week').then((response) => {
        if (response['data'].length != 0) {
          let i = 0
          for (const date in response['data']['total']) {
            this.LineChartData_week.rows[i]['时间'] = date
            this.LineChartData_week.rows[i]['总提交次数'] = response['data']['total'][date]
            this.LineChartData_week.rows[i]['AC提交次数'] = response['data']['AC'][date]
            this.LineChartData_week.rows[i]['非AC提交次数'] = response['data']['not_AC'][date]
            i += 1
          }
          this.LineChartData = this.LineChartData_week
        }
      })    
      }

      else if (date_range == 'month') {
        getProblemSubmissionCount(this.$route.params.problem_id, 'month').then((response) => {
        console.log('enter month')
        if (response['data'].length != 0) {
          for (let i = 0; i < 12; i++) {
            this.LineChartData_month.rows[i]['总提交次数'] = response['data']['total'][i]
            this.LineChartData_month.rows[i]['AC提交次数'] = response['data']['AC'][i]
            this.LineChartData_month.rows[i]['非AC提交次数'] = response['data']['not_AC'][i]
          }
          this.LineChartData = this.LineChartData_month
        }
      })            
      }

      else if (date_range == 'year') {
        getProblemSubmissionCount(this.$route.params.problem_id, 'year').then((response) => {
        if (response['data'].length != 0) {
          let i = 0
          for (const date in response['data']['total']) {
            this.LineChartData_year.rows[i]['时间'] = date
            this.LineChartData_year.rows[i]['总提交次数'] = response['data']['total'][date]
            this.LineChartData_year.rows[i]['AC提交次数'] = response['data']['AC'][date]
            this.LineChartData_year.rows[i]['非AC提交次数'] = response['data']['not_AC'][date]
            i += 1
          }
          this.LineChartData = this.LineChartData_year
        }
      })    
      }

    }
  }
}
</script>

<style scoped>
</style>
