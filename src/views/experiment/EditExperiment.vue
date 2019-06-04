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
            <a-input v-model="searchId" placeholder="输入题目id" />
            <label>题目名称: </label>
            <a-input v-model="searchProblemName" placeholder="输入题目名称"/>
            <label>教师姓名: </label>
            <a-input v-model="searchTeacherName" placeholder="输入教师姓名" />
            <label>标签名: </label>
            <a-input v-model="searchTag" placeholder="输入标签名" />
            <a-button type="primary" @click="handleSearch">搜索</a-button>
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
import {getLab, editLab} from '@/api/experiment'
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
    searchId: '',
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
    lab_id: 14,
    lab_name: '',
    lab_description: '',
    lab_attachment_weight: 0,
    lab_report_required: 'y',
    lab_start_time: moment('2015/01/01','YYYY/MM/DD'),
    lab_end_time: moment('2015/01/01','YYYY/MM/DD')
  }),

  created() {
    this.form = this.$form.createForm(this)
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

    // 这里根据上面的 res 得到这个实验对应的 problem id
    for (let i=0; i<4; i++) {
        this.selectedDataSource.push({
          key: i, // necessary
          id: i,
          name: 'problem ' + i,
          teacherName: '刘明铭',
          tags: ['sort', 'tree']
        })
    }

    // 这里获取全部实验的 API 
    for (let i=0; i<30; i++) {
      this.allDataSource.push({
        key: i,
        id: i,
        name: 'problem' + i,
        teacherName: '刘明铭',
        tags: ['sort', 'tree']
      })
    }

    // 根据问题 id 初始化表格
    for (const key in this.selectedDataSource) {
      if (key in this.allDataSource) {
        this.selectedRowKeys.push(parseInt(key))
      }
    }
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
    handleSearch() {

    },
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    confirmAdd() {
      this.confirmLoading = true
      this.selectedDataSource = []
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
      editLab(labParams).then(function (res) {
        console.log('successfully edit a lab: ', res)
      }).catch(function (err) {
        console.log('fail to create a new lab: ', err)
      })

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
