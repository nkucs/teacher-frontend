<template>
  <div>
    <a href="JavaScript:void(0)" @click="inflate_edit_menu">编辑</a>
    <a-modal
      v-model="edit_visible"
      title="编辑课程"
      onOk="handleOk"
    >
      <template slot="footer">
        <a-button key="back" @click="handleCancel">
          返回
        </a-button>
        <a-button key="submit" @click="handleOk">
          修改
        </a-button>
      </template>
      <p>课程名称：&nbsp;&nbsp;<a-input style="width: 240px; display: inline-block" v-model="courseName"/></p>
      <p>开课教师：&nbsp;&nbsp;<a-input style="width: 240px; display: inline-block" v-model="teacherName"/></p>
      <p>开始时间：&nbsp;&nbsp;<a-date-picker v-decorator="['startTime', config]" @change="onTimeChange"/></p>
      <p>结束时间：&nbsp;&nbsp;<a-date-picker v-decorator="['endTime', config]" @change="onTimeChange"/></p>
      <p style="display: inline-block">课程描述：&nbsp;&nbsp;</p>
      <p><a-textarea :rows="4" style="resize:none" v-model="description"/></p>
    </a-modal>
  </div>
</template>
<script>
import { editcourse } from '@/api/course'
export default {
  props:
  {
    courseId:String,
  },

  data() {
    return {
      edit_visible: false,
      courseName: '',
      startTime: new Date().toLocaleString,
      endTime: new Date().toLocaleString,
      description: '',
      teacherName: '',
      config: {
        rules: [{ type: 'object', required: true, message: 'Please select time!' }]
      }
    }
  },
  methods: {
    inflate_edit_menu() {
      this.edit_visible = true
    },
    handleOk() {
      const self = this
      console.log(self.courseId)
      console.log(self.courseName)
      console.log(self.teacherName)
      console.log(self.startTime)
      console.log(self.endTime)
      console.log(self.description)
      editcourse({
          params: {
            courseCode: self.courseId,
            courseName: self.courseName,
            startTime: self.startTime,
            endTime: self.endTime,
            description: self.description
          }
        }).then(response => {
          console.log(`edit successfully`)
          console.log(response)
          self.data = response.course    //对应后端返回的数据
        }).catch((fail) => {
          alert('课程id不存在？endtime<starttime？')
          console.log(fail)
        })
      this.edit_visible = false
    },
    handleCancel(e)
    {
      console.log(e)
      this.edit_visible=false
    },
    onTimeChange(date, dateString) {
      console.log(date, dateString)
    }
  }
}
</script>