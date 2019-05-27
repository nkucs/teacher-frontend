<template>
  <div>
    <a-row :gutter="12">
      <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card :loading="loading" :bordered="false" title="通过测试用例标签统计" :style="{ marginTop: '24px' }">
          <ve-bar :data="caseData" :settings="PassCaseSettings"></ve-bar>
        </a-card>
      </a-col>
      <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card :loading="loading" :bordered="false" title="未通过测试用例标签统计" :style="{ marginTop: '24px' }">
          <ve-bar :data="caseData" :settings="notPassCaseSettings"></ve-bar>
        </a-card>
      </a-col>
    </a-row>
    <a-card :loading="loading" :bordered="false" title="学生单个/所有题目提交统计" :style="{ marginTop: '24px' }">
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
      <ve-line :data="linechartData" :settings="linechartSettings"></ve-line>
    </a-card>
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
    <a-card :loading="loading" :bordered="false" title="考试单个/所有题目提交统计" :style="{ marginTop: '24px' }">
      <a-radio-group defaultValue="a">
        <a-radio-button value="a">15分钟</a-radio-button>
        <a-radio-button value="b">30分钟</a-radio-button>
        <a-radio-button value="c">60分钟</a-radio-button>
      </a-radio-group>
      <ve-line :data="linechartData" :settings="problemsubmissionSettings"></ve-line>
    </a-card>
  </div>
</template>

<script>
import moment from 'moment'
import { version } from 'ant-design-vue/es'
export default {
    data () {
      this.PassCaseSettings = {
        metrics: ['通过人数'],
        dataOrder: {
          label: '通过人数',
          order: 'desc'
        }
      }
      this.notPassCaseSettings = {
        metrics: ['未通过人数'],
        dataOrder: {
          label: '未通过人数',
          order: 'desc'
        }
      }
      this.studentsubmissionSettings = {
        metrics: ['所有提交', 'AC', '非AC'],
        dimension: ['日期']
      }
      this.problemsubmissionSettings = {
        stack: { '日期': ['所有提交', 'AC', '非AC'] },
        area: true
      }
      return {
        moment,
        version,
        caseData: {
          columns: ['测例', '通过人数', '未通过人数'],
          rows: [
            { '测例': '测例1', '通过人数': 20 , '未通过人数': 10 },
            { '测例': '测例2', '通过人数': 10 , '未通过人数': 20},
            { '测例': '测例3', '通过人数': 4 , '未通过人数': 26},
            { '测例': '测例4', '通过人数': 8 , '未通过人数': 22},
            { '测例': '测例5', '通过人数': 12 , '未通过人数': 18},
            { '测例': '测例6', '通过人数': 6 , '未通过人数': 24},
            { '测例': '测例7', '通过人数': 16 , '未通过人数': 14},
            { '测例': '测例8', '通过人数': 18 , '未通过人数': 12}
          ]
        },
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

<style>
</style>
