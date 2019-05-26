<template>
  <ve-histogram :extend="Extend" width="80%"></ve-histogram>
</template>

<script>
  import { axios } from '@/utils/request';
  var data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321];
  export default {
    data () {
      return {
        Extend: {
          legend: {
            show: false
          },
          xAxis: {
              name: "运行时间/ms",
              type: "category",
              axisTick: {
                alignWithLabel: true
              },
              data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
          },
          series: [{
            name: '运行时间',
            type: 'bar',
            showSymbol: false,
            hoverAnimation: false,
            barWidth: "20%",
            data: [1,2,3,4,5,6,7,8,7,6,5,4,3,2,1]
        }]
        }
      }
    },
    created () {
      pass
    }
  }
</script>