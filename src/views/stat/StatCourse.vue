<template>
  <div class='hello' style='background-color: #ececec; padding: 20px;'>
    <div v-for="baseIndex in Math.ceil(courseNum/3)" :key="baseIndex">
      <a-row :gutter="16" >
        <a-col :span="8" v-for='subIndex in (baseIndex*3)' v-if='subIndex>baseIndex*3-3 && subIndex<=courseNum' :key='subIndex'>
          <a-card @click='seeDetail(subIndex-1)' :title='courseInfo[subIndex-1].name' hoverable :bordered=false>
            <a :href='"/stat/detail?id="+ subIndex ' slot='extra'>统计详情</a>
            <p>开课时间：{{ courseInfo[subIndex-1].start_time }}</p>
            <!-- <p>选课人数：{{ courseInfo[subIndex-1].student_number }}</p> -->
            <p>简介：{{ courseInfo[subIndex-1].description }}</p>
          </a-card>
        </a-col>
      </a-row>
      <p></p>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line
import { mapActions, mapGetters } from 'vuex'
import { axios } from '@/utils/request'

export default {
  name: 'HelloWorld',
  data () {
    return {
      userID:'',
      name:'ssssss',
      courseNum:0,
      courseInfo:[],
      debug:true
    }
  },
  created: function(){
    this.getCourseInfo()
  },
  methods:{
    ...mapGetters(['id']),
    getCourseInfo:function(){
      const that = this
      axios({
        method: 'get',
        url: '/teacher/course/stat/get-now-course/',
        params: {
          teacherId: that.id()
        }
      }).then(response => {
        // courseList:[course_id,name,start_time,end_time,description]
        if(response.courseList){   
          that.courseInfo = response.courseList
          that.courseNum = that.courseInfo.Length
          console.log(that.courseInfo)
          console.log(that.courseNum)       
        }
        else{
          if(that.debug){
            that.courseInfo=[
              {
                course_id:0,
                name:'算法导论',
                start_time:'2019年春季学期',
                // student_number:100,
                description:'描述'
              },
              {
                course_id:1,
                name:'算法导论1',
                start_time:'2019年春季学期',
                // student_number:100,
                description:'描述'
              },
              {
                course_id:2,
                name:'算法导论2',
                start_time:'2019年春季学期',
                // student_number:100,
                description:'描述'
              },
              {
                course_id:3,
                name:'算法导论3',
                start_time:'2019年春季学期',
                // student_number:100,
                description:'描述'
              }
            ]
            that.courseNum=4
          }
        }

      }).catch(error => {
        console.log(error)
      })
    },
    seeDetail:function(tempIndex){
      const that = this
      var course_id = that.courseInfo[tempIndex].course_id
      that.$router.push({
        name:'课程详情',
        query:{
          id:course_id
        }
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
