<template>
  <a-form
    :form="form"
    @submit="handleSubmit"
  >
    <a-form-item
      label="课程名称："
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
    >
      <a-input
        v-decorator="[
          'courseName',
          {rules: [{ required: true, message: '请填写课程名称！' }]}
        ]"
        placeholder="输入名称..."
      />
    </a-form-item>
    
    <a-form-item
      label="描述："
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
    >
      <a-textarea 
        v-decorator="[
          'courseDetail',
          {rules: [{ required: true, message: '请填写课程描述！' }]}
        ]"
        placeholder="课程描述..."
        :rows="5"
      />
    </a-form-item>

    <a-form-item
      :wrapper-col="{ span: 12, offset: 5 }"
    >
      <a-row>
        <a-col
          :span="24"
          :style="{ textAlign: 'right' }"
        >
          <a-button
            :style="{ marginRight: '8px' }"
            @click="handleReset"
          >
            重填
          </a-button>
          <a-button
            type="primary"
            html-type="submit"
          >
            确认
          </a-button>
        </a-col>
      </a-row>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  name: 'CreateCourse',
  data () {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this)
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    handleReset () {
      this.form.resetFields()
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
