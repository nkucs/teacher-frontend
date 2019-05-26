<template>
  <a-card>
    <ve-histogram :extend="Extend" width="80%"></ve-histogram>
  </a-card>
</template>

<script>
  export default {
    data () {
      return {
        Extend: {
          legend: {
            show: false
          },
          xAxis: {
              name: '运行时间/ms',
              type: 'category',
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
            barWidth: '20%',
            data: [1,2,3,4,5,6,7,8,7,6,5,4,3,2,1]
        }]
        }
      }
    }
  }
</script>