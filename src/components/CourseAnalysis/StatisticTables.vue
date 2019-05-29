<template>
  <a-card :loading="loading" :bordered="false" title="提交次数列表">
    <a-table :dataSource="ListData">
      <a-table-column title="题目编号" data-index="problem_id" key="problem_id"/>
      <a-table-column title="名称" data-index="problem_name" key="problem_name"/>
      <a-table-column title="开始时间" data-index="start_time" key="start_time"/>
      <a-table-column title="AV率" data-index="AVrate" key="end_time"/>
      <a-table-column title="提交次数" data-index="submite_times" key="action"/>
      <a-table-column title="状态" data-index="state" key="action"/>
      <a-table-column title="更新时间" data-index="update_time" key="action"/>
    </a-table>
  </a-card>
</template>

<script>
export default {
  data() {
    return {
      ListData: [
        {
          problem_id: '00001',
          problem_name: 'lab1：背包问题',
          start_time: '2017-10-31 23:12:00',
          update_time: '2017-10-31 23:12:00',
          AVrate: '79%',
          submite_times: '89',
          state: 'closed'
        },
        {
          problem_id: '00002',
          problem_name: 'lab2：2',
          start_time: '2017-10-31 23:12:00',
          update_time: '2017-10-31 23:12:00',
          AVrate: '79%',
          submite_times: '80',
          state: 'closed'
        },
        {
          problem_id: '00003',
          problem_name: 'lab3：3',
          start_time: '2017-10-31 23:12:00',
          update_time: '2017-10-31 23:12:00',
          AVrate: '79%',
          submite_times: '89',
          state: 'closed'
        },
        {
          problem_id: '00004',
          problem_name: 'lab4：4',
          start_time: '2017-10-31 23:12:00',
          update_time: '2017-10-31 23:12:00',
          AVrate: '79%',
          submite_times: '89',
          state: 'closed'
        },
        {
          problem_id: '00005',
          problem_name: 'lab5：5',
          start_time: '2017-10-31 23:12:00',
          update_time: '2017-10-31 23:12:00',
          AVrate: '79%',
          submite_times: '89',
          state: 'closed'
        },
        {
          problem_id: '00006',
          problem_name: 'lab5：6',
          start_time: '2017-10-31 23:12:00',
          update_time: '2017-10-31 23:12:00',
          AVrate: '82%',
          submite_times: '5',
          state: 'open'
        },
        {
          problem_id: '00007',
          problem_name: 'lab5：7',
          start_time: '2017-10-31 23:12:00',
          update_time: '2017-10-31 23:12:00',
          AVrate: '2%',
          submite_times: '1000',
          state: 'closed'
        },
        {
          problem_id: '00004',
          problem_name: 'lab4：4',
          start_time: '2017-10-31 23:12:00',
          update_time: '2017-10-31 23:12:00',
          AVrate: '79%',
          submite_times: '89',
          state: 'closed'
        },
        {
          problem_id: '00005',
          problem_name: 'lab5：5',
          start_time: '2017-10-31 23:12:00',
          update_time: '2017-10-31 23:12:00',
          AVrate: '79%',
          submite_times: '89',
          state: 'closed'
        },
        {
          problem_id: '00006',
          problem_name: 'lab5：6',
          start_time: '2017-10-31 23:12:00',
          update_time: '2017-10-31 23:12:00',
          AVrate: '82%',
          submite_times: '5',
          state: 'open'
        },
        {
          problem_id: '00007',
          problem_name: 'lab5：7',
          start_time: '2017-10-31 23:12:00',
          update_time: '2017-10-31 23:12:00',
          AVrate: '2%',
          submite_times: '1000',
          state: 'closed'
        }
      ]
    }
  }
}
</script>

<style scoped>
</style>
