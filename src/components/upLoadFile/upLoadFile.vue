<template>
  <a-upload
    :multiple="true"
    :fileList="fileList"
    name="file"
    :data="{fileType: 'zip'}"
    accept="*.zip"
    :withCredentials="true"
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    @change="uploadZip">
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
            const fileList = [...info.fileList]
            const pos = info.file.name.lastIndexOf('.')
            const lastName = info.file.name.substring(pos, info.file.name.length)
            if (lastName.toLowerCase() === '.zip') {
              this.loadedFile = info.file
              const res = info.file.response
              if (res) {
                if (res.code === '0') {
                  this.$message.success('文件上传成功')
                } else {
                  this.$message.error(res.message)
                }
              }
            } else {
              fileList.pop()
              this.$message.error('只能上传zip压缩包')
            }
            this.fileList = fileList
          },
        }
    }
</script>
<style scoped>
</style>