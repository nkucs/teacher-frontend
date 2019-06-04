  <template>
  <div>
      <div>
        <h3>题目列表</h3>
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
            <a href="javascript:;">详情</a>
          </template>
        </a-table>
      </div>

    <div>
      <h3>题库列表</h3>
      <a-divider type="horizontal"/>
      <div class="function">
        <a-input-search placeholder="输入id或名称搜索相关题目" v-model="search" @search="updatePage"/>
      </div>
      <a-table :dataSource="allProblems" :columns="allColumns"
        @change="callbackTable" bordered>
        <template slot="name" slot-scope="text">
          <a href="javascript:;">{{ text }}</a>
        </template>
        <template slot="operation" slot-scope="text, record">
          <a href="javascript:;" @click="addToExam(record.key)">添加</a>
          <a-divider type="vertical"/>
          <a href="javascript:;">详情</a>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
const examColumns = [{
    title: 'id',
    dataIndex: 'id'
  },
  {
    title: 'code',
    dataIndex: 'code'
  },
  {
    title: '名称',
    dataIndex: 'name'
  },
  {
    title: '权重',
    dataIndex: 'weight'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: {
      customRender: 'operation'
    }
  }
]

const allColumns = [{
    title: 'id',
    dataIndex: 'id'
  },
  {
    title: 'code',
    dataIndex: 'code'
  },
  {
    title: '名称',
    dataIndex: 'name'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: {
      customRender: 'operation'
    }
  }
]
import {
  getallproblem
} from '@/api/exam'
export default {
  data() {
    return {
      examColumns,
      allColumns,
      allProblems: [],

      averageAcRate: 0,
      chartSettings: {
        radius: [60, 80]
      },
      problemPagination: {
        pageSize: 4,
        total: 0,
        current: 1
      },
      search: ""
    }
  },

  props: ['examProblems'],
  methods: {
    handleChange(value) {
      console.log(`Selected: ${value}`);
    },
    sendmsg() {
      this.$emit('sendparent', this.examProblems)
    },

    remove(key) {
      const examProblems = [...this.examProblems]
      const problem = examProblems.filter(item => item.key === key)[0]
      const index = examProblems.indexOf(problem)
      this.examProblems.splice(index, 1)
      this.sendmsg()
    },

    addToExam(key) {
      const examProblems = [...this.examProblems]
      const allProblems = [...this.allProblems]
      const problem = allProblems.filter(item => item.key === key)[0]
      const allId = examProblems.map(item => {
        return item.id
      })
      if (allId.indexOf(problem.id) === -1) {
        this.examProblems.push(problem)
        this.$message.success('成功添加至考试题目', 1.5)
      } else {
        this.$message.warning('已添加至考试题目', 1.5)
      }
      this.sendmsg()
    },

    _updatePage(index) {
      let self = this
      let search_number = ""
      let search_name = ""
      if (parseInt(this.search)) {
        search_number = this.search
      } else {
        search_name = this.search
      }
      getallproblem({
        page_index: index,
        page_length: self.problemPagination.pageSize,
        search_name: search_name,
        search_number: search_number
      }).then(response => {
        const pagination = {
          ...self.problemPagination
        }
        pagination.total = pagination.pageSize * parseInt(response.data.totalPages)
        pagination.current = parseInt(response.data.current)
        self.allProblems = response.data.problem_list
        self.problemPagination = pagination
      })
    },
    updatePage(index) {
      this._updatePage(1)
    },
    callbackTable: function(page, pagesize) {
      this._updatePage(page.current)
    },
  },

  created() {
    this.updatePage()
  }
}
</script>

<style>
h3 {
  margin-left: 10px;
  font-weight: bold;
}
</style>
