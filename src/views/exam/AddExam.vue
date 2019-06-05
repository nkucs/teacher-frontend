  <template>
  <div>
    <a-button type="primary" @click="showModal">+ 新增考试</a-button>
    <a-modal
      title="新建考试"
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      :destroyOnClose="true"
    >
    <a-form :form="form">
        <a-form-item label="考试名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="[
              'name',
              {rules: [{ required: true, message: '请输入考试名称' }]}
            ]"
            placeholder="请输入考试名称"
          />
        </a-form-item>
        <a-form-item label="开始时间" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
             <a-date-picker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="Select Time"
                v-decorator="['startTime', {rules: [{ type: 'object', required: true, message: 'Please select time!' }]}]"
                />
        </a-form-item>
        <a-form-item label="结束时间" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
             <a-date-picker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="Select Time"
                v-decorator="['endTime', {rules: [{ type: 'object', required: true, message: 'Please select time!' }]}]"
                />
        </a-form-item>
        <a-form-item label="考试描述" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-textarea
            v-decorator="[
              'description',
              {rules: [{ required: true, message: '请输入考试描述' }]}
            ]"
            placeholder="请输入考试描述"
            :rows="6"
          />
        </a-form-item>

        <a-form-item label="考试语言" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-select
              style="width: 120px"
              @change="handleChange"
              v-decorator="[
                'language',
                {rules: [{ required: true, message: '请选择语言' }]}
              ]"
            >
            <!-- 位加载：c++可以 java可以 c不行 python3不行 1100=12 -->
            <a-select-option value="0">无</a-select-option>
            <a-select-option value="1">java(jdk 1.8)</a-select-option>
            <a-select-option value="2">c(gcc)</a-select-option>
            <a-select-option value="3">c++(g++)</a-select-option>
            <a-select-option value="4">python3(python3.6)</a-select-option>
          </a-select>
        </a-form-item>

         <a-form-item
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
          label="试卷个数"
        >
         <a-select
         v-decorator="[form['examPage'], {rules: [{ required: true, message: 'Please select page!' }]}]"
         v-model="examPage"
         @change="changePaperCount">
            <a-select-option v-for="item in 10" :key="item">
              {{item}}
            </a-select-option>
        </a-select>
        </a-form-item>

        <a-tabs type="editable-card" >
          <a-tab-pane
            v-for="pane in examPages"
            :tab="pane.name"
            :key="pane.key"
            :closable="false"
            >
            <AddPaper :examProblems="allExamProblems[pane.key]"></AddPaper>
          </a-tab-pane>
        </a-tabs>

      </a-form>
    </a-modal>
  </div>
</template>
<script>
import {
  addexam
} from '@/api/exam'
import AddPaper from './AddPaper'
export default {
  data() {
    return {
      courseid: 1,
      visible: false,
      confirmLoading: false,
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
      beginTime: new Date().toLocaleDateString(),
      endTime: new Date().toLocaleDateString(),
      valueFromParent: '',
      examPage: '',
      examPages: [],
      allExamProblems: []
    }
  },

  props: ['parentToChild'],
  components: {
    AddPaper,
  },
  methods: {
    changePaperCount() {
      this.examPages = []
      this.allExamProblems = []
      for (let i = 0; i < this.examPage; ++i) {
        this.examPages.push({
          key: i + 1,
          name: '第 ' + (i + 1) + ' 张试卷'
        })
      }
      for (let i = 0; i <= this.examPage; ++i) {
        this.allExamProblems.push([])
      }
    },
    showModal() {
      this.visible = true
      this.changePaperCount()
    },
    handleOk(e) {
      // 提交数据
      console.log(this.allExamProblems)
      this.confirmLoading = true
      e.preventDefault()
      this.form.validateFields((err, fieldsValue) => {
        if (err) {
          this.confirmLoading = false
          this.$message.warning('创建失败！')
          return
        }
        const values = {
          ...fieldsValue,
          'courseid': this.valueFromParent,
          'name': fieldsValue['name'],
          'startTime': fieldsValue['startTime'],
          'endTime': fieldsValue['endTime'],
          'description': fieldsValue['description'],
          'language': fieldsValue['language'],
          'examPage': this.allExamProblems
        }
        // 数据提交成功
        const that = this
        addexam(values).then(res => {
          if (!res.data.error) {
            console.log(values)
            that.visible = false
            that.confirmLoading = false
            that.$message.success('创建成功！')
            that.$emit('fflush', null)
          } else {
            this.$message.warning('创建失败！')
          }
        })
      })
    },
    handleCancel() {
      this.visible = false
    },
  },
  created() {
    this.valueFromParent = this.parentToChild
  }
}
</script>
