<template>
  <div>
    <a-modal title="确认取消" :visible="cancelSubmitVisible" @ok="confirmCancel" :confirmLoading="confirmLoading"
      @cancel="abandonCancel">
      <p>{{cancelModalText}}</p>
    </a-modal>

    <a-modal title="确认新建" :visible="submitVisible" @ok="confirmSubmit" :confirmLoading="confirmLoading"
      @cancel="cancelSubmit">
      <p>{{submitModalText}}</p>
    </a-modal>

    <a-modal title="添加练习题目" :visible="exerciseAdditionVisible" @ok="confirmAdd" :confirmLoading="confirmLoading"
      @cancel="cancelAdd">
    </a-modal>

    <a-form id="components-form-demo-validate-other" :form="form" @submit="handleSubmit">
      <a-form-item v-bind="formItemLayout" label="练习题目">
        <a-button @click="addExercises">
          点击添加题目
        </a-button>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="开始时间：">
        <a-date-picker v-decorator="['start-date-time-picker', datePickerConfig]" show-time
          format="YYYY-MM-DD HH:mm:ss" />
      </a-form-item>

      <a-form-item v-bind="formItemLayout" label="截止时间：">
        <a-date-picker v-decorator="['end-date-time-picker', datePickerConfig]" show-time
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
  export default {
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
          message: "请确定是否需要提交实验报告！"
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
      this.form = this.$form.createForm(this);
    },
    methods: {
      addExercises() {
        this.exerciseAdditionVisible = true;
      },
      handleCancel() {
        this.cancelSubmitVisible = true;
      },
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            // get values from form
            this.submitVisible = true;
            this.formValues = values;
          }
        });
      },
      confirmAdd() {
        this.confirmLoading = true;
        setTimeout(() => {
          this.exerciseAdditionVisible = false;
          this.confirmLoading = false;
        }, 500);
      },

      cancelAdd() {
        this.exerciseAdditionVisible = false;
      },

      confirmSubmit() {
        // 开始上传数据
        console.log(this.formValues);
        this.confirmLoading = true;
        setTimeout(() => {
          this.submitVisible = false;
          this.confirmLoading = false;
        }, 500);
      },

      cancelSubmit() {
        console.log("check again");
        this.submitVisible = false;
      },

      confirmCancel() {
        this.confirmLoading = true;
        setTimeout(() => {
          this.cancelSubmitVisible = false;
          this.confirmLoading = false;
        }, 500);
      },
      abandonCancel(e) {
        this.cancelSubmitVisible = false
      },
    },
  };
</script>
<style>
  #components-form-demo-validate-other .dropbox {
    height: 180px;
    line-height: 1.5;
  }

  .formButton {
    margin-right: 20px;
  }
</style>