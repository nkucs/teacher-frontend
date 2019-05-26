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
              'courseTitle',
              {rules: [{ required: true, message: '请输入课程名称' }]}
            ]"
            placeholder="请输入课程名称"
          />
        </a-form-item>
        <a-form-item label="课程教师" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="[
              'teacher',
              {rules: [{ required: true, message: '请输入教师姓名' }]}
            ]"
            :placeholder="currentTeacher"
          />
        </a-form-item>
        <a-form-item label="开始时间" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-date-picker v-decorator="['date-picker-1', config]" @change="onBeginTimeChange"/>
        </a-form-item>
        <a-form-item label="结束时间" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-date-picker v-decorator="['date-picker-2', config]" @change="onEndTimeChange"/>
        </a-form-item>
        <a-form-item label="课程描述" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-textarea
            v-decorator="[
              'courseDescription',
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
export default {
  data() {
    return {
        currentTeacher: '刘明铭',
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
          'date-picker-1': fieldsValue['date-picker-1'].format('YYYY-MM-DD'),
          'date-picker-2': fieldsValue['date-picker-1'].format('YYYY-MM-DD')
        }
        console.log('Received values of form: ', values)
        // 数据提交成功
        setTimeout(() => {
          this.visible = false
          this.confirmLoading = false
        }, 2000)
        this.$message.success('创建成功！')
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
