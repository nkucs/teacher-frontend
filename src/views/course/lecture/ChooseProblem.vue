<template>
  <a-tabs defaultActiveKey="1">
    <a-tab-pane key="1">
      <span slot="tab">
        <a-icon type="bars" />
        选择题目
      </span>
      <problemList></problemList>
      <a-button
        :style="{ marginTop: '8px' }"
        type="primary"
        @click="addProblem"
      >
        完成创建
      </a-button>
    </a-tab-pane>
    <a-tab-pane key="2">
      <span slot="tab">
        <a-icon type="form" />
        新建题目
      </span>
      <newProblem></newProblem>
      <a-button
        :style="{ marginTop: '8px' }"
        type="primary"
        @click="addProblem"
      >
        完成创建
      </a-button>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import { addProblem } from '@/api/lecture'
import newProblem from '@/views/problem/ProblemDetail'
import problemList from '@/views/problem/ProblemList'

export default {
  name: 'ChooseProblem',
  components: {
      newProblem,
      problemList
  },
  data () {
    return {
      lectureId: 1,
      problemIds: [{
        'problem_id' : 1
      }, {
        'problem_id' : 3
      }]
    }
  },
  mounted () {
      this.lectureId = this.$route.query.lectureId
  },
  methods: {
    addProblem () {
      const problemIds = this.problemIds
      const problemParams = {'lecture_id': this.lectureId, problemIds}
      console.log(problemParams)

      addProblem(problemParams)
       .then(function (res) {
          console.log(res)
        })
        .catch(function (err) {
            console.log(err)
        })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
