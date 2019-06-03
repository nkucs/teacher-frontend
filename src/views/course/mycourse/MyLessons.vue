<template>
  <div>
    <div style="margin-bottom: 5px">
      <a-input v-model="coursename" style="width: 40%" addonBefore="课程名称" />
      <a-button type="primary" align="right" @click="seek()">查询</a-button>
      <a-button align="right" @click="reset()">重置</a-button>
    </div>
    <a-table :columns="columns" :dataSource="data" :pagination="false">
      <a slot="id" slot-scope="text" href="javascript:;">{{ text }}</a>
      <span slot="customTitle"> 课程ID</span>
      <span slot="action" slot-scope="text, record">
        <edit-course></edit-course>
        <a-divider type="vertical" />
        <router-link to="course/details"><a>详情</a></router-link>
        <a-divider type="vertical" />
        <a href="javascript:;" key="copy" @click="toCopy(record.id)">复制</a>
        <a-divider type="vertical" />
        <a href="javascript:;" key="delete" @click="toDelete(record.id)">删除</a>
      </span>
    </a-table>
    <div style="margin-top: 16px">
      <a-pagination style="float:right" :current="page" :total="total" @change="pageChange" />
    </div>
    <a-modal
      title="确认框"
      v-model="visibleDelete"
      okText="删除"
      @ok="deletecourse"
    >
      <p> {{ `确认删除该课程？` }}</p>
    </a-modal>
    <a-modal
      title="确认框"
      v-model="visibleCopy"
      okText="复制"
      @ok="copycourse"
    >
      <p> {{ `确认复制该课程？` }}</p>
    </a-modal>
  </div>
</template>
<script>
import editCourse from './editCourseForm'
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

import { deletecourse, copycourse, getmycourse, seekcourse } from '@/api/course'
export default {
  data() {
    return {
      data,
      columns,
      coursename: '',
      page: 1,
      total: 10,
      visibleDelete: false,
      visibleCopy: false,
      deleteID: 0,
      copyID: 0,
      teacher_id: ''
    }
  },
  components: {
    editCourse
  },
  methods: {
    toDelete (ID) {
      this.deleteID = ID
      this.visibleDelete = true
    },
    toCopy (ID) {
      this.copyID = ID
      this.visibleCopy = true
    },
    seek () {
      if (this.coursename === '') {
        alert(`请输入课程名称查询！`)
      }
      else {
        seekcourse({
          'page': this.page,
          'pageLength': 10,
          'name': this.coursename,
          'teacher': this.teachername
        }).then(response => {
          console.log(`seek successfully`)
          this.data = response.courses
          this.page = response.currentPage
          this.total = response.totalPages * 10
        }).catch((fail) => {
          alert('查找失败！')
          console.log(fail)
        })
      }
    },
    reset () {
      this.coursename = ''
      this.getmycourse()
    },
    copycourse () {
      copycourse({
        'courseCode': this.copyID
      }).then(() => {
        console.log(`copied course successfully.`)
      }).catch((fail) => {
        alert('复制课程失败！')
        console.log(fail)
      })
    },
    deletecourse() {
      deletecourse({
        'courseCode': this.deleteID
      }).then(() => {
        console.log(`deleted course successfully.`)
      }).catch((fail) => {
        alert('删除课程失败！')
        console.log(fail)
      })
    },
    getmycourse() {
      getmycourse({
        'page': this.page,
        'pageLength': 10,
        'teacherNumber': this.teacher_id
      }).then((response) => {
        console.log(`get my courses successfully.`)
        this.data = response.courses
        this.page = response.currentPage
        this.total = response.totalPages * 10
      }).catch((fail) => {
        alert('获取课程列表失败！')
        console.log(fail)
      })
    },
    pageChange (page) {
      console.log(page)
      this.page = page
      this.getmycourse()
    }
  },
  mounted: function () {
    this.getmycourse()
  }
}
</script>
