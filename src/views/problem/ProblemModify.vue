<template>
  <div class="ant-layout-has-sider">
    <div class="bg">
      <div class="main">
        <div class="problem-title">
          <a-icon class="title-icon" type="caret-right"/>
          <h3>题目标题</h3>
          <input type="text" class="ant-input" v-model="problem_title">
        </div>
        <!-- <div class="problem-block">
          <a-icon class="title-icon" type="caret-right"/>
          <h3>题目类型</h3>
          <a-radio-group @change="selectType">
            <a-radio-button value="practice" class="red-btn" v-model="problem_type">练习题</a-radio-button>
            <a-radio-button value="exam" class="yellow-btn" v-model="problem_type">考试题</a-radio-button>
            <a-radio-button value="homework" class="blue-btn" v-model="problem_type">作业题</a-radio-button>
          </a-radio-group>
        </div> -->
        <div class="problem-block" id="multi-textarea">
          <a-icon class="title-icon" type="caret-right"/>
          <h3>题目描述</h3>
          <editor @transferMsg="getMessage"></editor>
        </div>
        <!-- <div class="problem-block">
          <a-icon class="title-icon" type="caret-right"/>
          <h3>附件</h3>
          <a-upload action="//jsonplaceholder.typicode.com/posts/" :defaultFileList="defaultFileList">
            <a-button>
              <a-icon type="upload"/>
              上传附件
            </a-button>
          </a-upload>
        </div> -->
        <div class="problem-block" id="limit">
          <div class="problem-limit">
            <a-icon class="title-icon" type="caret-right"/>
            <h3>内存限制(MB)</h3>
            <input type="text" class="ant-input limit-input" name="memory_limit" v-model="memory_limit">
          </div>
          <div class="problem-limit">
            <a-icon class="title-icon" type="caret-right"/>
            <h3>时间限制(MS)</h3>
            <input type="text" class="ant-input limit-input" name="time_limit" v-model="runtime_limit">
          </div>
          <!-- <div class="problem-limit">
            <a-icon class="title-icon" type="caret-right"/>
            <h3>输入限制(行)</h3>
            <input type="text" class="ant-input limit-input" name="input_limit">
          </div>
          <div class="problem-limit">
            <a-icon class="title-icon" type="caret-right"/>
            <h3>输出限制(行)</h3>
            <input type="text" class="ant-input limit-input" name="output_limit">
          </div> -->
        </div>
        <div class="problem-block">
          <a-icon class="title-icon" type="caret-right"/>
          <h3>测例输入与输出</h3>
          <div class="test-span">
            <div class="test-span-text">
              <a-icon class="title-icon test-input-span" type="caret-right"/>
              <h3>测例标签</h3>
            </div>
            <input type="text" class="ant-input span-input" name="test_span" placeholder="例：边界条件" v-model="test_span">
          </div>
          <div class="in-out">
            <a-icon class="title-icon test-input-span" type="caret-right"/>
            <h3>输入</h3>
            <a-textarea
              placeholder="输入"
              :autosize="{ minRows: 2, maxRows: 6}"
              class="in-out-textarea"
              v-model="test_input"/>
          </div>
          <div class="in-out">
            <a-icon class="title-icon test-input-span" type="caret-right"/>
            <h3>输出</h3>
            <a-textarea
              placeholder="输出"
              :autosize="{ minRows: 2, maxRows: 6}"
              class="in-out-textarea"
              v-model="test_output"/>
          </div>
          <button type="button" class="ant-btn ant-btn-primary confirm-btn" @click="handleAdd1">
            <span>添加>></span>
          </button>
          <a-table bordered :dataSource="dataSource1" :columns="columns1" style="width: 80%;margin-top: 1%;">
            <template slot="input" slot-scope="text, record">
              <editable-cell :text="text" @change="onCellChange(record.key, 'input', $event)"/>
            </template>
            <template slot="output" slot-scope="text, record">
              <editable-cell :text="text" @change="onCellChange(record.key, 'output', $event)"/>
            </template>
            <template slot="span" slot-scope="text, record">
              <editable-cell :text="text" @change="onCellChange(record.key, 'span', $event)"/>
            </template>
            <template slot="operation" slot-scope="text, record">
              <a-popconfirm
                v-if="dataSource1.length"
                title="确认删除?"
                @confirm="() => onDelete1(record.key)">
                <a href="javascript:;">删除</a>
              </a-popconfirm>
            </template>
          </a-table>
        </div>
        <div class="problem-block">
          <a-icon class="title-icon" type="caret-right"/>
          <h3>样例输入与输出</h3>
          <div class="test-span">
            <div class="test-span-text">
              <a-icon class="title-icon test-input-span" type="caret-right"/>
              <h3>样例标签</h3>
            </div>
            <input type="text" class="ant-input span-input" name="test_span" placeholder="例：边界条件" v-model="sample_span">
          </div>
          <div class="in-out">
            <a-icon class="title-icon test-input-span" type="caret-right"/>
            <h3>输入</h3>
            <a-textarea
              placeholder="输入"
              :autosize="{ minRows: 2, maxRows: 6}"
              class="in-out-textarea"
              v-model="sample_input"/>
          </div>
          <div class="in-out">
            <a-icon class="title-icon test-input-span" type="caret-right"/>
            <h3>输出</h3>
            <a-textarea
              placeholder="输出"
              :autosize="{ minRows: 2, maxRows: 6}"
              class="in-out-textarea"
              v-model="sample_output"/>
          </div>
          <div class="test-input-output">
            <button type="button" class="ant-btn ant-btn-primary confirm-btn" @click="handleAdd2">
              <span>添加>></span>
            </button>
          </div>
          <a-table bordered :dataSource="dataSource2" :columns="columns2" style="width: 80%;margin-top: 1%;">
            <template slot="input2" slot-scope="text, record">
              <editable-cell :text="text" @change="onCellChange(record.key, 'input2', $event)"/>
            </template>
            <template slot="output2" slot-scope="text, record">
              <editable-cell :text="text" @change="onCellChange(record.key, 'output2', $event)"/>
            </template>
            <template slot="span2" slot-scope="text, record">
              <editable-cell :text="text" @change="onCellChange(record.key, 'span2', $event)"/>
            </template>
            <template slot="operation2" slot-scope="text, record">
              <a-popconfirm
                v-if="dataSource2.length"
                title="确认删除?"
                @confirm="() => onDelete2(record.key)">
                <a href="javascript:;">删除</a>
              </a-popconfirm>
            </template>
          </a-table>
        </div>

        <div class="problem-block">
          <a-icon class="title-icon" type="caret-right"/>
          <h3>题目标签</h3>
          <a-select
            mode="tags"
            placeholder="Please select"
            style="width: 220px"
            allowClear="true"
            v-model="tags"
            :defaultValue="['a1', 'b2']"
          >
            <a-select-option value="C">C</a-select-option>
            <a-select-option value="C++">C++</a-select-option>
            <a-select-option value="Java">Java</a-select-option>
            <a-select-option value="Python">Python</a-select-option>
            <a-select-option value="algorithm">算法导论</a-select-option>
            <a-select-option value="data strutrue">数据结构</a-select-option>
          </a-select>
        </div>
        <!-- <div class="problem-block">
          <a-icon class="title-icon" type="caret-right"/>
          <h3>状态</h3>
          <a-radio-group @change="selectStatus">
            <a-radio-button value="public">公开</a-radio-button>
            <a-radio-button value="private">不公开</a-radio-button>
          </a-radio-group>
          <a-radio-group @change="selectDifficult" class="second-radio-group">
            <a-radio-button value="high" class="red-btn">High</a-radio-button>
            <a-radio-button value="medium" class="yellow-btn">Medium</a-radio-button>
            <a-radio-button value="low" class="blue-btn">Low</a-radio-button>
          </a-radio-group>
        </div> -->
        <div class="btn-block">
          <button type="button" class="ant-btn ant-btn-primary" @click="editProblem">
            <span>保存</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Editor from './Editor'
  import EditableCell from './EditableCell'
  import { editProblem, getProblemDetail } from '@/api/problem'

  export default {
    name: 'MultiTextarea',
    components: {
      Editor,
      EditableCell
    },
    data() {
      return {
        problem_id: '',
        problem_title: '',
        problem_type: '',
        description: '',
        create_teacher_id: '',
        test_span: '',
        test_input: '',
        test_output: '',
        sample_span: '',
        sample_input: '',
        sample_output: '',
        runtime_limit: '',
        memory_limit: '',
        tags: [],
        cases: [],
        dataSource1: [],
        dataSource2: [],
        count1: 0,
        count2: 0,
        columns1: [{
          title: '输入',
          dataIndex: 'input',
          width: '30%',
          scopedSlots: { customRender: 'input' }
        }, {
          title: '输出',
          dataIndex: 'output',
          width: '30%',
          scopedSlots: { customRender: 'output' }
        }, {
          title: '标签',
          dataIndex: 'span',
          width: '30%',
          scopedSlots: { customRender: 'span' }
        }, {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' }
        }],
        columns2: [{
          title: '输入',
          dataIndex: 'input2',
          width: '30%',
          scopedSlots: { customRender: 'input2' }
        }, {
          title: '输出',
          dataIndex: 'output2',
          width: '30%',
          scopedSlots: { customRender: 'output2' }
        }, {
          title: '标签',
          dataIndex: 'span2',
          width: '30%',
          scopedSlots: { customRender: 'span2' }
        }, {
          title: '操作',
          dataIndex: 'operation2',
          scopedSlots: { customRender: 'operation2' }
        }]
      }
    },
    methods: {
      popupScroll() {
        console.log('popupScroll')
      },
      selectStatus(value) {
        console.log(`Selcted: ${value}`)
      },
      selectDifficult(value) {
        console.log(`Selcted: ${value}`)
      },
      selectType(value) {
        console.log(`Selcted: ${value}`)
      },
      onCellChange1(key, dataIndex, value) {
        const dataSource1 = [...this.dataSource1]
        const target = dataSource1.find(item => item.key === key)
        if (target) {
          target[dataIndex] = value
          this.dataSource1 = dataSource1
        }
      },
      onDelete1(key) {
        const dataSource1 = [...this.dataSource1]
        this.dataSource1 = dataSource1.filter(item => item.key !== key)
      },
      handleAdd1() {
        const { count1, dataSource1 } = this
        const newData = {
          key: count1,
          input: this.test_input,
          output: this.test_output,
          span: this.test_span
        }
        const newCase = {
          input: this.test_input,
          output: this.test_output,
          type: '0',
          weight: '5',
          tags: []
        }
        this.cases = [...this.cases, newCase]
        this.dataSource1 = [...dataSource1, newData]
        this.count1 = count1 + 1
      },
      onCellChange2(key, dataIndex, value) {
        const dataSource2 = [...this.dataSource2]
        const target = dataSource2.find(item => item.key === key)
        if (target) {
          target[dataIndex] = value
          this.dataSource2 = dataSource2
        }
      },
      onDelete2(key) {
        const dataSource2 = [...this.dataSource2]
        this.dataSource2 = dataSource2.filter(item => item.key !== key)
      },
      handleAdd2() {
        const { count2, dataSource2 } = this
        const newData = {
          key: count2,
          input2: this.sample_input,
          output2: this.sample_output,
          span2: this.sample_span
        }
        const newCase = {
          input: this.sample_input,
          output: this.sample_output,
          type: '1',
          weight: '5',
          tags: []
        }
        this.cases = [...this.cases, newCase]
        this.dataSource2 = [...dataSource2, newData]
        this.count2 = count2 + 1
      },
      getMessage(msg) {
        this.description = msg
      },
      editProblem() {
        // const problemParams = {
        //   problem_id: this.problem_id,
        //   problem_name: this.problem_title,
        //   description: this.description,
        //   created_teacher_id: 1,
        //   runtime_limit: this.runtime_limit,
        //   memory_limit: this.memory_limit,
        //   tags: this.tags,
        //   cases: this.cases
        // }
        // console.log(problemParams)

        editProblem({
          problem_id: this.problem_id,
          problem_name: this.problem_title,
          description: this.description,
          created_teacher_id: 1,
          runtime_limit: this.runtime_limit,
          memory_limit: this.memory_limit,
          tags: this.tags,
          cases: this.cases
        })
          .then(res => {
            alert('修改成功')
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    mounted: function() {
      this.problem_id = this.$route.params.problem_id
      getProblemDetail({
        problem_id: this.$route.params.problem_id
      })
        .then(res => {
          console.log(res)
          this.problem_title = res.name
          this.description = res.description
          this.create_teacher_id = res.teacher
          this.runtime_limit = res.runtime_limit
          this.memory_limit = res.memory_limit
          var tags_num = res.tags.size
          for (var i = 0; i < tags_num; i++) {
            this.tags = [...this.tags, res.tags[i].tag_name]
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

  #practice_type, #high {
    color: red;
  }

  #exam_type, #medium {
    color: yellow;
  }

  #homework_type, #low {
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
