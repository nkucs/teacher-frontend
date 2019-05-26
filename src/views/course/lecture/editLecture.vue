<template>
  <div>
    <a-form
      :form="form"
      @submit="handleSubmit"
    >
      <a-form-item
        label="课时名称："
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-input
          v-decorator="[
            'name',
            {initialValue:lectureName,
             rules: [{ required: true, message: '请填写课时名称！' }]}
          ]"
          defaultValue="mysite"
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
            {initialValue:lectureDes,
             rules: [{ required: true, message: '请填写课时描述！' }]}
          ]"
          :rows="5"
        />
      </a-form-item>

      <a-form-item
        label="附件："
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-upload
          action="/"
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
import axios from 'axios'
export default {
  name: 'CreateLecture',
  data () {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
      fileList: [{}],
      lectureid: 1,
      lectureName: '第一课时：排序和查找',
      lectureDes: '这是一节非常重要的课，希望同学们呢认真掌握',
    }
  
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          const lectureParams = { ...values }
          createLecture(lectureParams)
            .then(function (res) {
              console.log(res)
            })
            .catch(function (err) {
              console.log(err)
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
      fileList = fileList.slice(-2)

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

      this.fileList = fileList
    },
    chooseProblem (e) {
      this.handleSubmit(e)
      console.log('new problem')
      this.$router.push({
        path:'/problem/list',
        params:{
          lectureId:'ssss'
        }
      })
    },

    getCourse() {
      return axios.get('/teacher/lecture/get-lecture', {
        params: {
          lecture_id: this.lectureid
        }
      })
    },

    getCoureProblems() {
      return axios.get('/teacher/lecture/get-problems', {
        params: {
          lecture_id: this.lectureid
        }
      })
    },

    getCourseFile() {
      return axios.get('/teacher/lecture/get-files', {
        params: {
          lecture_id: this.lectureid
        }
      })
    }
  },

  created: function() {
    axios.all([getCourse(), getCourseProblems(), getCoureseFile()]).then(
      axios.spread(function(course, problem, file) {
        this.lectureName = course.data.name
        this.lectureDes = course.data.desctiption
        const filelist = file.data.files
        for (let i = 0; i < filelist.length; i++) {
          this.filelist.push({
            filename: filelist[i].filename
          })
        }
      })
    )
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
