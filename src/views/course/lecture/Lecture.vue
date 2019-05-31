<template>
  <div class="panel">
    <router-link :to="{path: '/course/details/createlecture', query:{courseID: courseID}}">
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
      <a-button id="searchBTN" type=primary @click="handleGetLectureByName">{{ searchBTNText }}</a-button>
      <a-button @click="handleResetLectures">{{ resetBTNText }}</a-button>
    </div>
    <a-divider class="divider" orientation="left" v-if="!dividerNote">{{ defaultDividerNote }}</a-divider>
    <a-divider class="divider" orientation="left" v-if="dividerNote">{{ dividerNote }}</a-divider>
    <a-table
      :columns="columns"
      :dataSource="lectureData"
      :pagination="pagination"
      @change="handlePageChange">
      <span slot="operation" slot-scope="record">
        <router-link :to="{ path: '/course/details/edit', query:{lecture_id: record.lecture_id}}" append>
          <a @click="() => editLecture(record.lecture_id)">{{ editLectureText }}</a>
        </router-link>
        <a-divider type="vertical" />
        <router-link :to="{ path: '/course/details/preview', query:{lecture_id: record.lecture_id}}" append>
          <a @click="() => previewLecture(record.lecture_id)">{{ previewLectureText }}</a>
        </router-link>
        <a-divider type="vertical" />
        <a-popconfirm 
          :title="confirmTitle" 
          @confirm="handleConfirmDelete(record.lecture_id)"
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
import { getMyLectures, getLectureByName, deleteLecture } from '@/api/lecture'

export default {
  inject: ['reload'],
  mounted() {
    this.courseID = this.$route.query.courseID
    this.getIndexPage()
  },
  data () {
    return {
      addLecture: '+ 新增课时',
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
      confirmTitle: '您确定要删除这个课时吗？',
      okText: '确定',
      cancelText: '取消',
      courseID: '',
      columns: [{
        title: '课时ID',
        dataIndex: 'lecture_id',
        align: 'center'
      }, {
        title: '课时名称',
        dataIndex: 'name',
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
      // lectureData: [
      //   {
      //     lecture_id: '1',
      //     lectureName: 'sdsd',
      //     lastModified: '111',
      //     createdAt: '0000'
      //   }
      // ],
      pagination: {
        total: 0
      }
    }
  },
  methods: {
    emitEmpty () {
      this.lectureName = ''
      this.$refs.lectureNameInput.focus()
    },
    handlePageChange (pagination) {
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      this.handleGetLectures({
        page: pagination.current,
        page_length: pagination.pageSize
      })
    },
    handleGetLectures (data = {}) {
      const that = this
      const lectureData = {
        ...data,
        course_id: this.courseID
      }
      getMyLectures(lectureData)
        .then(response => {
          that.lectureData = response.data.lectures
          that.pagination.total = response.data.total_counts})
        .catch(error => {
          console.log(error)
        })
    },
    handleGetLectureByName () {
      const that = this
      const lecname = this.lectureName
      const info = {
        name: lecname,
        course_id: this.courseID,
        page: this.pagination.current,
        page_length: this.pagination.pageSize
      }
      getLectureByName(info)
        .then(response => {
          that.lectureData = response.data.lectures
          that.pagination.total = response.data.total_counts
          const template = `显示课时名为"${lecname}"的查询结果`
          that.dividerNote = template
        }).catch(error => {
          console.log(error)
        })
    },
    handleConfirmDelete (lecture_id) {
      const that = this
      const info = {
        lecture_id: lecture_id
      }
      deleteLecture(info)
        .then(response => {
          console.log(response)
          that.reload()
        }).catch(error => {
          console.log(error)
        })
    },
    getIndexPage () {
      this.pagination.pageSize = 10
      this.pagination.current = 1
      this.handleGetLectures({
          page: this.pagination.current,
          page_length: this.pagination.pageSize
      })
    },
    cancelDelete () {
      console.log('Click on No for delete.')
    },
    handleResetLectures () {
      this.dividerNote = ''
      this.lectureName = ''
      this.getIndexPage()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#addBTN {
  margin-top: 2%;
  margin-bottom: 2%;
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
.panel {

}
</style>
