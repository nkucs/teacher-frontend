<template>
  <a-card>
    <div style="width: 90%">
      <ve-bar :data="chartData" :settings="chartSettings"></ve-bar>
    </div>
  </a-card>
</template>

<script>
import { caseTagStatistics } from '@/api/distribution'
export default {
  props: {
    studentNumber: {
      type: String,
      default: '1000000'
    }
  },
  data () {
    this.chartSettings = {
      metrics: ['数量'],
      dataOrder: {
        label: '数量',
        order: 'desc'
      }
    }
    return {
      chartData: {
        columns: ['标签名称', '数量'],
        rows: [
          { '标签名称': '边界条件', '数量': 1393 },
          { '标签名称': '空指针', '数量': 3530 },
          { '标签名称': '输入非整数', '数量': 2923 },
          { '标签名称': '数组越界', '数量': 1723 },
          { '标签名称': '输入多余空格', '数量': 3792 },
          { '标签名称': '类型不匹配', '数量': 4593 }
        ]
      }
    }
  },
  created() {
    var that = this
    caseTagStatistics({
        student_id: that.studentNumber,
        status: 2
      }).then(function(res) {
        that.chartData['rows'] = res
      })
  }
}
</script>

<style scoped>

</style>

