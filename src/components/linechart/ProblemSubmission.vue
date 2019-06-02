<template>
  <div>
    <a-card :loading="loading" :bordered="false" title="单个/所有题目提交统计" :style="{ marginTop: '24px' }">
      <div slot="extra" style="height: inherit;">
        <div class="analysis-salesTypeRadio">
          <a-radio-group defaultValue="a">
            <a-radio-button value="a">日</a-radio-button>
            <a-radio-button value="b">周</a-radio-button>
            <a-radio-button value="c">月</a-radio-button>
            <a-radio-button value="d">学期</a-radio-button>
            <a-radio-button value="e">年</a-radio-button>
          </a-radio-group>
          <a-date-picker :defaultValue="moment()" style="margin-left:30px"/>
        </div>
      </div>
      <ve-line :data="linechartData" :settings="problemsubmissionSettings"></ve-line>
    </a-card>
  </div>
</template>

<script>
import moment from 'moment'
import { version } from 'ant-design-vue/es'
export default {
    data () {
      this.problemsubmissionSettings = {
        stack: { '日期': ['所有提交', 'AC', '非AC'] },
        area: true
      }
      return {
        moment,
        version,
        linechartData: {
          columns: ['日期','所有提交', 'AC', '非AC'],
          rows: [
            { '日期': '1/1', '所有提交': 1393, 'AC': 1093, '非AC': 2000 },
            { '日期': '1/2', '所有提交': 3530, 'AC': 3230, '非AC': 2103 },
            { '日期': '1/3', '所有提交': 2923, 'AC': 2623, '非AC': 900 },
            { '日期': '1/4', '所有提交': 1723, 'AC': 1423, '非AC': 700 },
            { '日期': '1/5', '所有提交': 3792, 'AC': 3492, '非AC': 600 },
            { '日期': '1/6', '所有提交': 4593, 'AC': 4293, '非AC': 500 }
          ]
        }
      }
    }
  }
</script>
