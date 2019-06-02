<template>
  <div class="hello">
    <div class="title">
      <div class="view">
        <button
          class="ant-btn ant-btn-primary"
          style="color: black; background: white;"
          type="button"
          data-v-21b4b419="">
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
      <span slot="action" slot-scope="text, record">
        <a-button @click="checkSourceCode(record.id)">查看源代码</a-button>
      </span>
    </a-table>
  </div>
</template>

<script>

  import { getAllSubmissions } from '@/api/problem'

  const columns = [
    {
      title: '提交ID',
      dataIndex: 'id'
    },
    {
      title: '问题ID',
      dataIndex: 'problem'
    },
    {
      title: '学生',
      dataIndex: 'student'
    },
    {
      title: '学生ID',
      dataIndex: 'student_number'
    },
    {
      title: '全部样例',
      dataIndex: 'all_cases_count'
    },
    {
      title: '成功样例',
      dataIndex: 'succeed_cases_count'
    },
    {
      title: '创建时间',
      dataIndex: 'created_at'
    },
    {
      title: '编程语言',
      dataIndex: 'language'
    },
    {
      title: '操作',
      key: 'action',
      dataIndex: 'action',
      scopedSlots: { customRender: 'action' }
    }
  ]

  export default {
    data() {
      return {
        data: [],
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

      dataRender(resData) {
        console.log('data rendering')
        console.log(resData)
        for (var i = 0; i < resData.length; i++) {
          console.log('in a for loop')
          this.data.push({
            key: i,
            id: resData[i].id,
            problem: resData[i].name,
            student: resData[i].student,
            student_number: resData[i].student_number,
            all_cases_count: resData[i].all_cases_count,
            succeed_cases_count: resData[i].succeed_cases_count,
            created_at: resData[i].created_at,
            language: resData[i].language
          })
        }
        console.log('data rendered')
        console.log(this.data)
      },

      checkSourceCode(submission_id) {
        this.$router.push({
          path: `/problem/sourcecode/${submission_id}`
        })
      },

      loadAllSubmissions() {
        getAllSubmissions({
          page: 1,
          problem_id: this.$route.params.problem_id
        }).then(res => {
          console.log(res)
          this.dataRender(res['submissions'])
        }).catch(err => {
          console.log(err)
        })
      }
    },
    mounted() {
      this.loadAllSubmissions()
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
