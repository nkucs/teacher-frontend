<template>
  <a-card :bordered="false" title="题目词云">
    <a-row :gutter="12">
      <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card :bordered="false">
          <ve-wordcloud :data="chartData" :settings="chartSettings"></ve-wordcloud>
          <div class="stext">AC题目标签</div>
        </a-card>
      </a-col>
      <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card :bordered="false">
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
    let courses = 1
    if (this.$route.query.course_id)
      courses = this.$route.query.course_id
    getWordCloud(courses).then((response) => {
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
          // {
          //   word: '队列',
          //   count: 22199
          // },
          // {
          //   word: '动态规划',
          //   count: 10288
          // },
          // {
          //   word: '贪心算法',
          //   count: 620
          // },
          // {
          //   word: '最小生成树',
          //   count: 274470
          // },
          // {
          //   word: '哈夫曼树',
          //   count: 12311
          // },
          // {
          //   word: '栈',
          //   count: 1206
          // },
          // {
          //   word: '最短路径',
          //   count: 4885
          // },
          // {
          //   word: '快速排序',
          //   count: 32294
          // },
          // {
          //   word: '插入排序',
          //   count: 18574
          // },
          // {
          //   word: '多项式求解',
          //   count: 38929
          // },
          // {
          //   word: '质数筛法',
          //   count: 969
          // },
          // {
          //   word: '分解质因数',
          //   count: 37517
          // },
          // {
          //   word: '连通图',
          //   count: 12053
          // },
          // {
          //   word: 'STL使用',
          //   count: 57299
          // },
          // {
          //   word: '时间问题',
          //   count: 15418
          // },
          // {
          //   word: '全排列',
          //   count: 22905
          // },
          // {
          //   word: '背包',
          //   count: 5146
          // },
          // {
          //   word: '红黑树',
          //   count: 49487
          // },
          // {
          //   word: 'itemStyle',
          //   count: 33837
          // },
          // {
          //   word: 'min',
          //   count: 4500
          // },
          // {
          //   word: 'silent',
          //   count: 5744
          // },
          // {
          //   word: 'animation',
          //   count: 4840
          // },
          // {
          //   word: 'offsetCenter',
          //   count: 232
          // },
          // {
          //   word: 'inverse',
          //   count: 3706
          // },
          // {
          //   word: 'borderColor',
          //   count: 4812
          // },
          // {
          //   word: 'markLine',
          //   count: 16578
          // },
          // {
          //   word: 'line',
          //   count: 76970
          // },
          // {
          //   word: 'radiusAxis',
          //   count: 6704
          // },
          // {
          //   word: 'radar',
          //   count: 15964
          // },
          // {
          //   word: 'data',
          //   count: 60679
          // },
          // {
          //   word: 'dataZoom',
          //   count: 24347
          // },
          // {
          //   word: 'tooltip',
          //   count: 43420
          // },
          // {
          //   word: 'toolbox',
          //   count: 25222
          // },
          // {
          //   word: 'geo',
          //   count: 16904
          // },
          // {
          //   word: 'parallelAxis',
          //   count: 4029
          // }
        ]
      },
      chartData2: {
        columns: ['word', 'count'],
        rows: [
          // {
          //   word: '归并排序',
          //   count: 22199
          // },
          // {
          //   word: '数组整理',
          //   count: 10288
          // },
          // {
          //   word: '并行计算',
          //   count: 620
          // },
          // {
          //   word: '日期求解',
          //   count: 274470
          // },
          // {
          //   word: '最小堆',
          //   count: 12311
          // },
          // {
          //   word: '杨辉三角',
          //   count: 1206
          // },
          // {
          //   word: '链表',
          //   count: 4885
          // },
          // {
          //   word: '指针',
          //   count: 32294
          // },
          // {
          //   word: '引用',
          //   count: 18574
          // },
          // {
          //   word: '结构体',
          //   count: 38929
          // },
          // {
          //   word: '函数参数传递',
          //   count: 969
          // },
          // {
          //   word: '空间复杂度',
          //   count: 37517
          // },
          // {
          //   word: 'emphasis',
          //   count: 12053
          // },
          // {
          //   word: 'yAxis',
          //   count: 57299
          // },
          // {
          //   word: '人数统计',
          //   count: 15418
          // },
          // {
          //   word: 'type',
          //   count: 22905
          // },
          // {
          //   word: 'gridIndex',
          //   count: 5146
          // },
          // {
          //   word: 'normal',
          //   count: 49487
          // },
          // {
          //   word: 'itemStyle',
          //   count: 33837
          // },
          // {
          //   word: 'min',
          //   count: 4500
          // },
          // {
          //   word: 'silent',
          //   count: 5744
          // },
          // {
          //   word: 'animation',
          //   count: 4840
          // },
          // {
          //   word: 'offsetCenter',
          //   count: 232
          // },
          // {
          //   word: 'inverse',
          //   count: 3706
          // },
          // {
          //   word: 'borderColor',
          //   count: 4812
          // },
          // {
          //   word: 'markLine',
          //   count: 16578
          // },
          // {
          //   word: 'line',
          //   count: 76970
          // },
          // {
          //   word: 'radiusAxis',
          //   count: 6704
          // },
          // {
          //   word: 'radar',
          //   count: 15964
          // },
          // {
          //   word: 'data',
          //   count: 60679
          // },
          // {
          //   word: 'dataZoom',
          //   count: 24347
          // },
          // {
          //   word: 'tooltip',
          //   count: 43420
          // },
          // {
          //   word: 'toolbox',
          //   count: 25222
          // },
          // {
          //   word: 'geo',
          //   count: 16904
          // },
          // {
          //   word: 'parallelAxis',
          //   count: 4029
          // }
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
