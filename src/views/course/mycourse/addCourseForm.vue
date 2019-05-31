<template>
  <div>
    <a-button type="primary" @click="showModal">+ 新增课程</a-button>
    <a-modal
      title="新建课程"
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      :destroyOnClose="true"
    >
      <a-form :form="form">
        <a-form-item label="课程名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="[
              'name',
              {rules: [{ required: true, message: '请输入课程名称' }]}
            ]"
            placeholder="请输入课程名称"
          />
        </a-form-item>
        <a-form-item label="开始时间" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-date-picker v-decorator="['startTime', config]" @change="onBeginTimeChange"/>
        </a-form-item>
        <a-form-item label="结束时间" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-date-picker v-decorator="['endTime', config]" @change="onEndTimeChange"/>
        </a-form-item>
        <a-form-item label="课程描述" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-textarea
            v-decorator="[
              'description',
              {rules: [{ required: true, message: '请输入课程描述' }]}
            ]"
            placeholder="请输入课程描述"
            :rows="6"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { addcourse } from '@/api/course'
export default {
  data() {
    return {
      visible: false,
      confirmLoading: false,
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
      beginTime: new Date().toLocaleDateString(),
      endTime: new Date().toLocaleDateString(),
      config: {
        rules: [{ type: 'object', required: true, message: 'Please select time!' }]
      }
    }
  },
  methods: {
    showModal() {
      this.visible = true
    },
    handleOk(e) {
      // 提交数据
      this.confirmLoading = true
      e.preventDefault()
      this.form.validateFields((err, fieldsValue) => {
        if (err) {
          this.confirmLoading = false
          this.$message.warning('创建失败！')
          return
        }
        const values = {
          ...fieldsValue,
          'startTime': fieldsValue['startTime'].format('YYYY-MM-DD'),
          'endTime': fieldsValue['endTime'].format('YYYY-MM-DD')
        }
        console.log('Received values of form: ', values)
        // 数据提交成功
        const that = this
        addcourse(values).then(res => {
          that.visible = false
          that.confirmLoading = false
          that.$message.success('创建成功！')
          console.log('add-course-ok')
          console.log(res)
        })
      })
    },
    handleCancel() {
      console.log('Clicked cancel button')
      this.visible = false
    },
    onBeginTimeChange(date, dateString) {
      console.log(date, dateString)
    },
    onEndTimeChange(date, dateString) {
      console.log(date, dateString)
    }
  }
}
</script>
