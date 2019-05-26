<template>
  <div>
    <a-tabs defaultActiveKey="1" @change="callback">
      <a-tab-pane tab="学生" key="1">
        <a-table :columns="columns1" :dataSource="data1">
        </a-table>
      </a-tab-pane>
      <a-tab-pane tab="题目" key="2" forceRender>
        <a-table :columns="columns2" :dataSource="data2">
        </a-table>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
const columns1 = [{
  title: '姓名',
  dataIndex: 'name', 
}, {
  title: '学号',
  dataIndex: 'number', 
}, {
  title: '描述',
  dataIndex: 'description',
}]

const columns2 = [{
  title: '编号',
  dataIndex: 'id', 
}, {
  title: '名称',
  dataIndex: 'name', 
}, {
  title: '描述',
  dataIndex: 'description',
}]

const data1 = [{
  key: '1',
  name: '张三',
  number: '1612900',
  description: '该内容没有描述'
}, {
  key: '2',
  name: '李四',
  number: '1612901',
  description: '该内容没有描述'
}, {
  key: '3',
  name: '王五',
  number: '1612902',
  description: '该内容没有描述'
}]

const data2 = [{
  key: '1',
  id: 1,
  name: 'a+b问题',
  description: '该内容没有描述'
}, {
  key: '2',
  id: 2,
  name: '摘苹果问题',
  description: '该内容没有描述'
}, {
  key: '3',
  id: 3,
  name: '猴子摘桃问题',
  description: '该内容没有描述'
}]

export default {
  data() {
    return {
      data1,
      data2,
      columns1,
      columns2,
    }
  },
  methods: {
  },
}
</script>