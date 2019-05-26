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
      title="确认新建"
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
              {{`Selected ${selectedRowKeys.length} items`}}
            </template>
            <template v-else>
              {{`Selected 0 items`}}
            </template>
          </span>
          <div class="inlineClass" >
            <label>题目id: </label>
            <a-input v-model="searchId" placeholder="输入题目id" />
            <label>题目名称: </label>
            <a-input v-model="searchProblemName" placeholder="输入题目名称" />
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
            <a-tag v-for="tag in tags" color="blue" :key="tag">{{tag}}</a-tag>
          </span>

        </a-table>
      </div>
    </a-modal>

    <a-form id="components-form-demo-validate-other" :form="form" @submit="handleSubmit">
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
            <a-tag v-for="tag in tags" color="blue" :key="tag">{{tag}}</a-tag>
          </span>

        </a-table>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="开始时间：">
        <a-date-picker 
          v-decorator="['start-date-time-picker', datePickerConfig]" 
          show-time
          format="YYYY-MM-DD HH:mm:ss" />
      </a-form-item>

      <a-form-item v-bind="formItemLayout" label="截止时间：">
        <a-date-picker 
          v-decorator="['end-date-time-picker', datePickerConfig]" 
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
      <a-form-item v-bind="buttonSetFormat">
        <a-button class="formButton" @click="handleCancel">
          取消
        </a-button>
        <a-button class="formButton" type="primary" html-type="submit">
          创建
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>

const selectedDataSource = [];
const allDataSource = [];
const columnsWithFilter = [
  { // 列描述对象， dataIndex 表示列数据在数据项中的 key 值，声明时和 key 取其一即可，
    title: 'id',
    dataIndex: 'id',
    sorter: (a, b) => (a.id).localeCompare((b.id)),
  }, 
  {
    title: '名称',
    dataIndex: 'name',
    width: "25%",
    sorter: true,
    sorter: (a, b) => (a.name).localeCompare(b.name),
  }, 
  {
    title: '教师',
    dataIndex: 'teacherName',
    width: "20%",
    sorter: (a, b) => (a.teacherName).localeCompare((b.teacherName)),
  }, 
  {
  title: '标签',
  key: 'tags',
  dataIndex: 'tags',
  width: "30%",
  scopedSlots: {
      customRender: 'tags',
    },
  }]

const columns =  [
  { // 列描述对象， dataIndex 表示列数据在数据项中的 key 值，声明时和 key 取其一即可，
    title: 'id',
    dataIndex: 'id',
  }, 
  {
    title: '名称',
    dataIndex: 'name',
    width: "25%",
  }, 
  {
    title: '教师',
    dataIndex: 'teacherName',
    width: "20%",
    
  }, 
  {
  title: '标签',
  key: 'tags',
  dataIndex: 'tags',
  scopedSlots: { customRender: 'tags' },
  width: "30%"
  },
  {
    title: 'operation',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
    width: "16%"
  }];
  
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

const datePickerConfig = {
  rules: [{
    type: 'object',
    required: true,
    message: '请选择时间！'
  }]
}

const radioConfig = {
  rules: [{
    required: true,
    message: '请确定是否需要提交实验报告！'
  }]
}

export default {
  data: () => ({
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

    // date picker related configuration
    datePickerConfig,
    radioConfig,

    // tips and modal related configuration
    cancelModalText: '是否放弃新建实验？如果放弃所填数据将会丢失！',
    submitModalText: '确认新建实验？', 
    cancelSubmitVisible: false,
    submitVisible: false,
    exerciseAdditionVisible: false,

    // final form content for submitting
    formValues: null,

  }),
  
  beforeCreate() {
    this.form = this.$form.createForm(this)
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
        for (let key in this.selectedRowKeys) {
          let value = this.selectedRowKeys[key]
          let records = this.allDataSource.filter(item => item.key === value)
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
        // 调用新建实验的 API
        // 跳转至实验列表界面
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
        // 跳转至实验列表页面 
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