<template>
  <a-card :loading="loading" :bordered="false" title="题目词云">
    <a-row :gutter="12">
      <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card :loading="loading" :bordered="false">
          <ve-wordcloud :data="chartData" :settings="chartSettings"></ve-wordcloud>
          <div class="stext">AC题目标签</div>
        </a-card>
      </a-col>
      <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card :loading="loading" :bordered="false">
          <ve-wordcloud :data="chartData2" :settings="chartSettings"></ve-wordcloud>
          <div class="stext">非AC题目标签</div>
        </a-card>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import { wordcloud } from '@/api/courseAnalysis'

export default {
  created() {
    let dict = {}
    wordcloud().then((response) => {
      if (response[0].length != 0) {
        for (let i = 0; i < response.length; i++) {
          dict['word'] = response[0][i]['word']
          dict['count'] = response[0][i]['count']
          this.chartData.rows.push(dict)
        }
      }
      if (response[1].length != 0) {
        dict = {}
        for (let j = 0; j < response.length; j++) {
          dict['word'] = response[1][j]['word']
          dict['count'] = response[1][j]['count']
          this.chartData2.rows.push(dict)
          console.log(dict)
        }
      }
    })
  },

  data() {
    this.chartSettings = {
      sizeMin: 30,
      sizeMax: 100,
      shape: 'diamond'
    }

    this.chartExtend = {
      series: [
        {
          type: 'wordCloud'
        }
      ]
    }

    return {
      chartData: {
        columns: ['word', 'count'],
        rows: []
      },
      chartData2: {
        columns: ['word', 'count'],
        rows: []
      }
    }
  }
}
</script>

<style scoped>
.stext {
  text-align: center;
  font-family: '微软雅黑';
  font-size: large;
}
</style>
