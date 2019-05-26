<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-breadcrumb>
      <a-breadcrumb-item>首页</a-breadcrumb-item>
      <a-breadcrumb-item>
        <a href>考试中心</a>
      </a-breadcrumb-item>
      <a-breadcrumb-item>添加学生</a-breadcrumb-item>
    </a-breadcrumb>
    <a-layout class="page">
      <a-layout-header style="background: #fff; padding: 20">
        <div class="btn_list">
          <a-button type="primary" :size="size" @click="addstudent">添加学生</a-button>
          <a-modal title="添加考试学生" v-model="visible" @ok="handleOk" class="addstudent">
            <a-table
              :rowSelection="rowSelection_t"
              :columns="alltudent"
              :dataSource="alldata"
              rowKey="all_id"
            >
              <a slot="all_id" slot-scope="text" href="javascript:;">{{ text }}</a>
            </a-table>
          </a-modal>
          <a-button type="dashed" :size="size" @click="exportstu">导出csv</a-button>
          <a-button type="primary" :size="size" @click="deletestudent">删除学生</a-button>
        </div>
        <div class="search">
          <a-input-search
            placeholder="请输入学生学号或姓名"
            @search="onSearch"
            enterButton="Search"
            size="large"
          />
        </div>
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <!-- 页面表单部分 -->
        <div>
          <a-table :rowSelection="rowSelection" :columns="columns" :dataSource="data" rowKey="id">
            <template
              v-for="col in ['type','exam_id','password']"
              :slot="col"
              slot-scope="text, record"
            >
              <div v-if="(col =='type')" :key="col">
                <a-select
                  v-if="record.editable"
                  :defaultValue="text"
                  style="width: 120px"
                  @change="e => handleChange(e, record.key, col)"
                >
                  <a-select-option value="A">A</a-select-option>
                  <a-select-option value="B">B</a-select-option>
                </a-select>
                <template v-else>{{ text }}</template>
              </div>
              <div v-else :key="col">
                <a-input
                  v-if="record.editable"
                  style="margin: -5px 0"
                  :value="text"
                  @change="e => handleChange(e.target.value, record.key, col)"
                />
                <template v-else>{{ text }}</template>
              </div>
            </template>
            <template slot="operation" slot-scope="text, record">
              <div class="editable-row-operations">
                <span v-if="record.editable">
                  <a @click="() => save(record.key)">Save</a>
                  <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.key)">
                    <a>Cancel</a>
                  </a-popconfirm>
                </span>
                <span v-else>
                  <a @click="() => edit(record.key)">Edit</a>
                </span>
              </div>
            </template>
          </a-table>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import axios from 'axios'
const exam = '' //为本次考试id

const alltudent = [
  {
    title: 'ID',
    dataIndex: 'all_id',
    scopedSlots: { customRender: 'all_id' }
  },
  {
    title: 'Name',
    dataIndex: 'all_name'
  },
  {
    title: '班级',
    dataIndex: 'all_class'
  }
]
const alldata = []
for (let i = 0; i < 46; i++) {
  alldata.push({
    all_id: i * 10,
    all_name: i,
    all_class: i
  })
}

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    scopedSlots: { customRender: 'id' }
  },
  {
    title: 'Name',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '考试类型',
    dataIndex: 'type',
    scopedSlots: { customRender: 'type' }
  },
  {
    title: '用户名',
    dataIndex: 'exam_id',
    scopedSlots: { customRender: 'exam_id' }
  },
  {
    title: '密码',
    dataIndex: 'password',
    scopedSlots: { customRender: 'password' }
  },
  {
    title: 'operation',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' }
  }
]
const data = []
for (var i = 0; i < 46; i++) {
  data.push({
    key: i.toString(),
    id: (i * 10).toString(),
    name: ' A',
    type: 'A',
    exam_id: i,
    password: i
  })
}

const dataclone = []
export default {
  data() {
    this.cacheData = data.map(item => ({ ...item }))
    return {
      exam, //本次考试的id
      list: [],
      visible: false,
      dataclone,
      data,
      alldata,
      columns,
      alltudent,
      selectedRowKeys: [],
      selectedRowKeys_t: []
    }
  },
  mounted() {
    this.stulist()
  },
  computed: {
    rowSelection() {
      return {
        onChange: selectedRowKeys => {
          this.selectedRowKeys = selectedRowKeys
        }
      }
    },

    rowSelection_t() {
      return {
        onChange: selectedRowKeys => {
          this.selectedRowKeys_t = selectedRowKeys
        }
      }
    }
  },
  methods: {
    get_url() {
      return 'localhost:8000/port'
    },
    // get_url() {
    //   axios.get('localhost:8000/port',{params: value}) //2 AllowAccess-Control-Allow-Origin拦截限制
    //     .then(res=>{
    //       console.log(res.data)
    //     })
    // },
    stulist: function() {
      this.$message.success('正在初始化数据，请耐心等候……')
      axios.post(this.get_url() + 'exam/student/get-examstudent', { exam: this.exam }).then(function(response) {
        var student_number = eval(response.data.student_number)
        var name = eval(response.data.name)
        var typelist = eval(response.data.typelist)
        var grade = eval(response.data.grade)
        var password = eval(response.data.password)
        for (var i = 0; i < student_number; ++i) {
          this.list.push({
            id: student_number[i],
            name: name[i],
            type: typelist[i],
            exam_id: grade[i],
            password: password[i]
          })
        }
        this.$message.success('初始化成功')
        this.data = this.list
      })
      this.list = []
    },
    handleChange(value, key, column) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
    edit: function(key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target.editable = true
        this.data = newData
      }
    },
    save: function(key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        delete target.editable
        this.data = newData
        this.cacheData = newData.map(item => ({ ...item }))
        //将修改的值传递给后端
        axios
          .post(this.get_url() + 'exam/student/fix-examstudent', {
            exam: this.exam,
            id: target['id'],
            type: target['type'],
            exam_id: target['exam_id'],
            password: target['password']
          })
          .then({})
      }
    },
    cancel: function(key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key === item.key)[0])
        delete target.editable
        this.data = newData
      }
    },
    addstudent: function() {
      this.visible = true
    },
    deletestudent: function() {
      var post = []
      if (this.selectedRowKeys.length != 0) {
        const newdata = this.data.filter(item => !this.selectedRowKeys.includes(item.id)) //获取所有需要删除的id
        for (var i = 0; i < newdata.length; i++) {
          post.append(newdata[i].id) //设置传参为所有添加的id
        }
        axios
          .post(this.get_url() + 'exam/student/delete-student', { id: post, exam: this.exam }) //传入考试id及所有添加学生的ID
          .then(function(response) {
            //返回所参加考试的学生
            var student_number = eval(response.data.student_number)
            var name = eval(response.data.name)
            var typelist = eval(response.data.typelist)
            var grade = eval(response.data.grade)
            var password = eval(response.data.password)
            for (var i = 0; i < student_number; ++i) {
              this.list.push({
                id: student_number[i],
                name: name[i],
                type: typelist[i],
                exam_id: grade[i],
                password: password[i]
              })
            }
            this.data = this.list
          })
        this.$message.success('删除成功')
        this.selectedRowKeys_t = []
      } else {
        this.$message.error('请勾选要删除的学生')
      }
    },
    exportstu: function() {
      if (this.selectedRowKeys.length != 0) {
        this.$message.success('导出成功')
        this.selectedRowKeys = []
      } else {
        this.$message.error('请勾选要导出的学生')
      }
    },
    handleOk: function() {
      var post = []
      if (this.selectedRowKeys_t.length != 0) {
        const newdata = this.alldata.filter(item => this.selectedRowKeys_t.includes(item.all_id))
        for (var i = 0; i < newdata.length; i++) {
          post.append(newdata[i].id) //设置传参为所有添加的id
        }
        axios
          .post(this.get_url() + 'exam/student/add-student', { id: post, exam: this.exam }) //传入考试id及所有添加学生的ID
          .then(function(response) {
            //返回所参加考试的学生
            var student_number = eval(response.data.student_number)
            var name = eval(response.data.name)
            var typelist = eval(response.data.typelist)
            var grade = eval(response.data.grade)
            var password = eval(response.data.password)
            for (var i = 0; i < student_number; ++i) {
              this.list.push({
                id: student_number[i],
                name: name[i],
                type: typelist[i],
                exam_id: grade[i],
                password: password[i]
              })
            }
            this.$message.success('初始化成功')
            this.data = this.list
          })
        this.list = []
        this.selectedRowKeys_t = []
        this.$message.success('添加成功')
      } else {
        this.$message.error('请勾选要添加的学生')
      }
    },
    onSearch: function(value) {
      if (value === '') {
        if (this.dataclone.length > 0) {
          this.data = this.dataclone
          this.dataclone = []
        }
      } else {
        var list = /^[0-9]*$/
        var list1 = /^[\u4e00-\u9fa5]|[a-zA-Z]$/
        if (list.test(value)) {
          if (this.dataclone < this.data.length) {
            this.dataclone = this.data
          }
          this.data = []
          for (var i = 0; i < this.dataclone.length; i++) {
            if (this.dataclone[i].id === value) {
              this.data.push(this.dataclone[i])
            }
          }
        } else if (list1.test(value)) {
          if (this.dataclone < this.data.length) {
            this.dataclone = this.data
          }
          this.data = []
          for (var j = 0; j < this.dataclone.length; j++) {
            if (this.dataclone[j].name.indexOf(value) > 0) {
              this.data.push(this.dataclone[j])
            }
          }
        }
      }
    }, //前端从所有参加考试的学生中查找
    getallstudent: function() {}
  }
}
</script>
<style>
.ant-modal-content {
  width: 200%;
  position: absolute;
  border: 0;
  border-radius: 4px;
  background-clip: padding-box;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0) !important;
}

.addstudent {
  width: 600px;
}
.page {
  margin: 20px;
}
.btn_list {
  align-items: center;
  width: 40%;
  display: inline-block;
}
.search {
  width: 400px;
  float: right;
  display: inline-block;
}

#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.editable-row-operations a {
  margin-right: 8px;
}
</style>