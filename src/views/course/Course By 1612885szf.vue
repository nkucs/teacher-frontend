<template>
<div>
  <a-table :columns="columns" :dataSource="data">
    <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
    <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
    <span slot="tags" slot-scope="tags">
      <a-tag v-for="tag in tags" color="blue" :key="tag">{{tag}}</a-tag>
    </span>
    <span slot="action" slot-scope="text, record">
      <a href="javascript:;" @click="inflate_edit_menu">编辑</a>
      <a-divider type="vertical" />
      <a href="javascript:;">详情</a>
      <a-divider type="vertical" />
      <a href="javascript:;" class="ant-dropdown-link">
        更多 <a-icon type="down" />
      </a>
    </span>
  </a-table>
  <a-modal
      v-model="edit_visible"
      title="编辑课程"
      onOk="handleOk"
    >
      <template slot="footer">
        <a-button key="back" @click="handleCancel">返回</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
          修改
        </a-button>
      </template>
      <p>课程名称：&nbsp;&nbsp;<a-input style="width: 240px; display: inline-block"/></p>
      <p>开课教师：&nbsp;&nbsp;<a-input style="width: 240px; display: inline-block"/></p>
      <p>开始时间：&nbsp;&nbsp;<a-date-picker style="width: 180px; display: inline-block"/></p>
      <p>结束时间：&nbsp;&nbsp;<a-date-picker style="width: 180px; display: inline-block"/></p>
      <p><p style="display: inline-block">课程描述：&nbsp;&nbsp;</p>
      <a-textarea :rows="4" style="resize:none"/></p>
    </a-modal>
</div>
</template>
<script>

const columns = [{
  title: '课程ID',
  dataIndex: 'id',
}, {
  title: '课程名称',
  dataIndex: 'name',
}, {
  title: '开课教师',
  dataIndex: 'teacher',
}, {
  title: '上次更新',
  dataIndex: 'last_modified',
}, {
  title: '开始时间',
  dataIndex: 'starttime',
}, {
  title: '结束时间',
  dataIndex: 'endtime',
}, {
  title: '操作',
  key: 'action',
  scopedSlots: { customRender: 'action' },
}];

const data = [{
  key: '1',
  id: '1066',
  name: '数据结构',
  teacher: '张三',
  last_modified: '2007-09-06',
  starttime: '2007-08-05',
  endtime: '2007-12-31'
}, {
  key: '2',
  id: '1067',
  name: 'Java语言程序设计',
  teacher: '李四',
  last_modified: '2007-09-06',
  starttime: '2007-08-05',
  endtime: '2007-12-31'
}, {
  key: '3',
  id: '1068',
  name: '编译原理',
  teacher: '王五',
  last_modified: '2007-09-06',
  starttime: '2007-08-05',
  endtime: '2007-12-31'
}];

export default {
  data() {
    return {
      data,
      columns,
      edit_visible: false,
    }
  },
  methods: {
    inflate_edit_menu() {
      this.edit_visible = true
    },
    handleOk(e) {
      console.log(e);
      this.edit_visible = false
    },
  }
}
</script>