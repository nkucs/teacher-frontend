<template>
  <div>    
    <a-card :loading="loading" :bordered="false" title="提交次数统计">
      <a-menu
        v-model="current"
        mode="horizontal">
        <a-menu-item key="day">
          <a-icon type="calendar" />日
        </a-menu-item>
        <a-menu-item key="week">
          <a-icon type="calendar" />周
        </a-menu-item>
        <a-menu-item key="month">
          <a-icon type="calendar" />月
        </a-menu-item>
        <a-menu-item key="year">
          <a-icon type="calendar" />年
        </a-menu-item>
      </a-menu>
      <div>
        <ve-line :data="LineChartData"></ve-line>
      </div>
    </a-card>

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
            <ve-wordcloud :data="chartData" :settings="chartSettings"></ve-wordcloud>
            <div class="stext">非AC题目标签</div>
          </a-card>
        </a-col>
      </a-row>
    </a-card>

    <a-card :loading="loading" :bordered="false" title="测例标签">
      <a-row :gutter="12">
        <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card :loading="loading" :bordered="false">
            <ve-bar :data="testCaseData" :settings="passTestCaseSettings"></ve-bar>
            <div class="stext">通过测例标签</div>
          </a-card>
        </a-col>
        <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card :loading="loading" :bordered="false">
            <ve-bar :data="testCaseData" :settings="notPassTestCaseSettings"></ve-bar>
            <div class="stext">未通过测例标签</div>
          </a-card>
        </a-col>
      </a-row>
    </a-card>
    
  </div>
</template>

<script>
  export default {
    created() {
    },
    data () {
      this.passTestCaseSettings = {
        metrics: ['通过数'],
        dataOrder: {
          label: '通过数',
          order: 'desc'
        }
        
      }
      this.notPassTestCaseSettings = {
        metrics: ['未通过数'],
        dataOrder: {
          label: '未通过数',
          order: 'desc'
        }
      }

      this.chartSettings = {
        sizeMin: 30,
        sizeMax: 100,
        shape: 'diamond'
      }
      this.chartExtend = {
        series: [{
          type: 'wordCloud'
        }]
      }

      return {
        chartData: {
          columns: ['word', 'count'],
          rows: getRows()
        },

        LineChartData: {
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
            { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
            { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
          ]
        },

        testCaseData: {
          columns: ['标签', '通过数', '未通过数'],
          rows: [
            { '标签': '测试一类', '通过数': '1000','未通过数': '700' },
            { '标签': '测试二类', '通过数': '500', '未通过数': '100' },
            { '标签': '测试三类', '通过数': '300', '未通过数': '1500' },
            { '标签': '测试四类', '通过数': '500', '未通过数': '1000' },
            { '标签': '测试五类', '通过数': '150', '未通过数': '100' },
            { '标签': '测试六类', '通过数': '800', '未通过数': '500' }
          ]
        }
      }
    }
  }

  function getRows () {
    return [{
      'word': 'visualMap',
      'count': 22199
    }, {
      'word': 'continuous',
      'count': 10288
    }, {
      'word': 'contoller',
      'count': 620
    }, {
      'word': 'series',
      'count': 274470
    }, {
      'word': 'gauge',
      'count': 12311
    }, {
      'word': 'detail',
      'count': 1206
    }, {
      'word': 'piecewise',
      'count': 4885
    }, {
      'word': 'textStyle',
      'count': 32294
    }, {
      'word': 'markPoint',
      'count': 18574
    }, {
      'word': 'pie',
      'count': 38929
    }, {
      'word': 'roseType',
      'count': 969
    }, {
      'word': 'label',
      'count': 37517
    }, {
      'word': 'emphasis',
      'count': 12053
    }, {
      'word': 'yAxis',
      'count': 57299
    }, {
      'word': 'name',
      'count': 15418
    }, {
      'word': 'type',
      'count': 22905
    }, {
      'word': 'gridIndex',
      'count': 5146
    }, {
      'word': 'normal',
      'count': 49487
    }, {
      'word': 'itemStyle',
      'count': 33837
    }, {
      'word': 'min',
      'count': 4500
    }, {
      'word': 'silent',
      'count': 5744
    }, {
      'word': 'animation',
      'count': 4840
    }, {
      'word': 'offsetCenter',
      'count': 232
    }, {
      'word': 'inverse',
      'count': 3706
    }, {
      'word': 'borderColor',
      'count': 4812
    }, {
      'word': 'markLine',
      'count': 16578
    }, {
      'word': 'line',
      'count': 76970
    }, {
      'word': 'radiusAxis',
      'count': 6704
    }, {
      'word': 'radar',
      'count': 15964
    }, {
      'word': 'data',
      'count': 60679
    }, {
      'word': 'dataZoom',
      'count': 24347
    }, {
      'word': 'tooltip',
      'count': 43420
    }, {
      'word': 'toolbox',
      'count': 25222
    }, {
      'word': 'geo',
      'count': 16904
    }, {
      'word': 'parallelAxis',
      'count': 4029
    }]
  }
</script>

<style scoped>
.stext {
  text-align: center;
  font-family: '微软雅黑';
  font-size: large;
}
</style>
