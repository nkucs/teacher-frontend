<template>
  <a-card :bordered="false" title="提交次数列表">
    <a-table :columns="columns" :dataSource="ListData">
      <a slot="name" slot-scope="text, record" href="javascript:;" @click="transferToProblem(record)">{{ text }}</a>
      <span slot="customTitle">名称</span>
      <span slot="tags" slot-scope="tags">
        <a-tag v-for="tag in tags" color="blue" :key="tag">{{ tag }}</a-tag>
      </span>
    </a-table>
  </a-card>
</template>

<script>
import { problemTables } from '@/api/courseAnalysis'

export default {
  created() {
    problemTables(this.$route.query.course_id).then((response) => {
      if (response.length != 0) {
        this.ListData = response
      }
    })
    for (let i = 0; i < 10; i += 1) {
      this.ListData.push({
        problem_id: i.toString().padStart(5, '0'),
        problem_name: 'lab1：背包问题',
        start_time: '2017-10-31 23:12:00',
        update_time: '2017-10-31 23:12:00',
        ACrate: '79%',
        submit_times: '89'
      })
    }
  },
  data() {
    return {
      columns: [
        {
          title: '题目编号',
          dataIndex: 'problem_id'
        },
        {
          dataIndex: 'problem_name',
          key: 'name',
          slots: {
            title: 'customTitle'
          },
          scopedSlots: {
            customRender: 'name'
          }
        },
        {
          title: '开始时间',
          dataIndex: 'start_time'
        },
        {
          title: 'AC率',
          dataIndex: 'ACrate'
        },
        {
          title: '提交次数',
          dataIndex: 'submit_times'
        },
        {
          title: '更新时间',
          dataIndex: 'update_time'
        }
      ],
      ListData: []
    }
  },
  methods: {
    transferToProblem: function (record) {
      this.$router.push({
        name: '题目分析',
        params: {
          problem_id: record['problem_id']
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
