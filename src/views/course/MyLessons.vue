<template>
  <a-table :columns="columns" :dataSource="data">
    <a slot="id" slot-scope="text" href="javascript:;">{{text}}</a>
    <span slot="customTitle"> 课程ID</span>
    <span slot="action" slot-scope="text, record">
      <a href="javascript:;">编辑</a>
      <a-divider type="vertical" />
      <a href="javascript:;">详情</a>
      <a-divider type="vertical" />
      <a href="javascript:;">复制</a>
      <a-divider type="vertical" />
      <a href="javascript:;">删除</a>
    </span>
  </a-table>
</template>
<script>
const columns = [{
  dataIndex: 'id',
  key: 'id',
  slots: { title: 'customTitle' },
  scopedSlots: { customRender: 'id' },
}, {
  title: '课程名称',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '开课教师',
  dataIndex: 'teacher',
  key: 'teacher',
}, {
  title: '开始时间',
  dataIndex: 'start',
  key: 'start',
},  {
  title: '截止时间',
  dataIndex: 'end',
  key: 'end',
}, {
  title: '操作',
  key: 'action',
  scopedSlots: { customRender: 'action' },
}]

const data = [{
  id: '1',
  name: '高级语言程序设计2-1',
  teacher: '好老师',
  start: '2018-03-01',
  end: '2018-06-01'
}, {
  id: '2',
  name: '高级语言程序设计2-2',
  teacher: '好老师',
  start: '2018-03-01',
  end: '2018-06-01'
}]

export default {
  data() {
    return {
      data,
      columns,
    }
  }
}
</script>