<template>
  <a-card :loading="loading" :bordered="false" title="词云显示" :style="{ marginTop: '24px' }">
    <div>
      <ve-wordcloud :data="chartData" :settings="chartSettings"></ve-wordcloud>
    </div>
  </a-card>
</template>

<script>
  // const image = new Image()
  export default {
    // created() {
    //   image.src = require('@/views/stat/logo.png')
    // },
    data () {
      this.chartSettings = {
        sizeMin: 30,
        sizeMax: 100,
        shape: 'diamond'
      }
      // this.chartExtend = {
      //   series: [{

      //     type: 'wordCloud',

      //     shape: image,
      //     // The shape of the "cloud" to draw. Can be any polar equation represented as a
      //     // callback function, or a keyword present. Available presents are circle (default),
      //     // cardioid (apple or heart shape curve, the most known polar equation), diamond (
      //     // alias of square), triangle-forward, triangle, (alias of triangle-upright, pentagon, and star.

      //     // shape: 'diamond',

      //     // A silhouette image which the white area will be excluded from drawing texts.
      //     // The shape option will continue to apply as the shape of the cloud to grow.

      //     // maskImage: function() {
            
      //     // },

      //     // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
      //     // Default to be put in the center and has 75% x 80% size.

          // left: 'center',
          // top: 'center',
          // right: null,
          // bottom: null,

      //     // Text size range which the value in data will be mapped to.
      //     // Default to have minimum 12px and maximum 60px size.

      //     sizeRange: [12, 60],

      //     // Text rotation range and step in degree. Text will be rotated randomly in range [-90, 90] by rotationStep 45

      //     rotationRange: [-90, 90],
      //     rotationStep: 45,

      //     // size of the grid in pixels for marking the availability of the canvas
      //     // the larger the grid size, the bigger the gap between words.

      //     gridSize: 8,

      //     // set to true to allow word being draw partly outside of the canvas.
      //     // Allow word bigger than the size of the canvas to be drawn
          // drawOutOfBound: true,

      //     // Global text style
      //     textStyle: {
      //         normal: {
      //             fontFamily: 'sans-serif',
      //             fontWeight: 'bold',
      //             // Color can be a callback function or a color string
      //             color: function () {
      //                 // Random color
      //                 return 'rgb(' + [
      //                     Math.round(Math.random() * 160),
      //                     Math.round(Math.random() * 160),
      //                     Math.round(Math.random() * 160)
      //                 ].join(',') + ')'
      //             }
      //         },
      //         emphasis: {
      //             shadowBlur: 10,
      //             shadowColor: '#333'
      //         }
      //     },

      //     // Data is an array. Each array item must have name and value property.
      //     data: [{
      //         name: 'Farrah Abraham',
      //         value: 366,
      //         // Style of single text
      //         textStyle: {
      //             normal: {},
      //             emphasis: {}
      //         }
      //     }]
      //   }]
      // }
      return {
        chartData: {
          columns: ['word', 'count'],
          rows: getRows()
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