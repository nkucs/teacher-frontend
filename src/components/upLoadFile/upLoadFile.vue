<template>
  <a-upload :multiple="true" :fileList="fileList"
            name="file"
            :data="{fileType: 'zip'}"
            accept="*.zip"
            :withCredentials="true"
            action="//qqq.com/file" @change="uploadZip">
    <a-button>
      <a-icon type="upload" />
    </a-button>
  </a-upload>
</template>

<script>
    export default {
        data () {
            return {
                fileList: [],
                loadedFile: ''
            }
        },
        methods: {
          uploadZip (info) {
            let pos = info.file.name.lastIndexOf('.')
            let lastName = info.file.name.substring(pos, info.file.name.length)
            if (lastName.toLowerCase() === '.zip') {
              this.fileList = info.fileList.slice(-1)
              this.loadedFile = info.file
              let res = info.file.response
              if (res) {
                if (res.code === '0') {
                  this.$message.success('文件上传成功')
                } else {
                  this.$message.error(res.message)
                }
              }
            } else {
              this.$message.error('只能上传zip压缩包')
            }
          },
        }
    }
</script>
<style scoped>
</style>