<template>
  <div>
    <addCourse/>
    <div id="inputBox">
      <span id="inputTitle">{{ inputTitle }}</span>
      <a-input
        :placeholder="inputHint"
        v-model="lectureName"
        ref="lectureNameInput" >
        <a-icon slot="prefix" type="tag" />
        <a-icon id="emptyBTN" v-if="lectureName" slot="suffix" type="close" @click="emitEmpty" />
      </a-input>
      <a-button id="searchBTN" type=primary>{{ searchBTNText }}</a-button>
      <a-button>{{ resetBTNText }}</a-button>
    </div>
    <a-divider class="divider" orientation="left" v-if="!dividerNode">{{ defaultDividerNote }}</a-divider>
    <a-divider class="divider" orientation="left" v-if="dividerNode">{{ dividerNote }}</a-divider>
    <a-table
      :columns="columns"
      :dataSource="lectureData"
      :pagination="pagination"
      @change="handlePageChange">
      <span slot="operation" slot-scope="record">
        <a @click="() => editLecture(record.lectureID)">{{ editLectureText }}</a>
        <a-divider type="vertical" />
        <a @click="() => previewLecture(record.lectureID)">{{ previewLectureText }}</a>
        <a-divider type="vertical" />
        <a @click="() => deleteLecture(record.lectureID)">{{ deleteLectureText }}</a>
      </span>
    </a-table>
  </div>
</template>

<script>
import addCourse from '../../../components/course/addCourseForm'
export default {
  mounted() {
    this.getMyLectures()
  },
  components: {
    addCourse
  },
  data () {
    return {
      inputTitle: '课时名称:',
      inputHint: '请输入查询课时名字',
      lectureName: '',
      searchBTNText: '搜索',
      resetBTNText: '重置',
      dividerNote: '',
      defaultDividerNote: '默认显示全部课时',
      editLectureText: '编辑',
      deleteLectureText: '删除',
      previewLectureText: '预览',
      courseID: '',
      columns: [{
        title: '课时ID',
        dataIndex: 'lectureID',
        align: 'center'
      }, {
        title: '课时名称',
        dataIndex: 'lectureName',
        align: 'center'
      }, {
        title: '上次更新',
        dataIndex: 'lastModified',
        align: 'center'
      }, {
        title: '发布时间',
        dataIndex: 'createdAt',
        align: 'center'
      }, {
        title: '操作',
        key: 'operation',
        scopedSlots: { customRender: 'operation' },
        align: 'center'
      }],
      lectureData: [],
      pagination: {}
      // lectureData: [{
      //   lectureID: '1',
      //   lectureName: '二叉树',
      //   lastModified: '11/05/19',
      //   createdAt: '11/05/19'
      // }]
    }
  },
  methods: {
    showDetail (type) {
      if (type === 1) {
        return
      }
    },
    emitEmpty () {
      this.lectureName = ''
      this.$refs.lectureNameInput.focus()
    },
    editLecture (key) {
      console.log('edit key=',key)
    },
    previewLecture (key) {
      console.log('preview key=',key)
    },
    deleteLecture (key) {
      console.log('delete key=',key)
    },
    handlePageChange (pagination) {
      console.log('pagination', pagination)
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      console.log('pagination', pagination)
      this.getMyLectures({
        page: pagination.current,
        pageLength: pagination.pageSize,
        courseID: this.courseID
      })
    },
    getMyLectures (params = {}) {
      console.log('params:', params)
      var that = this
      this.$axios({
        method: 'post',
        url: '/lecture/AllLectures/',
        data: {
          courseID: this.courseID
        }
      }).then(response => {
        that.lectureData = response.data
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#addBTN {
  margin-top: 2%;
  margin-bottom: 2%;
  display: flex;
}
#inputTitle {
  width: 22%;
  margin-left: 15%;
  margin-right: 2%;
  font-size: 15px;
}
#inputBox {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 80%;
}
#searchBTN {
  margin-left: 2%;
  margin-right: 2%;
}
.divider {
  color: rgb(24, 144, 255);
  font-size: 14px;
  margin-top: 2%;
  margin-bottom: 2%;
}
</style>
