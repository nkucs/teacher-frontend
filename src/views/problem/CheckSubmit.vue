<template>
  <div class="hello">
    <div class="title">
      <h1 class="title-text">预览题目</h1>
      <div class="view">
        <button class="ant-btn ant-btn-primary" style="color: black; background: white;" type="button" data-v-21b4b419="">
          <span>返回课程详情</span>
        </button>
      </div>
    </div>
    <div class="ant-divider ant-divider-horizontal"></div>
    <a-row type="flex" justify="start">
      <a-col :span="1.5">
        <h3>提交ID：</h3>
      </a-col>
      <a-col :span="4">
        <a-input-search placeholder="题目名称" style="width: 160px" @search="onSearch"/>
      </a-col>
      <a-col :span="1.5">
        <h3>提交人：</h3>
      </a-col>
      <a-col :span="4">
        <a-input-search placeholder="题目名称" style="width: 160px" @search="onSearch"/>
      </a-col>
      <a-col :span="4">
        <a-select placeholder="请选择题目难度" style="width: 140px" @change="handleChange">
          <a-select-option value="high">High</a-select-option>
          <a-select-option value="medium">Medium</a-select-option>
          <a-select-option value="low">Low</a-select-option>
        </a-select>
      </a-col>
      <a-col :span="4">
        <a-button type="primary">查询</a-button>
      </a-col>
    </a-row>
    <br>
    
    <a-table
      
      :columns="columns"
      :dataSource="data"
      bordered
    >
      <span slot="action" slot-scope="">
        <a href="javascript:;">查看源代码</a>
      </span>
    </a-table>
  </div>
</template>

<script>
const columns = [
  {
    title: '提交id',
    dataIndex: 'submission_id'
  },
  {
    title: '提交人',
    dataIndex: 'student_name'
  },
  {
    title: '语言',
    dataIndex: 'language'
  },
  {
    title: '问题id',
    dataIndex: 'problem_id'
  },
  {
    title: '得分',
    dataIndex: 'score'
  },
  {
    title: '结果',
    dataIndex: 'result'
  },
  {
    title: '状态',
    dataIndex: 'status'
  },
  {
    title: '创建时间',
    dataIndex: 'created_time'
  },
  {
    title: '操作',
    key:'action',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

const data = []
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    submission_id: `${i+1000}`,
    student_name: `ADMIN`,
    language: `C++`,
    problem_id: `612`,
    score: `100`,
    result: `√答案正确`,
    status: `√判题结束`,
    created_time: `2018-02-13 13:41:32`,
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.title {
		width: 100%;
		height: 3%;
	}
	
	.title-text {
		font-size: 20px;
		float: left;
	}
	
	.view {
		float: right;
	}
	
	.main {
		margin-left: 3%;
		display: block;
	}
	
	.bg {
		background-color: white;
		padding-top: 2%;
		padding-bottom: 2%;
	}
	
	.problem-title {
		margin-top: 3%;
	}
	
	.title-icon {
		float: left;
		font-size: 20px;
	}
	
	.ant-input {
		width: 80%;
	}
	
	.problem-block {
		margin-top: 2%;
		display: block;
	}
	
	#practice_type,
	#high {
		color: red;
	}
	
	#exam_type,
	#medium {
		color: yellow;
	}
	
	#homework_type,
	#low {
		color: deepskyblue;
	}
	
	.limit-input {
		width: 90%;
	}
	
	.test-span {
		margin-left: 3%;
		margin-top: 2%;
		display: flex;
	}
	
	.test-span-text {
		width: 10%;
		height: 2%;
	}
	
	.in-out {
		margin-left: 3%;
		margin-top: 1%;
		width: 80%;
		display: block;
	}
	
	.span-input {
		width: 15%;
	}
	
	.second-radio-group {
		margin-left: 5%;
	}
	
	#preread {
		margin-left: 1%;
	}
	
	.btn-block {
		margin-top: 3%;
	}
	
	#limit {
		display: flex;
	}
	
	.red-btn {
		color: red;
	}
	
	.yellow-btn {
		color: yellow;
	}
	
	.blue-btn {
		color: deepskyblue;
	}
	
	.confirm-btn {
		margin-top: 1%;
	}
	
	.in-out-textarea {
		width: 60%;
	}
</style>
