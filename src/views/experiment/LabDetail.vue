<template>
  <div>    
    <h2 class="mainTitle">实验详情</h2>

    <a-form id="components-form-demo-validate-other" :form="form" @submit="handleSubmit">
      <a-form-item v-bind="formItemLayout" label="实验名称：">
        <textview
          v-model="lab.name"
        />
      </a-form-item>

      <a-form-item v-bind="formItemLayout" label="实验描述：">
        <textview
          v-model="lab.description"
        />
      </a-form-item>

      <a-form-item v-bind="formItemLayout" label="实验附件">
        <!--all attachments-->
        <upLoadFile></upLoadFile>
      </a-form-item>

      <a-form-item v-bind="formItemLayout" label="练习题目">
        <a-table bordered :pagination="pagination" :dataSource="selectedDataSource" :columns="columns">
          <span slot="tags" slot-scope="tags">
            <a-tag v-for="tag in tags" color="blue" :key="tag">{{ tag }}</a-tag>
          </span>

        </a-table>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="开始时间：" :defaultValue="lab.startTime" :format="dateFormat">
        <a-date-picker 
          v-decorator="['start-date-time-picker', datePickerConfig]" 
          show-time
          format="YYYY-MM-DD HH:mm:ss"
          disabled="false" />
      </a-form-item>

      <a-form-item v-bind="formItemLayout" label="截止时间：" :defaultValue="lab.endTime" :format="dateFormat">
        <a-date-picker 
          v-decorator="['end-date-time-picker', datePickerConfig]" 
          show-time
          format="YYYY-MM-DD HH:mm:ss" 
          disabled="false"/>
      </a-form-item>

      <a-form-item v-bind="formItemLayout" label="是否提交实验报告：">
        <a-radio-group
          v-decorator="['radio-group', radioConfig]"
          disabled="false">
          <a-radio value="y" :checked="lab.reportRequired">
            是
          </a-radio>
          <a-radio value="n" :checked="!lab.reportRequired">
            否
          </a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
//import upLoadFile from '@/components/upLoadFile'
import moment from 'moment'
import {getLabs} from'@/api/experiment'
const selectedDataSource = []
for (let i=0; i<10; i++) {
    selectedDataSource.push({
        id: i,
        name: 'problem ' + i,
        teacherName: 'teacher ' + i,
        tags: ['sort', 'recursion']
    })
}
const allDataSource = []
const columnsWithFilter = [
  {
    title: 'id',
    dataIndex: 'id',
    sorter: (a, b) => (a.id).localeCompare((b.id)),
  }, 
  {
    title: '名称',
    dataIndex: 'name',
    width: '25%',
    sorter: (a, b) => (a.name).localeCompare(b.name),
  }, 
  {
    title: '教师',
    dataIndex: 'teacherName',
    width: '20%',
    sorter: (a, b) => (a.teacherName).localeCompare((b.teacherName)),
  }, 
  {
  title: '标签',
  key: 'tags',
  dataIndex: 'tags',
  width: '30%',
  scopedSlots: {
      customRender: 'tags',
    },
  }]

const columns =  [
  { 
    title: 'id',
    dataIndex: 'id',
  }, 
  {
    title: '名称',
    dataIndex: 'name',
    width: '25%',
  }, 
  {
    title: '教师',
    dataIndex: 'teacherName',
    width: '20%',
    
  }, 
  {
  title: '标签',
  key: 'tags',
  dataIndex: 'tags',
  scopedSlots: { customRender: 'tags' },
  width: '30%'
  },
]
  
const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  },
}

const buttonSetFormat = {
  wrapperCol: {
    span: 20,
    offset: 6
  }
}


export default {
  components: {

    //upLoadFile
  },

  data: () => ({
    // lab
    dateFormat: 'YYYY/MM/DD',
    lab: {},
    // layout related configuration
    formItemLayout,
    buttonSetFormat,
    confirmLoading: false,

    // search related 
    searchId: '',
    searchProblemName: '',
    searchTeacherName: '',
    searchTag: '',
    // table related configuration
    selectedDataSource,
    allDataSource,
    columns,
    columnsWithFilter,
    pagination: {
      defaultPageSize: 6
    },
    selectedRowKeys: [], 

    // tips and modal related configuration
    cancelModalText: '是否放弃编辑实验？！',
    submitModalText: '确认当前修改？', 
    cancelSubmitVisible: false,
    submitVisible: false,
    exerciseAdditionVisible: false,

    // final form content for submitting
    formValues: null,

  }),
  
  beforeCreate() {
    this.form = this.$form.createForm(this)
    this.lab = {
        name: 'a + b',
        description: 'calculate a + b',
        startTime: moment('2015/01/01','YYYY/MM/DD'),
        endTime: moment('2015/01/01','YYYY/MM/DD'),
        reportRequired: true
    }
    // 获取实验详情的 API 和 实验题目的 API
    // => lab {lab.name, lab.description, lab.startTime} 
    // => this.selectedDataSource
    // => this.allDataSource 
  },

  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0
    }
  },

  methods: {
    getdata(){
      console.log('gw')
      getLabs({
        data:{
          lab_id:2
        }
      }).then((Response)=>{
          console.log('start')
          console.log(Response)
          var Labs =Response.data
          console.log(Labs)
          console.log('end')
        })
    },

    onDelete (key) {
      const selectedDataSource = [...this.selectedDataSource]
      this.selectedDataSource = selectedDataSource.filter(item => item.key !== key)
    },
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    confirmAdd() {
      this.confirmLoading = true
      setTimeout(() => {
        this.exerciseAdditionVisible = false
        this.confirmLoading = false
        for (const key in this.selectedRowKeys) {
          const value = this.selectedRowKeys[key]
          const records = this.allDataSource.filter(item => item.key === value)
          this.selectedDataSource.push(records[0])
        }
      }, 500)
    },
    cancelAdd() {
      this.exerciseAdditionVisible = false
    },
    
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          // get values from form
          this.submitVisible = true
          this.formValues = values
        }
      })
    },
    confirmSubmit() {
      // upload and create a new lab with : this.formValues, this.selectedDataSource
      this.confirmLoading = true
      setTimeout(() => {
        this.submitVisible = false
        this.confirmLoading = false
        // 调用编辑实验的 API 并回到实验列表页面
        this.$router.push({path:'/experiment/list'})
      }, 500)
    },
    cancelSubmit() {
      this.submitVisible = false
    },

    handleCancel() {
      this.cancelSubmitVisible = true
    },
    confirmCancel() {
      this.confirmLoading = true
      setTimeout(() => {
        this.cancelSubmitVisible = false
        this.confirmLoading = false
        this.$router.push({path:'/experiment/list'})
      }, 500)
    },
    abandonCancel() {
      this.cancelSubmitVisible = false
    },
   
  },
  mounted(){
    this.getdata()
  }
  
}
</script>
<style scoped>
#components-form-demo-validate-other .dropbox {
  height: 180px;
  line-height: 1.5;
}

.mainTitle {
  margin-left: 10%;
}

.formButton {
  margin-right: 20px;
}

.custom-filter-dropdown {
  padding: 8px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .15);
}

.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}

.inlineClass .ant-input {
  width: 180px;
  margin: 0 8px 8px 0;
}

</style>