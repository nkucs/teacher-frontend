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
        rows: [
          { 标签: '测试一类', 通过数: '1000', 未通过数: '700' },
          { 标签: '测试二类', 通过数: '500', 未通过数: '100' },
          { 标签: '测试三类', 通过数: '300', 未通过数: '1500' },
          { 标签: '测试四类', 通过数: '500', 未通过数: '1000' },
          { 标签: '测试五类', 通过数: '150', 未通过数: '100' },
          { 标签: '测试六类', 通过数: '800', 未通过数: '500' }
        ]
      }
    }
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
