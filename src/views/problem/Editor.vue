<template>
    <div>
        <div ref="editor" style="text-align:left"></div>
        <button type="button" class="ant-btn ant-btn-primary" v-on:click="getContent" style="margin-top: 1%;">
       	 	<span>查看内容</span>
        </button>
    </div>
</template>

<script>
    import E from 'wangeditor'

    export default {
      name: 'editor',
      data () {
        return {
          editorContent: ''
        }
      },
      methods: {
        getContent: function () {
            alert(this.editorContent)
        }
      },
      mounted() {
        var editor = new E(this.$refs.editor)
        editor.customConfig.onchange = (html) => {
          this.editorContent = html
        }
        editor.create()
      }
    }
</script>

<style scoped>
</style>
