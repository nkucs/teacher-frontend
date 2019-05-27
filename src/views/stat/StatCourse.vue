<template>
  <div class='hello' style='background-color: #ececec; padding: 20px;'>
    <div v-for="baseIndex in Math.ceil(courseNum/3)" :key="baseIndex">
      <a-row :gutter="16" >
        <a-col :span="8" v-for='subIndex in (baseIndex*3)' v-if='subIndex>baseIndex*3-3 && subIndex<=courseNum' :key='subIndex'>
          <a-card :title='courseInfo[subIndex-1].name' hoverable :bordered=false>
            <a :href='"/stat/detail?id="+ subIndex ' slot='extra'>统计详情</a>
            <p>开课时间：{{ courseInfo[subIndex-1].open_time }}</p>
            <p>选课人数：{{ courseInfo[subIndex-1].student_number }}</p>
            <p>简介：{{ courseInfo[subIndex-1].description }}</p>
          </a-card>
        </a-col>
      </a-row>
      <p></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      userID:'',
      name:'ssssss',
      courseNum:5,
      courseInfo:[
        {
          name:'算法导论',
          open_time:'2019年春季学期',
          student_number:100,
          description:'描述'
        },
        {
          name:'算法导论1',
          open_time:'2019年春季学期',
          student_number:100,
          description:'描述'
        },
        {
          name:'算法导论2',
          open_time:'2019年春季学期',
          student_number:100,
          description:'描述'
        },
        {
          name:'算法导论3',
          open_time:'2019年春季学期',
          student_number:100,
          description:'描述'
        },
        {
          name:'算法导论4',
          open_time:'2019年春季学期',
          student_number:100,
          description:'描述'
        }
      ]
    }
  },
  created: function(){
    //getCourseInfo()
  },
  methods:{
    getCourseInfo:function(){
      const that = this
      that.$axios({
        method: 'get',
        url: '/lecture/AllLectures/',
        data: {
          userID: localStorage.getItem('userID')
        }
      }).then(response => {
        that.courseInfo = response.data.courseInfo
        that.courseNum = that.courseInfo.Length
      }).catch(error => {
        console.log(error)
      })
    }
  }

}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
