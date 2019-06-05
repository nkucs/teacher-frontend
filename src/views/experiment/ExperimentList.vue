<template>
  <div>
    <div class="before-title">
      {{ msg }}
    </div>
    <div class="title">
      <h1>{{ msg }}</h1>
    </div>

    <a-button
      @click="newLab"
    >
      新建实验
    </a-button>

    <div class="margin"></div>

    <a-table :dataSource="listData">
      <a-table-column
        title="实验ID"
        dataIndex="lab_id"
        key="lab_id"
      />
      <a-table-column
        title="实验名称"
        dataIndex="name"
        key="name"
      >
        <template slot-scope="text, record">
          <span>
            <a href="javascript:;" target="_blank" @click="toLab(record.lab_id)"> {{ record.name }} </a>
          </span>
        </template>
      </a-table-column>
      <a-table-column
        title="开始时间"
        dataIndex="start_time"
        key="start_time"
      />
      <a-table-column
        title="结束时间"
        dataIndex="end_time"
        key="end_time"
      />
      <a-table-column
        title="操作"
        key="action"
      >
        <template slot-scope="text, record">
          <span>
            <a href="javascript:;" target="_blank" @click="editLab(record.lab_id)">编辑</a>
            <a-divider type="vertical" />
            <a href="javascript:;" target="_blank" @click="performance(record.lab_id)">完成情况</a>
            <a-divider type="vertical" />
            <a href="javascript:;" target="_blank" @click="deleteLab(record.lab_id)">删除</a>
          </span>
        </template>
      </a-table-column>
    </a-table>

    <a-modal
      title="删除实验"
      :visible="visible"
      @ok="confirmDelete(curID)"
      :confirmLoading="confirmLoading"
      @cancel="cancelDelete"
    >
      <p> 是否确认删除实验{{ curID }}：{{ curName }}？ </p>
    </a-modal>

  </div>
</template>

<script>

import { deleteLab, getLabs } from '@/api/experiment'
export default {
  data () {
    return {
      msg: '实验列表',
      listData: [],
      courseID:0,
      visible: false,
      confirmLoading: false,
      curID: '',
      curName: '',
    }
  },

  methods: {
    newLab() {
      console.log(`进入新建实验页面`)
      this.$router.push({ path: `/experiment/new?course_id=${this.courseID}`})
    },

    showModal() {
      this.visible = true
    },

    confirmDelete(labId) {
      this.confirmLoading = true
      deleteLab({
        lab_id: labId,
      }).then(() => {
        console.log(`delete lab ${labId} successfully`)
        for (var item in this.listData) {
          if (this.listData[item].lab_id === labId) {
            console.log('find!!')
            this.listData.splice(item, 1)
            break
          }
        }
        this.visible = false
        this.confirmLoading = false
      }).catch((fail) => {
        alert('删除实验失败')
        console.log(fail)
        this.visible = false
        this.confirmLoading = false
      })
    },

    cancelDelete() {
      console.log('Clicked cancel button')
      this.visible = false
    },

    editLab(labId) {
      console.log(`进入实验${labId}的编辑页面`)
      this.$router.push({ path: `/experiment/edit/${labId}`})
    },

    performance(labId) {
      console.log(`进入实验${labId}的完成情况页面`)
      this.$router.push({ path: `/stat/problem/${labId}`})
    },

    toLab(labId) {
      console.log(`进入实验${labId}的详情页面`)
      this.$router.push({ path: `/experiment/detail/${labId}`})
    },

    deleteLab(labId) {
      const self = this
      console.log(`删除实验${labId}`)
      self.curID = labId
      for (var item in self.listData) {
        if (self.listData[item].lab_id === labId) {
          self.curName = self.listData[item].name
          break
        }
      }
      self.showModal()
    }
  },

  mounted() {
    const self = this
    let id, pages
    if (this.$route.params.id) {
      id = this.$route.params.id
    } else if (this.$route.query.courseID) {
      id = this.$route.query.courseID
    }

    self.courseID = id

    getLabs({
      course_id: id,
      page: 1
    })
    .then(response => {
      console.log(response)
      self.listData = response.data.labs
      pages = response.data.total_pages
      console.log('listData',self.listData)
      for (let i = 2; i <= pages; i++) {
        getLabs({
          course_id: id,
          page: i
        })
        .then(response => {
          console.log(response)
          self.listData = response.data.labs.reduce( function (coll, item) {
            coll.push(item)
            return coll
          }, self.listData)
        })
        .catch(fail => {
          console.log(fail)
          console.log('获取实验列表错误')
        })
      }
    })
    .catch(fail => {
      console.log(fail)
      console.log('无法获取实验列表')
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
  font-weight: normal;
  }
  ul {
  list-style-type: none;
  padding: 0;
  }
  li {
  display: inline-block;
  margin: 0 10px;
  }
  a {
  color: #42b983;
  }

  .custom-filter-dropdown {
    padding: 8px;
    border-radius: 4px;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .15);
  }

  .highlight {
    background-color: rgb(255, 192, 105);
    padding: 0px;
  }

  .margin {
    height: 15px;
  }
</style>