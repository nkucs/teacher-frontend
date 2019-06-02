<template>
  <div>    
    <h2 class="mainTitle">实验详情</h2>

    <a-form id="components-form-demo-validate-other" :form="form" @submit="handleSubmit">
      <a-form-item v-bind="formItemLayout" label="实验名称：">
        <a-input
          placeholder='请输入实验名称'
          v-decorator="['experiment-name', expNameConfig]"
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
    lab: {
      name:''
    },
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
    console.log('before create')
    console.log(this.$route.params.id)
    this.form = this.$form.createForm(this)
  },

  created(){
    this.selectedDataSource = []
    for (let i=0; i<10; i++) {
      this.selectedDataSource.push({
        key: i, // necessary
        id: i,
        name: 'problem ' + i,
        teacherName: 'teacher ' + i,
        tags: ['sort', 'recursion']
      })
    }
    getLab({
      lab_id: this.$route.params.id
    }).then(res => {
      console.log(res)
      this.lab = {
        name: res.data.name,
        description: res.data.description,
        startTime: moment(res.data.start_time).format('YYYY-MM-DD HH:mm:ss'),
        endTime: moment(res.data.end_time).format('YYYY-MM-DD HH:mm:ss'),
        files: res.data.files,
        reportRequired: res.data.report_required?'y':'n',
        attachmentWeight: 20,
    }
    })
  },

  methods: {
    getdata(){
      console.log('gw')
      getLabs({
        data:{   
            lab_id:'1'
        }
      }).then((Response)=>{
          console.log('start')
          //console.log(Response)
          Labs=Response.data
          console.log(Labs)
          console.log('end')
        })
        }
  },
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

.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}

.inlineClass .ant-input {
  width: 180px;
  margin: 0 8px 8px 0;
}

</style>