<template>
  <div>
    <a-card>
      <div style="width: 90%">
        <ve-bar :data="chartData"></ve-bar>
      </div>
    </a-card>
  </div>  
</template>

<script>
  export default {
    data () {
      return {
        chartData: {
          columns: ['年份', '人数'],
          rows: [
            { 年份: '2015', 人数: 1393 },
            { 年份: '2016', 人数: 3530 },
            { 年份: '2017', 人数: 2923 },
            { 年份: '2018', 人数: 1723 },
            { 年份: '2019', 人数: 3792 }
          ]
        }
      }
    }
  }
</script>