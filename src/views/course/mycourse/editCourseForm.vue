<template>
  <div>
    <a href="JavaScript:void(0)" @click="inflate_edit_menu">编辑</a>
    <a-modal
      v-model="edit_visible"
      title="编辑课程"
      onOk="handleOk"
    >
      <template slot="footer">
        <a-button key="back" @click="handleCancel">返回
        </a-button>
        <a-button key="submit" @click="handleOk">
          修改
        </a-button>
      </template>
      <p>课程名称：&nbsp;&nbsp;<a-input style="width: 240px; display: inline-block"/></p>
      <p>开课教师：&nbsp;&nbsp;<a-input style="width: 240px; display: inline-block"/></p>
      <p>开始时间：&nbsp;&nbsp;<a-date-picker style="width: 180px; display: inline-block"/></p>
      <p>结束时间：&nbsp;&nbsp;<a-date-picker style="width: 180px; display: inline-block"/></p>
      <p style="display: inline-block">课程描述：&nbsp;&nbsp;</p>
      <p><a-textarea :rows="4" style="resize:none"/></p>
    </a-modal>
  </div>
</template>
<script>

export default {
  data() {
    return {
      edit_visible: false,
    }
  },
  methods: {
    inflate_edit_menu() {
      this.edit_visible = true
    },
    handleOk(e) {
      console.log(e)
      this.edit_visible = false
    },
    handleCancel(e)
    {
      console.log(e)
      this.edit_visible=false
    }
  }
}
</script>