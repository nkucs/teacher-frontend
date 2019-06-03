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
import { getWordCloud } from '@/api/courseAnalysis'

export default {
  created() {
    let dict = {}
    getWordCloud('1').then((response) => {
      if (response[0].length != 0) {
        for (let i = 0; i < response[0].length; i++) {
          dict['word'] = response[0][i]['word']
          dict['count'] = response[0][i]['count']
          this.chartData.rows.push(dict)
        }
      }
      if (response[1].length != 0) {
        dict = {}
        for (let j = 0; j < response[1].length; j++) {
          dict['word'] = response[1][j]['word']
          dict['count'] = response[1][j]['count']
          this.chartData2.rows.push(dict)
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
        rows: [
          {
            word: 'visualMap',
            count: 22199
          },
          {
            word: 'continuous',
            count: 10288
          },
          {
            word: 'contoller',
            count: 620
          },
          {
            word: 'series',
            count: 274470
          },
          {
            word: 'gauge',
            count: 12311
          },
          {
            word: 'detail',
            count: 1206
          },
          {
            word: 'piecewise',
            count: 4885
          },
          {
            word: 'textStyle',
            count: 32294
          },
          {
            word: 'markPoint',
            count: 18574
          },
          {
            word: 'pie',
            count: 38929
          },
          {
            word: 'roseType',
            count: 969
          },
          {
            word: 'label',
            count: 37517
          },
          {
            word: 'emphasis',
            count: 12053
          },
          {
            word: 'yAxis',
            count: 57299
          },
          {
            word: 'name',
            count: 15418
          },
          {
            word: 'type',
            count: 22905
          },
          {
            word: 'gridIndex',
            count: 5146
          },
          {
            word: 'normal',
            count: 49487
          },
          {
            word: 'itemStyle',
            count: 33837
          },
          {
            word: 'min',
            count: 4500
          },
          {
            word: 'silent',
            count: 5744
          },
          {
            word: 'animation',
            count: 4840
          },
          {
            word: 'offsetCenter',
            count: 232
          },
          {
            word: 'inverse',
            count: 3706
          },
          {
            word: 'borderColor',
            count: 4812
          },
          {
            word: 'markLine',
            count: 16578
          },
          {
            word: 'line',
            count: 76970
          },
          {
            word: 'radiusAxis',
            count: 6704
          },
          {
            word: 'radar',
            count: 15964
          },
          {
            word: 'data',
            count: 60679
          },
          {
            word: 'dataZoom',
            count: 24347
          },
          {
            word: 'tooltip',
            count: 43420
          },
          {
            word: 'toolbox',
            count: 25222
          },
          {
            word: 'geo',
            count: 16904
          },
          {
            word: 'parallelAxis',
            count: 4029
          }
        ]
      },
      chartData2: {
        columns: ['word', 'count'],
        rows: [
          {
            word: 'visualMap',
            count: 22199
          },
          {
            word: 'continuous',
            count: 10288
          },
          {
            word: 'contoller',
            count: 620
          },
          {
            word: 'series',
            count: 274470
          },
          {
            word: 'gauge',
            count: 12311
          },
          {
            word: 'detail',
            count: 1206
          },
          {
            word: 'piecewise',
            count: 4885
          },
          {
            word: 'textStyle',
            count: 32294
          },
          {
            word: 'markPoint',
            count: 18574
          },
          {
            word: 'pie',
            count: 38929
          },
          {
            word: 'roseType',
            count: 969
          },
          {
            word: 'label',
            count: 37517
          },
          {
            word: 'emphasis',
            count: 12053
          },
          {
            word: 'yAxis',
            count: 57299
          },
          {
            word: 'name',
            count: 15418
          },
          {
            word: 'type',
            count: 22905
          },
          {
            word: 'gridIndex',
            count: 5146
          },
          {
            word: 'normal',
            count: 49487
          },
          {
            word: 'itemStyle',
            count: 33837
          },
          {
            word: 'min',
            count: 4500
          },
          {
            word: 'silent',
            count: 5744
          },
          {
            word: 'animation',
            count: 4840
          },
          {
            word: 'offsetCenter',
            count: 232
          },
          {
            word: 'inverse',
            count: 3706
          },
          {
            word: 'borderColor',
            count: 4812
          },
          {
            word: 'markLine',
            count: 16578
          },
          {
            word: 'line',
            count: 76970
          },
          {
            word: 'radiusAxis',
            count: 6704
          },
          {
            word: 'radar',
            count: 15964
          },
          {
            word: 'data',
            count: 60679
          },
          {
            word: 'dataZoom',
            count: 24347
          },
          {
            word: 'tooltip',
            count: 43420
          },
          {
            word: 'toolbox',
            count: 25222
          },
          {
            word: 'geo',
            count: 16904
          },
          {
            word: 'parallelAxis',
            count: 4029
          }
        ]
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
