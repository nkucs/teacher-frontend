<template>
  <a-tabs defaultActiveKey="1">
    <a-tab-pane key="1">
      <span slot="tab">
        <a-icon type="bars" />
        选择题目
      </span>
      <a-table
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        :columns="columns"
        :dataSource="data"
      >
      </a-table>
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
      <newProblem @getProblemId="getProblemId"></newProblem>
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
import { getAllProblems } from '@/api/problem'
const columns = [
  {
    title: 'id',
    dataIndex: 'problem_id'
  },
  {
    title: '题目名称',
    dataIndex: 'problem_name'
  },
    {
    title: '创建时间',
    dataIndex: 'created_time'
  }
]

export default {
  name: 'ChooseProblem',
  components: {
    newProblem
  },
  data () {
    return {
      problemIds: [],
      lectureId: '',
      problem_ids: [],
      data: [],
      columns,
      selectedRowKeys: []
    }
  },
  mounted () {
      this.lectureId = this.$route.query.lectureId
      this.loadProblems()
      console.log('receive lectureId:', this.lectureId)
  },
  methods: {
    getProblemId(id) {
      this.problemIds.push({
        problem_id: id
      })
    },
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
      for (let i = 0; i < selectedRowKeys.length; i++) {
        const index = selectedRowKeys[i]
        console.log('data index:', this.data[index])
        const problem_id = this.data[index].problem_id
        this.problemIds.push({
          problem_id: problem_id
        })        
      }
    },
    loadProblems() {
      getAllProblems({
        page: 1
      }).then(response => {
        console.log('下面是resonse:', response)
        const resData = response.data.problems
        for (var i = 0; i < resData.length; i++) {
          this.data.push({
            problem_id: resData[i].id,
            problem_name: resData[i].name,
            created_time: resData[i].created_at
          })
        }
      }).catch(error => {
        console.log(error)
      })
    },
    addProblem () {
      const problemIds = this.problemIds
      const problemParams = {'lecture_id': this.lectureId, 'problem_ids': problemIds}
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
