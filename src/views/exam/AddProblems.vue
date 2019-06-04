<template>
  <div>
    <div class="exam">
      <div class="exam-problems">
        <div style="display:flex; justify-content:space-between;">
          <h3>题目列表</h3>
          <a-button type="primary" icon="check" @click="finish">完成添加</a-button>
        </div>
        <a-divider type="horizontal"/>
        <a-table :dataSource="examProblems" :columns="examColumns" :pagination="(false)" bordered>
          <template slot="name" slot-scope="text">
            <a href="javascript:;">{{ text }}</a>
          </template>
          <template slot="operation" slot-scope="text, record">
            <a-popconfirm
              v-if="examProblems.length"
              title="确定删除此题？"
              @confirm="() => remove(record.key)"
            >
              <a href="javascript:;">删除</a>
            </a-popconfirm>
            <a-divider type="vertical"/>
            <a href="javascript:;" @click="showDetail(record.id)">详情</a>
          </template>
        </a-table>
      </div>
      <div class="problems-info">
        <h3>提交统计</h3>
        <div v-if="examProblems.length !== 0">
          <a-divider type="horizontal"/>
          <ve-ring :judge-width="true" :settings="chartSettings" :data="chartData"></ve-ring>
          <div class="rate">
            <h3>通过率： {{ averageAcRatio }} %</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="all-problems">
      <h3>题库列表</h3>
      <a-divider type="horizontal"/>
      <div class="function">
        <a-input-search placeholder="输入id或名称搜索相关题目" style="width: 600px;" @search="onSearch"/>
        <a-button style="margin-left:100px;" type="primary" icon="plus" @click="newProblem">新建题目</a-button>
      </div>
      <a-table :dataSource="allProblems" :columns="allColumns" bordered>
        <template slot="name" slot-scope="text">
          <a href="javascript:;">{{ text }}</a>
        </template>
        <template slot="operation" slot-scope="text, record">
          <a href="javascript:;" @click="addToExam(record.key)">添加</a>
          <a-divider type="vertical"/>
          <a href="javascript:;" @click="showDetail(record.id)">详情</a>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import { getAllProblems } from '@/api/problem'
// import { getallcourse } from '@api/course'

const examColumns = [
  {
    title: 'id',
    dataIndex: 'id'
  },
  {
    title: '名称',
    dataIndex: 'name'
  },
  {
    title: 'ac次数',
    dataIndex: 'accepted_count'
  },
  {
    title: '提交次数',
    dataIndex: 'submit_count'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' }
  }
]

const allColumns = [
  {
    title: 'id',
    dataIndex: 'id'
  },
  {
    title: '名称',
    dataIndex: 'name'
  },
  {
    title: 'ac次数',
    dataIndex: 'accepted_count'
  },
  {
    title: '提交次数',
    dataIndex: 'submit_count'
  },
  {
    title: 'ac率',
    dataIndex: 'accepted_ratio'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' }
  }
]

var chartData = {
  columns: ['item', 'number'],
  rows: [
    { item: '全部AC', number: 0 },
    { item: '部分AC', number: 0 },
    { item: '0 AC', number: 0 }
  ]
}

export default {
  data() {
    return {
      examColumns,
      allColumns,
      examProblems: [],
      allProblems: [],
      chartData,
      chartSettings: { radius: [60, 80] },
      averageAcRatio: 0
    }
  },

  mounted() {
    this.loadAllProblems()
  },

  methods: {
    loadAllProblems() {
      getAllProblems({
          page: 1
        }).then(response => {
          this.dataRender(response.data.problems)
        }).catch(error => {
          console.log(error)
        })
    },

    dataRender(data) {
      data.map(item => {
        this.allProblems.push({
          key: item.id,
          id: item.id,
          name: item.name,
          accepted_count: item.accepted_count,
          submit_count: item.submit_count,
          accepted_ratio: (item.accepted_count === 0) ? 
            0 : (item.accepted_count / item.submit_count * 100).toFixed(2) + '%'
        })
      })
    },

    finish() {
      this.$router.push({
        name: '考试详情',
        params: {
          examProblems: this.examProblems
        }
      })
    },

    remove(key) {
      const examProblems = [...this.examProblems]
      const problem = examProblems.filter(item => item.key === key)[0]
      const index = examProblems.indexOf(problem)
      this.examProblems.splice(index, 1)
      
      if (problem.accepted_ratio === 0) {
        this.chartData.rows[2]['number'] -= 1
      } else if (problem.accepted_ratio === '100%') {
        this.chartData.rows[0]['number'] -= 1
      } else {
        this.chartData.rows[1]['number'] -= 1
      }
      this.$message.success('删除成功', 1.5)

      let accepted_count = 0
      let submit_count = 0
      if (this.examProblems.length !== 0) {
        this.examProblems.map(item => {
          accepted_count += item.accepted_count
          submit_count += item.submit_count
        })
        this.averageAcRatio = (accepted_count / submit_count * 100).toFixed(2)
      } else {
        this.averageAcRatio = 0
      }
    },

    addToExam(key) {
      const examProblems = [...this.examProblems]
      const allProblems = [...this.allProblems]
      const problem = allProblems.filter(item => item.key === key)[0]
      const allId = examProblems.map(item => { return item.id })

      if (allId.indexOf(problem.id) === -1) {
        this.examProblems.push(problem)
        this.$message.success('成功添加至考试题目', 1.5)
        if (problem.accepted_ratio === 0) {
          this.chartData.rows[2]['number'] += 1
        } else if (problem.accepted_ratio === '100%') {
          this.chartData.rows[0]['number'] += 1
        } else {
          this.chartData.rows[1]['number'] += 1
        }

        let accepted_count = 0
        let submit_count = 0
        this.examProblems.map(item => {
          accepted_count += item.accepted_count
          submit_count += item.submit_count
        })
        this.averageAcRatio = (accepted_count / submit_count * 100).toFixed(2)
      } else {
        this.$message.warning('已添加至考试题目', 1.5)
      }
    },

    showDetail(problem_id) {
      this.$router.push({
        path: `/problem/preview/${problem_id}`
      })
    },

    newProblem() {
      this.$router.push({
        path: '/problem/add'
      })
    },

    onSearch() {}
  }
}
</script>

<style>
.exam {
  display: flex;
}

.exam-problems {
  width: 60%;
  padding: 5px;
  border: 1px solid #cccccc;
}

.problems-info {
  width: 30%;
  margin-left: 5%;
  padding: 5px;
  border: 1px solid #cccccc;
}

ve-ring {
  width: 100px;
  height: 100px;
}

.rate {
  display: flex;
  justify-content: center;
}

.all-problems {
  width: 95%;
  padding: 5px;
  margin-top: 20px;
  border: 1px solid #cccccc;
}

.function {
  display: flex;
  margin: 5px 0;
}

h3 {
  margin-left: 10px;
  font-weight: bold;
}
</style>
