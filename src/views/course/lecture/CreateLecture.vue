<template>
  <div>
    <a-form
      :form="form"
      @submit="handleCreateSubmit"
    >
      <a-form-item
        label="课时名称："
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-input
          v-decorator="[
            'name',
            {rules: [{ required: true, message: '请填写课时名称！' }]}
          ]"
          placeholder="输入名称..."
          maxlength="130"
        />
      </a-form-item>
      
      <a-form-item
        label="描述："
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-textarea 
          v-decorator="[
            'description',
            {rules: [{ required: true, message: '请填写课时描述！' }]}
          ]"
          placeholder="课程描述..."
          :rows="5"
        />
      </a-form-item>

      <a-form-item
        label="附件："
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-upload
          action="http://188.131.129.220/course/createlecture"
          :multiple="true"
          :fileList="fileList"
          @change="fileChange"
        >
          <a-button>
            <a-icon type="upload" /> Upload
          </a-button>
        </a-upload>
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
              :style="{ marginRight: '8px' }"
              html-type="submit"
            >
              完成创建
            </a-button>
            <a-button
              type="primary"
              @click="chooseProblem"
            >
              继续选题
            </a-button>
          </a-col>
        </a-row>
      </a-form-item>
    </a-form>
  </div> 
</template>

<script>
import { createLecture } from '@/api/lecture'

export default {
  name: 'CreateLecture',
  data () {
    return {
      courseId: '',
      lectureData: [],
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
      fileList: [{}]
    }
  },
  mounted () {
      this.courseId = this.$route.query.courseID
  },
  methods: {
    handleCreateSubmit (e) {
      const that = this
      const courseId = this.courseId

      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          const lectureParams = { ...values,'course_id':courseId }

          createLecture(lectureParams)
            .then(function (res) {
              console.log(res)
              that.lectureData = res.data
              that.$router.push({ path: '/course/details', query:{courseID: courseId}})
              that.$message.success('创建课时成功')
            })
            .catch(function (err) {
              console.log(err)
              that.$message.error('创建课时失败')
            })
        }
      })
    },
    handleReset () {
      this.form.resetFields()
    },
    fileChange(info) {
      let fileList = info.fileList

      // 1. Limit the number of uploaded files
      //    Only to show two recent uploaded files, and old ones will be replaced by the new
      //fileList = fileList.slice(-2)
      this.fileList = fileList
      console.log(this.fileList)
      // 2. read from response and show file link
      fileList = fileList.map((file) => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.url
        }
        return file
      })

      // 3. filter successfully uploaded files according to response from server
      fileList = fileList.filter((file) => {
        if (file.response) {
          return file.response.status === 'success'
        }
        return false
      })

      //this.fileList = fileList

    },
    chooseProblem (e) {
      const that = this
      const courseId = this.courseId

      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          const lectureParams = { ...values,'course_id':courseId }

          createLecture(lectureParams)
            .then(function (res) {
              console.log(res)
              that.lectureData = res.data
              console.log('new problem')
              that.$router.push({
                path:'/course/details/chooseproblem',
                query:{
                  lectureId: that.lectureData['lecture_id']
                }
              })              
            })
            .catch(function (err) {
              console.log(err)
            })
        }
      })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
