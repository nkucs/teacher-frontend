<template>
  <div>

    <h2 class="mainTitle">编辑实验</h2>

    <a-form id="components-form-demo-validate-other" :form="form">
      <a-form-item v-bind="formItemLayout" label="实验名称：">
        {{ lab.name }}
      </a-form-item>

      <a-form-item v-bind="formItemLayout" label="实验描述：">
        {{ lab.description }}
      </a-form-item>

      <a-form-item v-bind="formItemLayout" label="实验附件">
        <ul>
          <li v-for="(item, index) in lab.files" :key="index">
            <a href="javascript:void(0);" @click="download(index)">{{ item.name }}</a>
          </li>
        </ul>
      </a-form-item>

      <a-form-item v-bind="formItemLayout" label="练习题目">
        <a-table bordered :pagination="pagination" :dataSource="selectedDataSource" :columns="columns">
          <span slot="tags" slot-scope="tags">
            <a-tag v-for="tag in tags" color="blue" :key="tag">{{ tag }}</a-tag>
          </span>
        </a-table>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="开始时间：" >
        {{ lab.startTime }}
      </a-form-item>

      <a-form-item v-bind="formItemLayout" label="截止时间：">
        {{ lab.endTime }}
      </a-form-item>

      <a-form-item v-bind="formItemLayout" label="是否提交实验报告：">
        {{ lab.reportRequired==="y"?"是":"否" }}
      </a-form-item>
      <a-form-item
        v-bind="formItemLayout"
        label="实验报告权重"
      >
        {{ lab.attachmentWeight }} %
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import moment from 'moment'
import { getLab, getSubmissionFile } from '@/api/experiment'

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
  {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
    width: '16%'
  }]

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
  data: () => ({
    // lab
    id: '',
    lab: '',
    // layout related configuration
    formItemLayout,
    buttonSetFormat,
    // table related configuration
    selectedDataSource: '',
    columns,
    columnsWithFilter,
    pagination: {
      defaultPageSize: 6
    },
  }),

  beforeCreate() {
    console.log('before create')
    console.log(this.$route.params.id)
    this.form = this.$form.createForm(this)
  },

  created(){
    this.id=this.$route.params.id
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
      lab_id: this.id
    }).then(res => {
      console.log(res)
      this.lab = {
        name: res.data.name,
        description: res.data.description,
        startTime: moment(res.data.start_time).format('YYYY-MM-DD HH:mm:ss'),
        endTime: moment(res.data.end_time).format('YYYY-MM-DD HH:mm:ss'),
        files: res.data.files,
        reportRequired: res.data.report_required?'y':'n',
        attachmentWeight: res.data.attachment_weight,
      }
    })
  },

  methods: {
    download(key){
      getSubmissionFile({
        attachment_id: this.lab.files[key].id
      }).then((response) => {
        console.log(response)
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', this.lab.files[key].name) //or any other extension
        document.body.appendChild(link)
        link.click()
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
