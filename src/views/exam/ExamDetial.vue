  <template>
  <div>
    <a-row>

      <a-col :span="12" :offset="6">
        <h1>{{ examName }}</h1>
      </a-col>

      <a-col :span="2" :offset="4">
        <a-button type="primary">返回课程</a-button>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="4" :offset="4" class="body-text-1">
        考试名字
      </a-col>
      <a-col :span="8">
        {{ examName }}
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="4" :offset="4" class="body-text-1">
        考试时间
      </a-col>
      <a-col :span="8">
        {{ examTime }}
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="4" :offset="4" class="body-text-1">
        参与学生
      </a-col>
      <a-col :span="8">
        <router-link to="/exam/addstudent">查看</router-link>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="4" :offset="4" class="body-text-1">
        A 卷题目
      </a-col>

      <a-col :span="8">
        <router-link to="/exam/addproblems">添加</router-link>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="16" :offset="6">
        <a-table :columns="columns" :dataSource="dataA">
          <a slot="name" slot-scope="text" href="javascript:;">{{ text }}</a>
          <span slot="customTitle">
            题目id</span>
          <span slot="tags" slot-scope="tags">
            <a-tag v-for="tag in tags" color="blue" :key="tag">{{ tag }}</a-tag>
          </span>
          <span slot="action" slot-scope="text, record">
            <a-popconfirm title="Are you sure？" okText="Yes" cancelText="No">
              <a href="#">Delete</a>
            </a-popconfirm>
            <a-divider type="vertical" />
          </span>
        </a-table>
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="4" :offset="4" class="body-text-1">
        B 卷题目
      </a-col>
      <a-col :span="8">
        <router-link to="/exam/addproblems">添加</router-link>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="16" :offset="6">
        <a-table :columns="columns" :dataSource="dataB">
          <a slot="name" slot-scope="text" @click="getProblemDetial">{{ text }}</a>
          <span slot="customTitle">
            题目id</span>
          <span slot="tags" slot-scope="tags">
            <a-tag v-for="tag in tags" color="blue" :key="tag">{{ tag }}</a-tag>
          </span>
          <span slot="action" slot-scope="text, record">
            <a-popconfirm title="Are you sure？" okText="Yes" cancelText="No">
              <a href="#">Delete</a>
            </a-popconfirm>
            <a-divider type="vertical" />
          </span>
        </a-table>
      </a-col>
    </a-row>
  </div>
</template>


<script>
const columns = [{
    dataIndex: 'problemID',
    key: 'name',
    slots: {
      title: 'customTitle'
    },
    scopedSlots: {
      customRender: 'name'
    },
  }, {
    title: '题目名称',
    dataIndex: 'problemName',
  }, {
    title: '测试数',
    dataIndex: 'testNumber',
  }, {
    title: '分值',
    dataIndex: 'scores',

  },
  {
    title: '',
    key: 'action',
    scopedSlots: {
      customRender: 'action'
    },
  }
]

const dataA = [{
  key: '1',
  problemID: '21132',
  problemName: 'A+B',
  testNumber: '99',
  scores: '100'
}, {
  key: '1',
  problemID: '21132',
  problemName: 'A+B',
  testNumber: '99',
  scores: '100'
}, {
  key: '1',
  problemID: '21132',
  problemName: 'A+B',
  testNumber: '99',
  scores: '100'
}, ]
const dataB = [{
  key: '1',
  problemID: '21132',
  problemName: 'A+B',
  testNumber: '99',
  scores: '100'
}, {
  key: '1',
  problemID: '21132',
  problemName: 'A+B',
  testNumber: '99',
  scores: '100'
}, {
  key: '1',
  problemID: '21132',
  problemName: 'A+B',
  testNumber: '99',
  scores: '100'
}, ]
export default {
  data() {
    return {
      dataA,
      dataB,
      columns,
      examName: '2019-2020年第2学期 算法导论考试',
      examTime: '2019.4.1 14:00 - 2019.4.1 15:00',
    }
  },
  methods: {
    getProblemDetial() {},
    deleteProblem() {}
  }
}
</script>

<style scoped>
.body-text-1 {
  color: rgba(122, 12, 110, 1);
  font-size: 20px;
  line-height: 150%;

}
</style>
