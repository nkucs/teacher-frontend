<template>
  <div>
    <div ref="editor" id="multi_editor" style="text-align:left"></div>
    <button class="ant-btn ant-btn-primary desc-btn" @click="setMessage">确定</button>
  </div>
</template>

<script>
  // import E from 'wangeditor'

  export default {
    name: 'Editor',
    data() {
      return {
        editorContent: ''
      }
    },
    methods: {
      setMessage: function() {
        alert(this.editorContent)
        this.$emit('transferMsg', this.editorContent)
      }
    },
    mounted() {
      var editor = new E(this.$refs.editor)
      editor.customConfig.onchange = (text) => {
        this.editorContent = text
      }
      editor.create()
    }
  }
</script>

<style scoped>
  .desc-btn {
    margin-top: 4px;
  }
</style>
