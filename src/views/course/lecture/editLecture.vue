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
        <div>
          <div class="problem">
            <ul v-for="item in files" :key="item" style="padding:0;margin:0">
              <div>
                <div @click="() => downLoad(item.fileName)" style="display:inline;color:#1296db">
                  {{ item.fileName }}
                </div>
                <div style="display:inline;color:#1296db" @click="() => deleteFile(item.fileId)" type="text">删除</div>
              </div>

            </ul>
          </div>
        </div>

      </a-form-item>
      <a-form-item
        label="练习题"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
      >
        <div class="detail" style="margin-bottom:150px">
          <div class="problem">
            <ul v-for="item in problems" :key="item" style="padding:0;margin:0">
              <div>{{ item.problemId }}:{{ item.problemName }}
                <div style="display:inline;color:#1296db" @click="() => deleteProblem(item.problemId)" type="text">删除</div>
              </div>
            </ul>
          </div>
        </div>
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
import {getLecture} from '@/api/lecture'
import {delFile} from '@/api/lecture'
import {delProblem} from '@/api/lecture'
import {downLoadFile} from '@/api/lecture'
export default {
  name: 'CreateLecture',
  data () {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
      fileList: [{}],
      lectureId: 1,
      lectureName: '第一课时：排序和查找',
      lectureDes: '这是一节非常重要的课，希望同学们呢认真掌握',
      files: [
        {
          fileName: '第一个ppt',
          fileId:1
        },
        {
          fileName: '第一个ppt',
          fileId:1
        }
      ],
      problems: [
        {
          problemId: 1,
          problemName: '排序'
        },
        {
          problemId: 1,
          problemName: '排序'
        }
      ],
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

    deleteFile(id){
      const par = {lectureId:this.lectureId,fileName:id}
      console.log(this.files)
      for(let i =0;i<this.files.length;i++){
        if(this.files[i].fileId==id){
          this.files.splice(i,1)//i开始删一个
        }
      }
      console.log(this.files)
      delFile(par)
      .then(res =>{
        console.log(res)
      })
      .error(res =>{
        console.log(res)
      })
    },
    deleteProblem(id){
      const par = {lectureId:this.lectureId,problemId:id}
      console.log(this.problems)
      for(let i =0;i<this.problems.length;i++){
        if(this.problems[i].problemId==id){
          this.problems.splice(i,1)//i开始删一个
        }
      }
      console.log(this.problems)
      delProblem(par)
      .then(res =>{
        console.log(res)
      })
      .error(res =>{
        console.log(res)
      })
    },
    downLoad(name) {
      const par=JSON.stringify({'file_name':name})

      /*var a = {
        file_name: name
      }
      const par =(JSON.stringify(a, ['file_name'])) //"{"b":42,"c":"42"}"
*/
      downLoadFile(par)
      .then(response => {
        console.log(response.data)
        const url = window.URL.createObjectURL(new Blob([response]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', name) //or any other extension
        document.body.appendChild(link)
        link.click()
      })
      .error(response => {
        console.log(par)
        console.log(response)
      })
    }

  },


    created: function() {
      const par = {lecture_id:1}
      getLecture(par)
      .then(res =>{
        console.log(res)
        this.lectureName = res.data.name
        this.lectureDes = res.data.description
        const filelist = res.data.files
        this.files = []
        for (let i = 0; i < filelist.length; i++) {
          this.files.push({
            fileName: filelist[i].file,
            fileId:filelist[i].id
          })
        }
        const problemslist = res.data.problems
        this.problems = []
        for (let i = 0; i < problemslist.length; i++) {
          this.problems.push({
            problemId: problemslist[i].id,
            problemName: problemslist[i].name
          })
        }
      })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.detail {
}
.text {
  font-size: 15px
}
</style>
