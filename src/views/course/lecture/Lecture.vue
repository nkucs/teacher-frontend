<template>
  <div>
    <router-link :to="{path: '/course/createlecture', query:{courseID: courseID}}">
      <a-button id="addBTN" type=primary>{{ addLecture }}</a-button>
    </router-link>
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
        <router-link :to="{ path: 'edit'}" append>
          <a @click="() => editLecture(record.lectureID)">{{ editLectureText }}</a>
        </router-link>
        <a-divider type="vertical" />
        <router-link :to="{ path: 'preview'}" append>
          <a @click="() => previewLecture(record.lectureID)">{{ previewLectureText }}</a>
        </router-link>
        <a-divider type="vertical" />
        <a-popconfirm 
          :title="confirmTitle" 
          @confirm="handleConfirmDelete(record.lectureID)"
          @cancel="cancelDelete"
          :okText="okText"
          :cancelText="cancelText">
          <a href="#">{{ deleteLectureText }}</a>
        </a-popconfirm>
      </span>
    </a-table>
  </div>
</template>

<script>
import { getCookie } from '@/utils/util'
import { getMyLectures, getLectureByName, deleteLecture } from '@/api/lecture'

export default {
  mounted() {
    this.courseID = this.$route.query.courseID
    this.pagination.pageSize = 10
    this.pagination.current = 1
    this.handleGetLectures({
        page: this.pagination.current,
        page_length: this.pagination.pageSize
    })
  },
  data () {
    return {
      addLecture: '+ 新增课时',
      inputTitle: '课时名称:',
      inputHint: '请输入查询课时名字',
      lectureName: '',
      searchBTNText: '搜索',
      resetBTNText: '重置',
      dividerNode: false,
      dividerNote: '',
      defaultDividerNote: '默认显示全部课时',
      editLectureText: '编辑',
      deleteLectureText: '删除',
      previewLectureText: '预览',
      confirmTitle: '您确定要columns个课时吗？',
      okText: '确定',
      cancelText: '取消',
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
    }
  },
  methods: {
    emitEmpty () {
      this.lectureName = ''
      this.$refs.lectureNameInput.focus()
    },
    // editLecture (key) {
    //   console.log('edit key=',key)
    // },
    // previewLecture (key) {
    //   console.log('preview key=',key)
    // },
    // deleteLecture (key) {
    //   console.log('delete key=',key)
    // },
    handlePageChange (pagination) {
      console.log('pagination1', pagination)
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      console.log('pagination2', pagination)
      this.handleGetLectures({
        page: pagination.current,
        page_length: pagination.pageSize,
        courseID: this.courseID
      })
    },
    handleGetLectures (data = {}) {
      const that = this
      const sessionID = getCookie('sessionID')
      const lectureData = {
        ...data,
        course_id: this.courseID,
        session_id: sessionID
      }
      getMyLectures(lectureData)
        .then(response => {
          that.lectureData = response.data.lectures})
        .catch(error => {
          console.log(error)
        })
    },
    handleGetLectureByName (name) {
      const that = this
      getLectureByName(name)
        .then(response => {
          that.lectureData = response.data
        }).catch(error => {
          console.log(error)
        })
    },
    handleConfirmDelete (lectureID) {
      // console.log('delete lecture_id:', lectureID)
      deleteLecture(lectureID)
        .then(response => {
          console.log('del-lectures-response',response)
          this.HandleGetLectures()
        }).catch(error => {
          console.log(error)
        })
    },
    cancelDelete () {
      console.log('Click on No for delete.')
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
