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
  </div>
</template>

<script>
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
      return {
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
        }
      }
    }
  }
</script>
