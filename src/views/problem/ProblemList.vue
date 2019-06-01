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
      <span slot="action" slot-scope="text, record">
        <a-button @click="editProblem(record.problem_id)">修改问题</a-button>
        <!--        <a href="javascript:;" @change="editProblem(record.id)">修改</a>-->
        <a-divider type="vertical"/>
        <!-- <a href="javascript:;" @change="previewProblem(record.problem_id)">预览</a> -->
        <a-button @click="previewProblem(record.problem_id)">预览问题</a-button>
        <a-divider type="vertical"/>
        <!-- <a href="javascript:;" @change="deleteProblem(record.problem_id)">删除</a> -->
        <a-button @click="deleteProblem(record.problem_id)">删除问题</a-button>
        <a-divider type="vertical"/>
        <a-button @click="checkSubmit(record.problem_id)">查看提交</a-button>
      </span>
    </a-table>
  </div>
</template>

<script>
  import { getAllProblems, deleteProblem } from '@/api/problem'

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
      title: '提交数',
      dataIndex: 'submit_count'
    },
    {
      title: '通过数',
      dataIndex: 'accepted_count'
    },
    {
      title: '通过率',
      dataIndex: 'ac_ratio'
    },
    {
      title: '创建时间',
      dataIndex: 'created_time'
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
      },

      dataRender(resData) {
        console.log('data rendering')
        console.log(resData)
        for (var i = 0; i < resData.length; i++) {
          console.log('in a for loop')
          this.data.push({
            key: i,
            problem_id: resData[i].id,
            problem_name: resData[i].name,
            submit_count: resData[i].submit_count,
            accepted_count: resData[i].accepted_count,
            ac_ratio: (resData[i].submit_count == 0) ? 0 : resData[i].accepted_count / resData[i].submit_count,
            created_time: resData[i].created_at
            // problem_difficulty: `Middle`,
            // problem_state: `√已公开`
          })
        }
        console.log('data rendered')
        console.log(this.data)
      },

      loadAllProblems() {
        getAllProblems({
          page: 1
        }).then(response => {
          console.log('下面是resonse')
          console.log(response)
          this.dataRender(response.data.problems)
        }).catch(error => {
          console.log(error)
        })
      },

      editProblem(problem_id) {
        console.log(problem_id)
        this.$router.push({
          path: `/problem/modify/${problem_id}`
        })
        // console.log('edit problem')
      },
      previewProblem(problem_id) {
        this.$router.push({
          path: `/problem/preview/${problem_id}`
        })
      },

      deleteProblem(problem_id) {
        deleteProblem({
          problem_id: problem_id
        }).then(function(res) {
          console.log(res)
          alert('删除成功')
          location.reload()
        })
          .catch(function(err) {
            console.log(err)
          })
      },
      checkSubmit(problem_id) {
        this.$router.push({
          path: `/problem/submit/${problem_id}`
        })
      }
    },
    // previewProblem(problem_id){
    //
    // },


    mounted() {
      this.loadAllProblems()
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
