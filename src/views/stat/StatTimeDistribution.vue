<template>
  <div>
    <a-card>
      <div>
        <a-button-group>
          <a-button @click="changeDistribution('日')">日</a-button>
          <a-button @click="changeDistribution('周')">周</a-button>
          <a-button @click="changeDistribution('月')">月</a-button>
          <a-button @click="changeDistribution('学期')">学期</a-button>
          <a-button @click="changeDistribution('年')">年</a-button>
        </a-button-group>

      </div>
      <div class="histogram">
        <ve-histogram :data="chartData" :extend="extend" :settings="chartSettings"></ve-histogram>
      </div>
    </a-card>
  </div>
</template>

<script>
import { distribution } from '@/api/distribution'

export default {
  props: {
    studentId: {
      type: Number,
      default: 1
      },
  },
  data () {
    this.extend = {
      legend: { show: false }
    }
    this.chartSettings = {
      metrics: ['提交数', 'AC数'],
      dimension: ['时间段'],
      legend: { show: false }
    }
    return {
      chartData: {
        columns: ['时间段', '提交数', 'AC数'],
        rows: [
          { '时间段': '0:00-2:00', '提交数': 4, 'AC数': 1 },
          { '时间段': '2:00-4:00', '提交数': 0, 'AC数': 0 },
          { '时间段': '4:00-6:00', '提交数': 0, 'AC数': 0 },
          { '时间段': '6:00-8:00', '提交数': 0, 'AC数': 0 },
          { '时间段': '8:00-10:00', '提交数': 0, 'AC数': 0 },
          { '时间段': '10:00-12:00', '提交数': 0, 'AC数': 0 },
          { '时间段': '12:00-14:00', '提交数': 7, 'AC数': 0 },
          { '时间段': '14:00-16:00', '提交数': 10, 'AC数': 0 },
          { '时间段': '16:00-18:00', '提交数': 2, 'AC数': 1 },
          { '时间段': '18:00-20:00', '提交数': 2, 'AC数': 1 },
          { '时间段': '20:00-22:00', '提交数': 0, 'AC数': 0 },
          { '时间段': '22:00-24:00', '提交数': 0, 'AC数': 0 }
        ]
      },
      start_date: this.formatDate(new Date()),
      end_date: this.formatDate(new Date())
    }
  },
  created: function () {
    this.sendRequest()
  },
  methods: {
    changeDistribution: function(message) {
      this.end_date = this.formatDate(new Date())
      var d
      switch (message) {
        case '日':
          d = this.minusDay(new Date(), 1)
          this.start_date = this.formatDate(d)
          break
        case '周':
          d = this.minusDay(new Date(), 7)
          this.start_date = this.formatDate(d)
          break
        case '月':
          d = this.minusDay(new Date(), 30)
          this.start_date = this.formatDate(d)
          break
        case '学期':
          d = this.minusDay(new Date(), 126)
          this.start_date = this.formatDate(d)
          break
        case '年':
          d = this.minusDay(new Date(), 365)
          this.start_date = this.formatDate(d)
          break
      }
      this.sendRequest()
    },

    sendRequest: function() {
      var that = this
      console.log(that)
      distribution({
        student_id: that.studentId,
        start_date: that.start_date,
        end_date: that.end_date
      }).then(function(res) {
        that.chartData.rows = res.ans
      })
    },

    minusDay: function(t, delta) {
      var t_s = t.getTime()
      t.setTime(t_s - 1000 * 60 * 60 * 24 * delta)
      return t
    },

    formatDate: function(date) {
      var month = date.getMonth() + 1
      var day = date.getDate()
      var d = date.getFullYear() + '-' + month + '-' + day
      return d
    }
  },
}
</script>

<style scoped>
.histogram {
  width: 90%;
}
</style>
