<template>
  <div class="hello">
    <a-row type="flex" justify="start">
      <a-col :span="2">
        <h4>课程名称：</h4>
      </a-col>
      <a-col :span="4">
        <a-select placeholder="请选择课程" style="width: 160px" @change="selectLecture">
          <a-select-option value="java">Java语言程序设计</a-select-option>
          <a-select-option value="data_structure">数据结构</a-select-option>
          <a-select-option value="algorithm">算法导论</a-select-option>
        </a-select>
      </a-col>
      <a-col :span="4">
        <a-select placeholder="请选择题目类型" style="width: 160px" @change="selectTypeOfProblem">
          <a-select-option value="exam">考试题</a-select-option>
          <a-select-option value="homework">作业题</a-select-option>
          <a-select-option value="practice">练习题</a-select-option>
        </a-select>
      </a-col>
    </a-row>
    <br>
    <a-row type="flex" justify="start">
      <a-col :span="3">
        <h4>输入筛选信息：</h4>
      </a-col>
      <a-col :span="4">
        <a-input-search placeholder="题目名称" style="width: 160px" @search="onSearch"/>
      </a-col>
      <a-col :span="4">
        <a-select placeholder="请选择教师" style="width: 140px" @change="selectInstructor">
          <a-select-option value="zhangsl">张圣林</a-select-option>
          <a-select-option value="liumm">刘铭明</a-select-option>
          <a-select-option value="xiemq">谢茂强</a-select-option>
        </a-select>
      </a-col>
      <a-col :span="4">
        <a-select placeholder="请选择题目难度" style="width: 140px" @change="selectLevelOfProblem">
          <a-select-option value="high">High</a-select-option>
          <a-select-option value="medium">Medium</a-select-option>
          <a-select-option value="low">Low</a-select-option>
        </a-select>
      </a-col>
      <a-col :span="4">
        <a-button type="primary">筛选</a-button>
      </a-col>
    </a-row>
    <br>
    <a-row type="flex" justify="start">
      <a-col :span="3">
        <a-button type="primary">+新建题目</a-button>
      </a-col>
      <a-col :span="3">
        <a-button>批量上传</a-button>
      </a-col>
      <a-col :span="3">
        <a-button type="danger">批量删除</a-button>
      </a-col>
    </a-row>
    <br>
    <div style="margin-bottom: 16px">
      <a-button type="primary" @click="start" :disabled="!hasSelected" :loading="loading">清空</a-button>
      <span style="margin-left: 8px">
        <template v-if="hasSelected">{{ `已选择 ${selectedRowKeys.length} 项` }}</template>
      </span>
    </div>
    <a-table
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      :columns="columns"
      :dataSource="data"
    >
      <span slot="problem_state" slot-scope="problem_state">
        <a-tag color="green" :key="problem_state">{{ problem_state }}</a-tag>
      </span>
      <span slot="action" slot-scope="text, record">
        <a href="javascript:;" @change="editProblem(record.id)">修改</a>
        <a-divider type="vertical"/>
        <a href="javascript:;" @change="previewProblem(record.id)">预览</a>
        <a-divider type="vertical"/>
        <a href="javascript:;" @change="deleteProblem(record.id)">删除</a>
      </span>
    </a-table>
  </div>
</template>

<script>
const columns = [
  {
    title: 'id',
    dataIndex: 'id'
  },
  {
    title: '题目名称',
    dataIndex: 'problem_name'
  },
  {
    title: '提交数',
    dataIndex: 'submit_times'
  },
  {
    title: '通过数',
    dataIndex: 'ac_times'
  },
  {
    title: '通过率',
    dataIndex: 'ac_ratio'
  },
  {
    title: '创建人',
    dataIndex: 'setup_instructor'
  },
  {
    title: '创建时间',
    dataIndex: 'setup_time'
  },
  {
    title: '难度',
    dataIndex: 'problem_difficulty'
  },
  {
    title: '题目状态',
    key: 'problem_state',
    dataIndex: 'problem_state',
    scopedSlots: { customRender: 'problem_state' }
  },
  {
    title: '操作',
    key: 'action',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

const data = []
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    id: `${i}`,
    problem_name: `问题${i}`,
    submit_times: 50,
    ac_times: 30,
    ac_ratio: `60%`,
    setup_instructor: `刘铭明`,
    setup_time: `2018-02-13 13:41:32`,
    problem_difficulty: `Middle`,
    problem_state: `√已公开`
  })
}

export default {
  data() {
    return {
      data,
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false
    }
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0
    }
  },
  methods: {
    start() {
      this.loading = true
      // ajax request after empty completing
      setTimeout(() => {
        this.loading = false
        this.selectedRowKeys = []
      }, 1000)
    },
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    handleChange(value) {
      console.log(`selected ${value}`)
    },
    selectLecture(value) {
      console.log(`selected ${value}`)
    },
    selectTypeOfProblem(value) {
      console.log(`selected ${value}`)
    },
    selectInstructor(value) {
      console.log(`selected ${value}`)
    },
    selectLevelOfProblem(value) {
      console.log(`selected ${value}`)
    }
    // editProblem(problem_id) {
    //
    // },
    // previewProblem(problem_id){
    //
    // },
    // deleteProblem(problem_id){
    //
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #3f70f5;
}
</style>
