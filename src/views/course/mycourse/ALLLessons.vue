<template>
  <div>
    <div style="margin-bottom: 5px">
      <a-input v-model="coursename" style="width: 44%" addonBefore="课程名称" />
      <a-input v-model="teachername" style="width: 43%" addonBefore="教师姓名" />
      <a-button type="primary" align="right" @click="seek()">查询</a-button>
      <a-button align="right" @click="reset()">重置</a-button>
    </div>
    <a-table :columns="columns" :dataSource="data">
      <a slot="id" slot-scope="text" href="javascript:;">{{ text }}</a>
      <span slot="customTitle"> 课程ID</span>
      <span slot="action" slot-scope="text, record">
        <router-link to="course/details"><a>详情</a></router-link>
        <a-divider type="vertical" />
        <a href="javascript:;" @click="copycourse(record.id, record.teacher)">复制</a>
      </span>
    </a-table>
  </div>
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

import { getallcourse, copycourse, seekcourse } from '@/api/course'
export default {
  data() {
    return {
      data,
      columns,
      coursename: '在此输入课程名称',
      teachername: '在此输入教师姓名'
    }
  },
  methods: {
    seek () {
      const self = this
      if (self.coursename === '在此输入课程名称' && self.teachername === '在此输入教师姓名') {
        alert(`请输入正确的课程名称或教师名称查询！`)
      }
      else if (self.coursename === '在此输入课程名称') {
        seekcourse({
          params: {
            course_name: self.coursename,
            teacher_name: '',
          }
        }).then(response => {
          console.log(`seek successfully`)
          self.data = response.course    //对应后端返回的数据
        }).catch((fail) => {
          alert('查找失败！请输入正确的教师名！')
          console.log(fail)
        })
      }
      else if (self.teachername === '在此输入教师姓名') {
        seekcourse({
          params: {
            teacher_name: self.teachername,
            course_name: '',
          }
        }).then(response => {
          console.log(`seek successfully`)
          self.data = response.course    //对应后端返回的数据
        }).catch((fail) => {
          alert('查找失败！请输入正确的课程名！')
          console.log(fail)
        })
      }
      else {
        seekcourse({
          params: {
            teacher_name: self.teachername,
            course_name: self.coursename,
          }
        }).then(response => {
          console.log(`seek successfully`)
          self.data = response.course    //对应后端返回的数据
        }).catch((fail) => {
          alert('查找失败！请输入正确的信息！')
          console.log(fail)
        })
      }
    },
    reset () {
      this.coursename = '在此输入课程名称'
      this.teachername = '在此输入教师姓名'
    },
    copycourse (courseID, teacherID) {
      const self = this
      console.log(`复制课程${courseID}`)
      copycourse({
        params: {
          course_id: courseID,  //向后端传参
          teacher_id: teacherID,
        }
      }).then(() => {
        console.log(`${teacherID} copied course ${courseID} successfully.`)
        for (var item in self.data) {
          if (self.data[item].id === courseID) {
            self.data.splice(item, 1)
            break
          }
        }
      }).catch((fail) => {
        alert('复制课程失败！')
        console.log(fail)
      })
    }
  },
  mounted: function () {
    const self = this
    getallcourse()
    .then(response => {
      console.log(response)
      self.data = response.course //对应后端数据
    })
    .catch(fail => {
      console.log(fail)
      alert('获取课程列表失败！')
    })
  }
}
</script>