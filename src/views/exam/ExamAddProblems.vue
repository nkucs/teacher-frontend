<template>
  <div>
    <div class="exam">
      <div class="exam-problems">
        <h3 class="title">题目列表</h3>
        <a-table :dataSource="examProblems" :columns="columnsOne" :pagination="(false)" bordered>
          <template slot="name" slot-scope="text, record">
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
            <a href="javascript:;">详情</a>
          </template>
        </a-table>
      </div>
      <div class="problems-info">
        <h3 class="title">提交统计</h3>
      </div>
    </div>
    <div class="all-problems">
      <h3 class="title">题库列表</h3>
      <div class="function">
        <a-input-search placeholder="输入id或名称搜索相关题目" style="width: 600px;" @search="onSearch"/>
        <a-button style="margin-left:100px;" type="primary" icon="plus" @click="newProblem">新建题目</a-button>
      </div>
      <a-table :dataSource="allProblems" :columns="columnsTwo" bordered>
        <template slot="name" slot-scope="text, record">
          <a href="javascript:;">{{ text }}</a>
        </template>
        <template slot="operation" slot-scope="text, record">
          <a href="javascript:;" @click="addToExam">添加</a>
          <a-divider type="vertical"/>
          <a href="javascript:;">详情</a>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
const columnsOne = [
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
    dataIndex: 'ac'
  },
  {
    title: '提交次数',
    dataIndex: 'submit'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' }
  }
]

const columnsTwo = [
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
    dataIndex: 'ac'
  },
  {
    title: '提交次数',
    dataIndex: 'submit'
  },
  {
    title: '所属课程',
    dataIndex: 'course'
  },
  {
    title: 'ac率',
    dataIndex: 'acRate'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' }
  }
]

const examProblems = []
for (let i = 0; i < 3; i++) {
  const key = i.toString()
  const id = i.toString()
  const name = 'a + b'
  const ac = 100
  const submit = 200
  examProblems.push({ key, id, name, ac, submit })
}

const allProblems = []
for (let i = 0; i < 50; i++) {
  const key = i.toString()
  const id = i.toString()
  const name = 'a + b'
  const ac = 100
  const submit = 200
  const course = '数据结构'
  const acRate = '50%'
  allProblems.push({ key, id, name, ac, submit, course, acRate })
}

export default {
  data() {
    return {
      columnsOne,
      columnsTwo,
      examProblems,
      allProblems
    }
  },

  methods: {
    remove(key) {
      const examProblems = [...this.examProblems]
      this.examProblems = examProblems.filter(item => item.key !== key)
    },

    addToExam() {},

    newProblem() {}
  }
}
</script>

<style>
.exam {
  min-height: 300px;
  display: flex;
}

.exam-problems {
  width: 660px;
  padding: 5px;
  border: 1px solid #cccccc;
}

.problems-info {
  width: 300px;
  margin-left: 40px;
  padding: 5px;
  border: 1px solid #cccccc;
}

.all-problems {
  width: 1000px;
  padding: 5px;
  margin-top: 20px;
  border: 1px solid #cccccc;
}

.function {
  display: flex;
  margin: 5px 0;
}

h3 {
  font-weight: bold;
}
</style>
