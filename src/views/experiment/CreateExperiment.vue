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
      :visible="exerciseAdditionVisible" 
      @ok="confirmAdd" 
      :confirmLoading="confirmLoading"
      @cancel="cancelAdd">
    </a-modal>

    <a-form id="components-form-demo-validate-other" :form="form" @submit="handleSubmit">
      <a-form-item v-bind="formItemLayout" label="练习题目">
        <a-button class="editable-add-btn" @click="handleAdd">添加</a-button>
        <a-table bordered :pagination="pagination" :dataSource="selectedDataSource" :columns="columns">
          <!--在 a-table 中定义的名为 operation 的 slot,  text 表示当前行值，record 表示当前行数据的对象，对象包含列属性的键值对 -->
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
import EditableCell from './EditableCell'

const selectedDataSource = [];
for (let i = 0; i < 5; i++) {
  selectedDataSource.push({
    key: i,
    id: i,
    name: 'a + b',
    teacherName: 'Teacher no. ' + i,
    tags: ['nice', 'developer'],
  })
}
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
    width: "20%"
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
  export default {
    components: {
      EditableCell
    },
    data: () => ({
      formItemLayout: {
        labelCol: {
          span: 6
        },
        wrapperCol: {
          span: 14
        },
      },
      buttonSetFormat: {
        wrapperCol: {
          span: 20,
          offset: 6
        }
      },
      // {key: 自增, id: , name: , teacher_name: , tags: []}
      selectedDataSource,
      count: 2,
      columns,
      pagination: {
        defaultPageSize: 6
      },
      datePickerConfig: {
        rules: [{
          type: 'object',
          required: true,
          message: '请选择时间！'
        }]
      },
      radioConfig: {
        rules: [{
          required: true,
          message: '请确定是否需要提交实验报告！'
        }]
      },
      formValues: null,
      cancelModalText: '是否放弃新建实验？如果放弃所填数据将会丢失！',
      submitModalText: '确认新建实验？', 
      cancelSubmitVisible: false,
      submitVisible: false,
      exerciseAdditionVisible: false,
      confirmLoading: false,

    }),
    
    beforeCreate() {
      this.form = this.$form.createForm(this)
    },

    methods: {
      addExercises() {
        this.exerciseAdditionVisible = true
      },
      onCellChange (key, dataIndex, value) {
        const selectedDataSource = [...this.selectedDataSource]
        const target = selectedDataSource.find(item => item.key === key)
        if (target) {
          target[dataIndex] = value
          this.selectedDataSource = selectedDataSource
        }
    },
    onDelete (key) {
      const selectedDataSource = [...this.selectedDataSource]
      this.selectedDataSource = selectedDataSource.filter(item => item.key !== key)
    },
    handleAdd () {
      const { count, selectedDataSource } = this
      const newData = {
        key: count,
        name: `Edward King ${count}`,
        age: 32,
        address: `London, Park Lane no. ${count}`,
      }
      this.selectedDataSource = [...selectedDataSource, newData]
      this.count = count + 1
    },



      handleCancel() {
        this.cancelSubmitVisible = true
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
      confirmAdd() {
        this.confirmLoading = true
        setTimeout(() => {
          this.exerciseAdditionVisible = false
          this.confirmLoading = false
        }, 500)
      },

      cancelAdd() {
        this.exerciseAdditionVisible = false
      },

      confirmSubmit() {
        // 开始上传数据
        console.log(this.formValues)
        this.confirmLoading = true
        setTimeout(() => {
          this.submitVisible = false
          this.confirmLoading = false
        }, 500)
      },

      cancelSubmit() {
        console.log('check again')
        this.submitVisible = false
      },

      confirmCancel() {
        this.confirmLoading = true
        setTimeout(() => {
          this.cancelSubmitVisible = false
          this.confirmLoading = false
        }, 500)
      },
      abandonCancel() {
        this.cancelSubmitVisible = false
      },
    },
  }
</script>
<style>
  #components-form-demo-validate-other .dropbox {
    height: 180px;
    line-height: 1.5;
  }

  .formButton {
    margin-right: 20px;
  }

  .editable-cell {
  position: relative;
}

.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  padding-right: 24px;
}

.editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
}

.editable-cell-icon,
.editable-cell-icon-check {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
}

.editable-cell-icon {
  line-height: 18px;
  display: none;
}

.editable-cell-icon-check {
  line-height: 28px;
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}

.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
  color: #108ee9;
}

.editable-add-btn {
  margin-bottom: 8px;
}
</style>