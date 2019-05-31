<template>
  <div>
    <div class="head">
      <div>{{ lectureName }}</div>
    </div>
    <div class="body">
      <div class="detail">
        <div class="text">课程描述</div>
        <div class="des">{{ lectureDes }}</div>
      </div>
      <div class="detail">
        <div class="text">附件</div>
        <div class="problem">
          <ul v-for="item in files" :key="item">
            <div @click="() => downLoad(item.fileName)" style="color:#1296db">{{ item.fileName }}</div>
          </ul>
        </div>
      </div>
      <div class="detail">
        <div class="text">练习题</div>
        <div class="problem">
          <ul v-for="item in problems" :key="item">
            <div>{{ item.problemId }}:{{ item.problemName }}</div>
          </ul>
        </div>
      </div>
      <div class="select">
        <a-button class="btn" type="dashed" @click="editpage">编辑</a-button>
        <a-button class="btn" type="primary" @click="sure">确定</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import {getLecture} from '@/api/lecture'
import {downLoadFile} from '@/api/lecture'
export default {
  data() {
    return {
      url: '',
      lectureId: 1,
      lectureName: '第一课时：排序和查找',
      lectureDes: '这是一节非常重要的课，希望同学们呢认真掌握',
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
      files: [
        {
          fileName: '第一个ppt',
          fileId:1
        },
        {
          fileName: '第一个ppt',
          fileId:1
        }
      ]
    }
  },
  methods: {
    editpage() {},
    sure() {},



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
/*
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
  },*/

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

<style>
.head {
  font-size: 20px;
  font-weight: bold;
  margin: 50px;
}
.text {
  font-size: 17px;
  font-weight: bold;
}
.detail {
  margin: 50px;
}
.btn {
  margin-right: 20px;
}
.select {
  margin-left: 60%;
  margin-bottom: 10%;
}
.problem {
  margin-top: 10px;
}
.des {
  margin-top: 10px;
}
</style>
