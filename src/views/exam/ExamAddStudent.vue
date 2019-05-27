<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-breadcrumb>
      <a-breadcrumb-item>首页</a-breadcrumb-item>
      <a-breadcrumb-item>
        <a href>考试中心</a>
      </a-breadcrumb-item>
      <a-breadcrumb-item>添加学生</a-breadcrumb-item>
    </a-breadcrumb>
    <a-layout class="page">
      <a-layout-header style="background: #fff; padding: 20">
        <div class="btn_list">
          <a-button type="primary" :size="size" @click="addstudent">添加学生</a-button>
          <a-modal title="添加考试学生" v-model="visible" @ok="handleOk" class="addstudent">
            <a-table
              :rowSelection="rowSelection_t"
              :columns="alltudent"
              :dataSource="alldata"
              rowKey="all_id"
            >
              <a slot="all_id" slot-scope="text" href="javascript:;">{{ text }}</a>
            </a-table>
          </a-modal>
          <a-button type="dashed" :size="size" @click="exportstu">导出csv</a-button>
          <a-button type="primary" :size="size" @click="deletestudent">删除学生</a-button>
        </div>
        <div class="search">
          <a-input-search
            placeholder="请输入学生学号或姓名"
            @search="onSearch"
            enterButton="Search"
            size="large"
          />
        </div>
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <!-- 页面表单部分 -->
        <div>
          <a-table
            :rowSelection="rowSelection"
            :columns="examstudent"
            :dataSource="examdata"
            rowKey="id"
          >
            <a slot="id" slot-scope="text" href="javascript:;">{{ text }}</a>
          </a-table>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import { randomBytes } from 'crypto'

const alltudent = [
  {
    title: 'ID',
    dataIndex: 'all_id',
    scopedSlots: { customRender: 'all_id' }
  },
  {
    title: 'Name',
    dataIndex: 'all_name'
  },
  {
    title: '班级',
    dataIndex: 'all_class'
  }
]
const alldata = []
for (let i = 0; i < 46; i++) {
  alldata.push({
    all_id: i * 10,
    all_name: i,
    all_class: i
  })
}

const examstudent = [
  {
    title: 'ID',
    dataIndex: 'id',
    scopedSlots: { customRender: 'id' }
  },
  {
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: '考试类型',
    dataIndex: 'type'
  },
  {
    title: '用户名',
    dataIndex: 'exam_id'
  },
  {
    title: '密码',
    dataIndex: 'key'
  }
]
const examdata = []
for (let i = 0; i < 46; i++) {
  examdata.push({
    id: i * 10,
    name: i,
    type: 'A',
    exam_id: i,
    key: randomBytes
  })
}
export default {
  data() {
    return {
      visible: false,
      examdata,
      alldata,
      examstudent,
      alltudent,
      selectedRowKeys: [],
      selectedRowKeys_t: []
    }
  },
  computed: {
    rowSelection() {
      return {
        onChange: selectedRowKeys => {
          this.selectedRowKeys = selectedRowKeys
        }
      }
    },
    rowSelection_t() {
      return {
        onChange: selectedRowKeys => {
          this.selectedRowKeys_t = selectedRowKeys
        }
      }
    }
  },
  methods: {
    addstudent() {
      this.visible = true
      // alert(`selectedRowKeys: ${this.selectedRowKeys[0]}`)
    },
    deletestudent() {
      if (this.selectedRowKeys[0] == '') {
        this.$message.success('删除成功')
      } else {
        this.$message.error('请勾选要删除的学生')
      }
    },
    exportstu() {
      if (this.selectedRowKeys[0] == '') {
        this.$message.success('导出成功')
      } else {
        this.$message.error('请勾选要导出的学生')
      }
    },

    handleOk() {
      if (this.selectedRowKeys_t[0] == '') {
        this.$message.success('添加成功')
      } else {
        this.$message.error('请勾选要添加的学生')
      }
    },

    onSearch(value) {
      console.log(value)
    },

    getallstudent: function() {}
  }
}
</script>
<style>
.ant-modal-content {
  width: 200%;
  position: absolute;
  border: 0;
  border-radius: 4px;
  background-clip: padding-box;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0) !important;
}

.addstudent {
  width: 600px;
}
.page {
  margin: 20px;
}
.btn_list {
  align-items: center;
  width: 40%;
  display: inline-block;
}
.search {
  width: 400px;
  float: right;
  display: inline-block;
}

#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>