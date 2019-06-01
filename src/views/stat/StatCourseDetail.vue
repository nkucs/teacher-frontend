<template>
  <div>
    <a-tabs defaultActiveKey="1" @change="callback">
      <a-tab-pane tab="学生" key="1">
        <div style="margin-bottom: 5px">
          <a-input v-model="studentnumber" style="width: 44%" addonBefore="学号" />
          <a-input v-model="studentname" style="width: 43%" addonBefore="姓名" />
          <a-button type="primary" align="right" @click="seekstudent()">查询</a-button>
          <a-button align="right" @click="resetstudent()">重置</a-button>
        </div>
        <a-table :columns="columns1" :dataSource="data1"
        :pagination="studentPagination"
        @change="updatestudent">
        </a-table>
      </a-tab-pane>
      <a-tab-pane tab="题目" key="2">
        <div style="margin-bottom: 5px">
          <a-input v-model="problemname" style="width: 88%" addonBefore="题目名称" />
          <a-button type="primary" align="right" @click="seekproblem()">查询</a-button>
          <a-button align="right" @click="resetproblem()">重置</a-button>
        </div>
        <a-table :columns="columns2" :dataSource="data2"
        :pagination="problemPagination"
        @change="updateproblem">
        </a-table>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>

import {getmystudents, getmyproblems} from '@/api/course'
export default {
  data() {
    return {
      data1: [],
      data2: [],
      columns1: [{
          title: '姓名',
          dataIndex: 'name', 
      }, {
          title: '学号',
          dataIndex: 'number', 
      }, {
          title: '描述',
          dataIndex: 'description',
      }],
      columns2: [{
          title: '编号',
          dataIndex: 'id', 
      }, {
          title: '名称',
          dataIndex: 'name', 
      }, {
          title: '描述',
          dataIndex: 'description',
      }, {
          title: '分类',
          dataIndex: 'type',
      }],
      studentPagination: {
        defaultPageSize:1,
        total:0,
        current: 1
      },
      problemPagination: {
        defaultPageSize:1,
        total:0,
        current: 1
      },
      studentnumber: "",
      studentname: "",
      problemname: "",
      courseid: "",
    }
  },
  methods: {
    _updatestudent: function(pageindex){
        getmystudents({
            page:pageindex,
            page_length:this.studentPagination.defaultPageSize,
            student_number: this.studentnumber,
            student_name: this.studentname,
            course_id: this.courseid,
        }).then(response => {
            const pagination = {...this.studentPagination}
            pagination.total = parseInt(response.data.totalPages)
            pagination.current = parseInt(response.data.current)
            this.data1 = response.data.students
            this.studentPagination = pagination
        })
    },
    updatestudent: function(page, pagesize){
        this._updatestudent(page.current)
    },
    seekstudent: function(){
        this._updatestudent(1)
    },
    resetstudent: function(){
        this.studentnumber = ""
        this.studentname = ""
    },
    
    _updateproblem: function(pageindex){
        getmyproblems({
            page:pageindex,
            page_length:this.problemPagination.defaultPageSize,
            problem_name: this.problemname,
            course_id: this.courseid,
        }).then(response => {
            const pagination = {...this.problemPagination}
            pagination.total = parseInt(response.data.totalPages)
            pagination.current = parseInt(response.data.current)
            this.data2 = response.data.problems
            this.problemPagination = pagination
        })
    },
    updateproblem: function(page, pagesize){
        this._updateproblem(page.current)
    },
    seekproblem: function(){
        this._updateproblem(1)
    },
    resetproblem: function(){
        this.problemname = ""
    },
    
    callback: function(key){
        if (key == "1"){
            this.seekstudent()
        }
        else {
            this.seekproblem()
        }
    }
  },
  
  mounted: function(){
    this.courseid = parseInt(this.$route.query.id)
    this.seekstudent()
  }
}
</script>