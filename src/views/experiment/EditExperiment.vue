<template>
  <div>
    <a-modal
      title="确认取消"
      :visible="cancelSubmitVisible"
      @ok="confirmCancel"
      :confirmLoading="confirmLoading"
      @cancel="abandonCancel">
      <p>{{ cancelModalText }}</p>
    </a-modal>

    <a-modal
      title="确认修改"
      :visible="submitVisible"
      @ok="confirmSubmit"
      :confirmLoading="confirmLoading"
      @cancel="cancelSubmit">
      <p>{{ submitModalText }}</p>
    </a-modal>

    <a-modal
      title="添加练习题目"
      width="80%"
      :visible="exerciseAdditionVisible"
      @ok="confirmAdd"
      :confirmLoading="confirmLoading"
      @cancel="cancelAdd">
      <div>
        <div style="margin-bottom: 16px">
          <span style="margin-bottom: 16px">
            <template v-if="hasSelected">
              {{ `Selected ${selectedRowKeys.length} items` }}
            </template>
            <template v-else>
              {{ `Selected 0 items` }}
            </template>
          </span>
          <div class="inlineClass" >
            <label>题目id: </label>
            <a-input v-model="searchCode" placeholder="输入题目id" />
            <label>题目名称: </label>
            <a-input v-model="searchProblemName" placeholder="输入题目名称"/>
            <label>教师姓名: </label>
            <a-input v-model="searchTeacherName" placeholder="输入教师姓名" />
            <label>标签名: </label>
            <a-input v-model="searchTag" placeholder="输入标签名" />
            <a-button type="primary" @click="search">搜索</a-button>
          </div>
        </div>
        <a-table
          bordered
          :pagination="pagination"
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
          :columns="columnsWithFilter"
          :dataSource="allDataSource">

          <span slot="tags" slot-scope="tags">
            <a-tag v-for="tag in tags" color="blue" :key="tag">{{ tag }}</a-tag>
          </span>

        </a-table>
      </div>
    </a-modal>

    <h2 class="mainTitle">编辑实验</h2>

    <a-form id="components-form-demo-validate-other" :form="form" @submit="handleSubmit">
      <a-form-item v-bind="formItemLayout" label="实验名称：">
        <a-input
          placeholder='请输入实验名称'
          v-decorator="['name', {
            initialValue: lab_name,
            rules: [
              {
                required: true,
                message: '实验名称不能为空'
              }
            ]
          }]"
        />
      </a-form-item>

      <a-form-item v-bind="formItemLayout" label="实验描述：">
        <a-input
          placeholder='请输入实验描述'
          v-decorator="['description', {
            initialValue: lab_description,
            rules: [
              {
                required: true,
                message: '实验描述不能为空'
              }
            ]
          }]"
        />
      </a-form-item>

      <a-form-item v-bind="formItemLayout" label="实验附件">
        <upLoadFile></upLoadFile>
      </a-form-item>

      <a-form-item v-bind="formItemLayout" label="练习题目">
        <a-button class="editable-add-btn" @click="handleAdd">添加</a-button>
        <a-table bordered :pagination="pagination" :dataSource="selectedDataSource" :columns="columns">
          <template slot="operation" slot-scope="text, record">
            <a-popconfirm
              v-if="selectedDataSource.length"
              title="确认删除吗?"
              @confirm="() => onDelete(record.key)">
              <a href="javascript:;">Delete</a>
            </a-popconfirm>
          </template>

          <span slot="tags" slot-scope="tags">
            <a-tag v-for="tag in tags" color="blue" :key="tag">{{ tag }}</a-tag>
          </span>

        </a-table>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="开始时间：" >
        <a-date-picker
          v-decorator="['start_time',{
            initialValue: lab_start_time,
            rules: [{
              type: 'object',
              required: true,
              message: '请选择时间！'
            }]
          }]"
          show-time
          format="YYYY-MM-DD HH:mm:ss" />
      </a-form-item>

      <a-form-item v-bind="formItemLayout" label="截止时间：">
        <a-date-picker
          v-decorator="['end_time', {
            initialValue: lab_end_time,
            rules: [{
              type: 'object',
              required: true,
              message: '请选择时间！'
            }]
          }]"
          show-time
          format="YYYY-MM-DD HH:mm:ss" />
      </a-form-item>

      <a-form-item v-bind="formItemLayout" label="是否提交实验报告：">
        <a-radio-group
          v-decorator="['report_required', {
            initialValue: lab_report_required,
            rules: [{
              required: true,
              message: '请确定是否需要提交实验报告！'
            }]
          }]">
          <a-radio value="y">
            是
          </a-radio>
          <a-radio value="n">
            否
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        v-bind="formItemLayout"
        label="实验报告权重"
      >
        <a-input-number
          v-decorator="['attachment_weight',{
            initialValue: lab_attachment_weight
          }]"
          :min="1"
          :max="100"
        />
        <span class="ant-form-text">
          %
        </span>
      </a-form-item>
      <a-form-item v-bind="buttonSetFormat">
        <a-button class="formButton" @click="handleCancel">
          取消
        </a-button>
        <a-button class="formButton" type="primary" html-type="submit">
          完成
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import {getLab, editLab, getProblems, filterProblems} from '@/api/experiment'
import upLoadFile from '@/components/upLoadFile'
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
  components: {
    upLoadFile
  },

  data: () => ({
    // lab
    dateFormat: 'YYYY/MM/DD',
    // layout related configuration
    formItemLayout,
    buttonSetFormat,
    confirmLoading: false,

    // search related
    searchCode: '',
    searchProblemName: '',
    searchTeacherName: '',
    searchTag: '',
    // table related configuration
    selectedDataSource: [],
    allDataSource: [],
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
    lab_id: 13,
    lab_name: '',
    lab_description: '',
    lab_attachment_weight: 0,
    lab_report_required: 'y',
    lab_start_time: moment('2015/01/01','YYYY/MM/DD'),
    lab_end_time: moment('2015/01/01','YYYY/MM/DD'),
    courseId: '',
  }),

  mounted() {
    console.log('query', this.$route.query)
    this.courseId = this.$route.query.course_id
    this.form = this.$form.createForm(this)
    this.search()
    // 从 url 中获取实验 id 
    this.lab_id = this.$route.params.id
    const parameter = {
      lab_id: this.lab_id
    }
    // 获取实验 API 
    getLab(parameter).then( res => {
        console.log(`successfully get lab ${parameter.lab_id} `, res)
        this.lab_name = res.data.name
        this.lab_description = res.data.description
        this.lab_attachment_weight = res.data.attachment_weight
        this.lab_report_required = res.data.report_required === true ? 'y' : 'n' 
        this.lab_start_time = moment(res.data.start_time)
        this.lab_end_time = moment(res.data.end_time)
      }).catch(function (err) {
        console.log(`fail to get lab ${this.lab_id}: `, err)
    })

    getProblems(parameter).then(response => {
      const problems = response.data.problems
      for (let i=0; i<problems.length; i++) {
        const pro = problems[i]
        this.selectedDataSource.push({
          key: pro.code,
          id: pro.code,
          name: pro.name,
          teacherName: response.data.teacher_names[i],
          tags: response.data.tag_names[i]
        })
      }

      // 根据问题 id 初始化表格
    for (const key in this.selectedDataSource) {
      this.selectedRowKeys.push(this.selectedDataSource[key].key)
    }
    console.log('初始化后的 selectedRowKeys 值：', this.selectedRowKeys)

    }).catch(err => {
      console.log(`fail to get problems for lab ${this.lab_id}`, err)
    })
  },

  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0
    }
  },

  methods: {
    onDelete (key) {
      const selectedDataSource = [...this.selectedDataSource]
      const selectedRowKeys = [...this.selectedRowKeys]
      this.selectedDataSource = selectedDataSource.filter(item => item.key !== key)
      this.selectedRowKeys = selectedRowKeys.filter(item => item !== key)
    },
    handleAdd () {
      this.exerciseAdditionVisible = true
    },
    
    search() {
      console.log('search all datasource')
      const self = this
      self.allDataSource = []
      filterProblems({
        code: self.searchCode,
        page: 1,
        tag_name: self.searchTag,
        problem_name: self.searchProblemName,
        teacher_name: self.searchTeacherName
      })
    .then(response => {
      console.log('返回搜索到的题目结果是：', response)
      // 初始化 table 中的数据
      for(let i=0; i<response.data.problems.length; i++) {
        const pro = response.data.problems[i]
        self.allDataSource.push({
          key: pro.code,
          id: pro.code,
          name: pro.name,
          teacherName: response.data.teacher_names[i],
          tags: response.data.tag_names[i]
        })
      }
      const pages = response.data.total_pages
      for (let i = 2; i <= pages; i++) {
        filterProblems({
            code: self.searchCode,
            page: i,
            tag_name: self.searchTag,
            problem_name: self.searchProblemName,
            teacher_name: self.searchTeacherName
        })
        .then(response => {
          console.log(response)
          for(let i=0; i<response.data.problems.length; i++) {
            const pro = response.data.problems[i]
            self.allDataSource.push({
              key: pro.code,
              id: pro.code,
              name: pro.name,
              teacherName: response.data.teacher_names[i],
              tags: response.data.tag_names[i]
            })
          }
        })
        .catch(fail => {
          console.log(fail)
          console.log('获取题目列表错误')
        })
      }
    })
    .catch(fail => {
      console.log(fail)
      console.log('无法获取题目列表')
    })
    },

    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },

    confirmAdd() {
      console.log('确定添加，this.selectedRowKeys :', this.selectedRowKeys)
      this.confirmLoading = true
      setTimeout(() => {
        this.exerciseAdditionVisible = false
        this.confirmLoading = false
        const currentSelected = []
  
        for (const key in this.selectedRowKeys) {
          const value = this.selectedRowKeys[key]
          let records = this.allDataSource.filter(item => item.key === value)
          if (records.length === 0) {
            records = this.selectedDataSource.filter(item => item.key === value)
          }
          currentSelected.push(records[0])
        }
        this.selectedDataSource = currentSelected
        console.log('已选择题目：', this.selectedDataSource)
      }, 500)
    },
    
    cancelAdd() {
      this.exerciseAdditionVisible = false
    },

    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.submitVisible = true
          this.formValues = values
        }
      })
    },
    confirmSubmit() {
      // upload and edit this lab with : this.formValues, this.selectedDataSource
      this.confirmLoading = true
      // 调用编辑实验的 API
      this.formValues.lab_id = this.lab_id
      this.formValues.start_time = this.formValues.start_time.format('YYYY-MM-DD HH:mm:ss')
      this.formValues.end_time = this.formValues.end_time.format('YYYY-MM-DD HH:mm:ss')
      this.formValues.problems = this.selectedDataSource
      
      const labParams = {...this.formValues}
      editLab(labParams).then((res) => {
        console.log('successfully edit a lab: ', res)
        this.submitVisible = false
        this.confirmLoading = false
        
        // 调用编辑实验的 API 并回到实验列表页面
        this.$router.push({path:`/course/details?courseID=${this.courseId}`})
      }).catch(function (err) {
        console.log('fail to create a new lab: ', err)
      })

      setTimeout(() => {
        
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
        this.$router.push({path:`/course/details?courseID=${this.courseId}`})
      }, 500)
    },
    abandonCancel() {
      this.cancelSubmitVisible = false
    },
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
