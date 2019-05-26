<template>
  <div>
    <input
      type="file"
      @change="importFile(this)"
      id="imFile"
      accept="zip"/>
    <el-button class="button" @click="uploadFile()">
      {{ upload }}
    </el-button>
  </div>
</template>

<script>
    export default {
        data () {
            return {
                upload: this.global.upload,
                fullscreenLoading: false,
                imFile: ''
            }
        },
        mounted () {
            this.imFile = document.getElementById('imFile')
        },
        methods: {
            uploadFile: function () {
                this.imFile.click()
            },
            importFile: function () {
                this.fullscreenLoading = true
                const obj = this.imFile
                if (!obj.files) {
                    this.fullscreenLoading = false
                    return
                }
            }
        }
    }
</script>
<style scoped> 
</style>