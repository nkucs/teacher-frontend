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
          v-decorator="['experiment-name', expNameConfig]"
        />
      </a-form-item>

      <a-form-item v-bind="formItemLayout" label="实验描述：">
        <a-input
          placeholder='请输入实验描述'
          v-decorator="['experiment-description',expDescriptionConfig]"
        />
      </a-form-item>

      <a-form-item v-bind="formItemLayout" label="实验附件">
        <!--all attachments-->
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
          v-decorator="['start-date-time-picker', startDatePickerConfig]"
          show-time
          format="YYYY-MM-DD HH:mm:ss" />
      </a-form-item>

      <a-form-item v-bind="formItemLayout" label="截止时间：">
        <a-date-picker
          v-decorator="['end-date-time-picker', endDatePickerConfig]"
          show-time
          format="YYYY-MM-DD HH:mm:ss" />
      </a-form-item>

      <a-form-item v-bind="formItemLayout" label="是否提交实验报告：">
        <a-radio-group v-decorator="['radio-group', radioConfig]">
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
          v-decorator="['input-number', weightConfig]"
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
    columns,
    columnsWithFilter,
    pagination: {
      defaultPageSize: 6
    },

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
    // 获取实验详情的 API 和 所有实验题目的 API
    // => lab {lab.name, lab.description, lab.start_time, lanb.end_time, lab.exercises[], lab.reportRequired,}
    // this.selectedDataSource
    // 获取所有实验题目的 API
    // => this.allDataSource
    this.lab = {
        name: 'a + b',
        description: 'calculate a + b',
        attachment_weight: 80,
        problem_weight: 20,
        start_time: moment('2015/01/01','YYYY/MM/DD'),
        end_time: moment('2015/01/01','YYYY/MM/DD'),
        reportRequired: 'y',

    }

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

    this.allDataSource = []
    for (let i=0; i< 20; i+=2) {
      this.allDataSource.push({
        key: i, // necessary
        id: i,
        name: 'problem ' + i,
        teacherName: 'teacher ' + i,
        tags: ['sort', 'recursion']
      })
    }

    this.selectedRowKeys = []
    for (const key in this.selectedDataSource) {
      if (key in this.allDataSource) {
        this.selectedRowKeys.push(key)
      }
    }

    this.expNameConfig = {
      initialValue: this.lab.name,
      rules: [
        {
          required: true,
          message: '实验名称不能为空'
        }
      ]
    }

    this.expDescriptionConfig = {
      initialValue: this.lab.description,
      rules: [
        {
          required: true,
          message: '实验描述不能为空'
        }
      ]
    }

    this.startDatePickerConfig = {
      initialValue: this.lab.start_time,
      rules: [{
        type: 'object',
        required: true,
        message: '请选择时间！'
      }]
    }

    this.endDatePickerConfig = {
      initialValue: this.lab.end_time,
      rules: [{
        type: 'object',
        required: true,
        message: '请选择时间！'
      }]
    }

    this.radioConfig = {
      initialValue: this.lab.reportRequired,
      rules: [{
        required: true,
        message: '请确定是否需要提交实验报告！'
      }]
    }

    this.weightConfig = {
      initialValue: this.lab.attachment_weight
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
      this.selectedDataSource = selectedDataSource.filter(item => item.key !== key)
    },
    handleAdd () {
      // 调用获取全部练习题目的 API => this.allDataSource
      this.exerciseAdditionVisible = true
    },
    handleSearch() {
      // 调用根据题目ID, 题目名称, 教师姓名，题目标签搜索题目的 API => this.allDataSource
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
