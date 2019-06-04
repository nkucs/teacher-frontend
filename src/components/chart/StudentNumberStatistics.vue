<template>
  <div>
    <a-card>
      <div style="width: 90%">
        <ve-bar :data="chartData">
        </ve-bar>
      </div>
    </a-card>
  </div>  
</template>

<script>
import { studentnumberstatistics } from '@/api/distribution'

  export default {
    props: {
      courseIds: {
        type: Array,
        default: function () {
          return [1, 2, 3, 4, 5]
        }
      }
    },
    data () {
      return {
        chartData: {
          columns: ['课程', '选课人数'],
          rows: [
            { 课程: 'C++程序设计', 选课人数: 1393 },
            { 课程: '数据结构', 选课人数: 3530 },
            { 课程: 'Python', 选课人数: 2923 },
            { 课程: '算法导论', 选课人数: 1723 },
            { 课程: '数据库系统设计', 选课人数: 3792 }
          ]
        }
      }
    },
    created: function () {
      this.sendRequest()
    },
    methods: {
      sendRequest: function() {
      var that = this
      studentnumberstatistics({
        course_ids: that.courseIds
      }).then(function(res) {
        that.chartData.rows = res.ans
      }).catch(function(res) {
        console.log(res)
      })
    },
    }

    
  }
</script>
