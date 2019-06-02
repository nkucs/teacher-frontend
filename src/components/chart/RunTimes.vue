<template>
  <a-card :bordered="false" title="执行用时分布图表" :style="{ marginTop: '24px' }">
    <ve-histogram :data="charData" :extend="Extend"></ve-histogram>
  </a-card>
</template>

<script>
  import { runtimes } from '@/api/distribution'
  export default {
    props: {
      problemId:{
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        problem_id: 0,
        charData: {
          columns: ['时间', '占比'],
          rows: []
        },
        Extend: {
          legend: {
            show: false
          },
          xAxis: {
              name: '运行时间/ms',
          }
        }
      }
    },
    created() {
      var interval = 3
      var data = [0.02, 0.04, 0.06, 0.08, 0.1, 0.2, 0.3, 0.4, 0.2, 0.1]
      for(var i=0; i < data.length; i++)
      {
        var temp = {}
        temp['时间'] = i*interval + '-' + (i+1)*interval
        temp['占比'] = data[i]
        this.charData['rows'].push(temp)
      }
      this.sendRequest()
    },
    methods: {
      sendRequest: function() {
      var that = this
      runtimes({
        problem_id: that.problemId
      }).then(function(res) {
        console.log(res)
      }).catch(function(res) {
        console.log(res)
      })
    },
    }
  }
</script>