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
            <div @click="() => downLoadFile(item.filename,item.fileurl)">{{ item.filename }}</div>
          </ul>
        </div>
      </div>
      <div class="detail">
        <div class="text">练习题</div>
        <div class="problem">
          <ul v-for="item in problems" :key="item">
            <div>{{ item.problemcode }}:{{ item.problemname }}</div>
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
import axios from 'axios'
export default {
  data() {
    return {
      url: '',
      lectureid: 1,
      lectureName: '第一课时：排序和查找',
      lectureDes: '这是一节非常重要的课，希望同学们呢认真掌握',
      problems: [
        {
          problemcode: '1',
          problemname: '排序'
        },
        {
          problemcode: '1',
          problemname: '排序'
        }
      ],
      files: [
        {
          filename: '第一个ppt'
        },
        {
          filename: '第一个ppt'
        }
      ]
    }
  },
  methods: {
    editpage() {},
    sure() {},
    downLoadFile(name, url) {
      axios({
        url: '/teacher/lecture/file',
        method: 'GET',
        responseType: 'blob' // important
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'file.pdf') //or any other extension
        document.body.appendChild(link)
        link.click()
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
        const problemslist = problem.data.problems
        this.problems = []
        for (let i = 0; i < problemslist.length; i++) {
          this.problems.push({
            problemcode: problemslist[i].probllem_id,
            problemname: problemslist[i].problem_name
          })
        }
        const filelist = file.data.files
        this.files = []
        for (let i = 0; i < filelist.length; i++) {
          this.problems.push({
            filename: filelist[i].filename
          })
        }
      })
    )
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
