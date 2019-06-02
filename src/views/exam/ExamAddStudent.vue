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
          <a-button type="primary" @click="addstudent">添加学生</a-button>
          <a-modal title="添加考试学生" v-model="visible"  class="addstudent">
            <template slot="footer">
              <a-button key="back" @click="handleCancel">返回</a-button>
              <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
                添加
              </a-button>
              <a-select v-model="AllstudentPagination.pageSize" style="width: 120px" placeholder="显示条数" @change="handleAllPageChange">
                <a-select-option v-for="page in pagelist" :key="page">{{page}}</a-select-option>
              </a-select>
            </template>
            <a-input-search
              placeholder="请输入学生学号或姓名"
              v-model="searchAllStudents"
              @search="updateAllStudentTable()"
              enterButton="Search"
              size="large"
            />
            <a-table
              :rowSelection="rowSelection_t"
              :columns="allstudentcol"
              :pagination="AllstudentPagination"
              :dataSource="allstudentdata"
              @change="callbackAllStudentTable"
              rowKey="all_id"
            >
              <a slot="all_id" slot-scope="text" href="javascript:;">{{ text }}</a>
            </a-table>
          </a-modal>
          <a-button type="dashed" @click="exportstu">导出csv</a-button>
          <a-button type="primary" @click="deletestudent">删除学生</a-button>
          <a-select slot="footer" v-model="studentPagination.pageSize" style="width: 120px" placeholder="显示条数" @change="handlePageChange">
            <a-select-option v-for="page in pagelist" :key="page">{{page}}</a-select-option>
          </a-select>
        </div>
        <div class="search">
          <a-input-search
            placeholder="请输入学生学号或姓名"
            v-model="searchStudents"
            @search="updateStudentTable()"
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
          <a-table
            :rowSelection="rowSelection"
            :columns="studentcol"
            :pagination="studentPagination"
            :dataSource="studentdata"
            @change="callbackStudentTable"
            rowKey="number"
          >
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
                  @change="e => handleChange(e, record.number, col)"
                >
                  <a-select-option value="0">A</a-select-option>
                  <a-select-option value="1">B</a-select-option>
                </a-select>
                <template v-else>{{ text }}</template>
              </div>
              <div v-else :key="col">
                <a-input
                  v-if="record.editable"
                  style="margin: -5px 0"
                  :value="text"
                  @change="e => handleChange(e.target.value, record.number, col)"
                />
                <template v-else>{{ text }}</template>
              </div>
            </template>
            <template slot="operation" slot-scope="text, record">
              <div class="editable-row-operations">
                <span v-if="record.editable">
                  <a @click="() => save(record.number)">Save</a>
                  <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.number)">
                    <a>Cancel</a>
                  </a-popconfirm>
                </span>
                <span v-else>
                  <a @click="() => edit(record.number)">Edit</a>
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
import { getexamstudent } from '@/api/exam'
import { getallstudent } from '@/api/exam'
import { getallcontent } from '@/api/exam'
import { addstudent } from '@/api/exam'
import { deletestudent } from '@/api/exam'
import { fixstudent } from '@/api/exam'
// import { searchidstudent } from '@/api/exam'
// import { searchnamestudent } from '@/api/exam'
// import { searchidstuall } from '@/api/exam'
// import { searchnamestuall } from '@/api/exam'

const pagelist= [1,2,5,10,20,50]

const allstudentcol = [
  {
    title: 'ID',
    dataIndex: 'all_id',
    scopedSlots: { customRender: 'all_id' }
  },
  {
    title: 'Name',
    dataIndex: 'all_name',
    scopedSlots: { customRender: 'all_name' }
  },
  {
    title: '班级',
    dataIndex: 'all_class',
    scopedSlots: { customRender: 'all_class' }
  }
]

const studentcol = [
  {
    title: 'ID',
    dataIndex: 'number',
    scopedSlots: { customRender: 'number' }
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
export default {
  data() {
    //this.cacheData = studentdata.map(item => ({ ...item }))
    return {
      list: [],
      pagelist,
      visible: false,
      allstudentcol,
      studentcol,
      selectedRowKeys: [],
      selectedRowKeys_t: [],
      

      cacheData:null,
      studentdata: null,
      allstudentdata: null,
      searchStudents: '',
      searchAllStudents: '',

      studentPagination: {
        total: 0,
        current: 1,
        pageSize:10,
      },

      AllstudentPagination: {
        pageSize:10,
        total: 0,
        current: 1
      },

      exam_id: null,
    }
  },
  mounted() {
    // this.exam_id = parseInt(this.$route.query.id)
    this.exam_id = 1
    this.updateStudentTable()
  },
  computed: {    
    rowSelection() {
      let self = this
      return {
        onChange: function(selectedRowKeys){
          self.selectedRowKeys = selectedRowKeys
        }
      }
        
    },
    rowSelection_t() {
      const self = this
      return {        
        onChange: selectedRowKeys => {
          self.selectedRowKeys_t = selectedRowKeys
        }
      }
    }
  },
  methods: {
    //Three big functions
    handlePageChange() {
      //this.studentPagination.pageSize = value
      this.updateStudentTable()
    },
    handleAllPageChange() {
      this.updateAllStudentTable()
    },

    updateStudentTable: function() {
      this._updateStudentTable(1)
    },

    updateAllStudentTable: function() {
      this._updateAllStudentTable(1)
    },

    callbackStudentTable: function(page, pagesize) {
      this._updateStudentTable(page.current)
    },

    callbackAllStudentTable: function(page,pagesize) {
      this._updateAllStudentTable(page.current)
    },

    _updateStudentTable: function(index) {
      let student_number = ''
      let student_name = '' //搜索框获取
      if (isNaN(this.searchStudents)) {
        student_name = this.searchStudents
      } else {
        student_number = this.searchStudents
      }
      const self = this
      getexamstudent({
        exam_id: self.exam_id,
        student_name: student_name,
        student_number: student_number,
        page_index: index,
        page_length: self.studentPagination.pageSize
      }).then(response => {
        const pagination = { ...self.studentPagination }
        console.log(response.data.totalPages)
        pagination.total = pagination.pageSize * parseInt(response.data.totalPages) //返回所有的页数
        
        pagination.current = parseInt(response.data.current)
        
        self.studentdata = response.data.students
        self.studentPagination = pagination
        console.log(self.studentPagination)
        console.log(self.studentdata)
      })
      
    },

    _updateAllStudentTable: function(index) {
      let student_number = ''
      let student_name = '' //搜索框获取
      if (isNaN(this.searchAllStudents)) {
        student_name = this.searchAllStudents
      } else {
        student_number = this.searchAllStudents
      }
      getallstudent({
        exam_id: this.exam_id,
        student_name: student_name,
        student_number: student_number,
        page_index: index,
        page_length: this.AllstudentPagination.pageSize
      }).then(response => {
        const pagination = { ...this.AllstudentPagination }
        pagination.total = pagination.pageSize * parseInt(response.data.totalPages)
        pagination.current =  parseInt(response.data.current)
        this.allstudentdata = response.data.students
        this.AllstudentPagination = pagination
      })
    },

    edit: function(number) {
      this.cacheData = this.studentdata.map(item => ({ ...item }))
      const newData = [...this.studentdata]
      const target = newData.filter(item => number === item.number)[0]
      if (target) {
        target.editable = true
        this.studentdata = newData
      }
    },

    handleChange(value, number, column) {
      const newData = [...this.studentdata]
      const target = newData.filter(item => number === item.number)[0]
      if (target) {
        target[column] = value
        this.studentdata = newData
      }
    },

    save: function(number) {
      const newData = [...this.studentdata]
      const target = newData.filter(item => number === item.number)[0]
      if (target) {
        delete target.editable
        this.studentdata = newData
        this.cacheData = newData.map(item => ({ ...item }))
        //将修改的值传递给后端
        fixstudent({
          exam_id: this.exam_id,
          student_number: target['number'],
          type: target['type'],
          password: target['password']
        }).then(response => {
          if (!response.data.error) {
            this.$message.success('成功！')
           
          }
        })
      }
    },
    cancel: function(number) {
      const newData = [...this.studentdata]
      const target = newData.filter(item => number === item.number)[0]
      if (target) {
        Object.assign(target, this.cacheData.filter(item => number === item.number)[0])
        delete target.editable
        this.studentdata = newData
      }
    },

    addstudent: function() {
      this.visible = true
      this.updateAllStudentTable()
    },

    deletestudent: function() {
      var post = []

      if (this.selectedRowKeys.length != 0) {
       // const newdata = this.studentdata.filter(item => this.selectedRowKeys.includes(item.number)) //获取所有需要删除的id
        const newdata = this.selectedRowKeys //获取所有需要删除的id
        for (var i = 0; i < newdata.length; i++) {
          alert(newdata[i])
          post.push(newdata[i]) //设置传参为所有添加的id
        }
        const values = {
          stunums: post,
          exam: this.exam_id
        }
        deletestudent(values).then(response => {
          if (!response.data.error) {
            this.updateStudentTable()
            this.$message.success('删除成功')
            this.selectedRowKeys.splice(0,this.selectedRowKeys.length)
          }
        })
        
      } else {
        this.$message.error('请勾选要删除的学生')
      }
    },

    getcontent: function(){
      let res =[]
      var post = []
      let data = ' 学号, 姓名, 考试类型, 密码\n'
      if (this.selectedRowKeys.length != 0) {
       // const newdata = this.studentdata.filter(item => this.selectedRowKeys.includes(item.number)) //获取所有需要删除的id
        const newdata = this.selectedRowKeys //获取所有需要删除的id
        for (var i = 0; i < newdata.length; i++) {
          post.push(newdata[i]) //设置传参为所有添加的id
        }
        const values = {
          student_number: post,
          exam_id: this.exam_id
        }
          getallcontent(values).then(response => {
          if (!response.data.error) {
            res = response.data.stu_list
            for (let i = 0; i < res.length; ++i){
              let obj = res[i]
              data += obj.number + ',' + obj.name + ',' + obj.type + ',' + obj.password + '\n'
            }
            this.$message.success('获取成功')
          }
        })
        return data
      }
    },

    exportstu: function() {
      if (this.selectedRowKeys.length != 0) {
        let res =[]
        var post = []
        let data = ' 学号, 姓名, 考试类型, 密码\n'
        if (this.selectedRowKeys.length != 0) {
        // const newdata = this.studentdata.filter(item => this.selectedRowKeys.includes(item.number)) //获取所有需要删除的id
          const newdata = this.selectedRowKeys //获取所有需要删除的id
          for (var i = 0; i < newdata.length; i++) {
            post.push(newdata[i]) //设置传参为所有添加的id
          }
          const values = {
            student_number: post,
            exam_id: this.exam_id
          }
            getallcontent(values).then(response => {
            if (!response.data.error) {
              res = response.data.stu_list
              for (let i = 0; i < res.length; ++i){
                let obj = res[i]
                data += obj.number + ',' + obj.name + ',' + obj.type + ',' + obj.password + '\n'
              }
              this.$message.success('获取成功')
              var aTag = document.createElement('a')
                var blob = new Blob([data])
                aTag.download = '考试情况.csv'
                aTag.href = URL.createObjectURL(blob)
                aTag.click()
                URL.revokeObjectURL(blob)
                this.$message.success('导出成功')
            }
          })
        }
      }
     else {
        this.$message.error('请勾选要导出的学生')
      }
      //Stupid Code!!!
      this.selectedRowKeys.splice(0,this.selectedRowKeys.length)
      this.updateStudentTable()
    },

    handleOk: function() {
      var post = []
      if (this.selectedRowKeys_t.length != 0) {
        //const newdata = this.allstudentdata.filter(item => this.selectedRowKeys_t.includes(item.all_id))
        const newdata = this.selectedRowKeys_t
        for (var i = 0; i < newdata.length; i++) {
          post.push(newdata[i]) //设置传参为所有添加的id
        }
        const values = {
          number: post,
          exam_id: this.exam_id
        }
        addstudent(values).then(response => {
          if (!response.data.error) {
            this.selectedRowKeys_t.splice(0,this.selectedRowKeys_t.length)
            this.updateStudentTable()
            this.updateAllStudentTable()
            this.$message.success('添加成功')
          }
        })
      } else {
        this.$message.error('请勾选要添加的学生')
      }
    },
    handleCancel() {
      this.searchAllStudents = ''
      this.visible = false
      this.selectedRowKeys_t.splice(0,this.selectedRowKeys_t.length)
      this.updateAllStudentTable()
    },
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
