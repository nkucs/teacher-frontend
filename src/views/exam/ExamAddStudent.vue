<template>
  <a-layout id="components-layout-demo-custom-trigger"> 
    <a-breadcrumb>
      <a-breadcrumb-item>首页</a-breadcrumb-item>
      <a-breadcrumb-item><a href="">考试中心</a></a-breadcrumb-item>
      <a-breadcrumb-item>添加学生</a-breadcrumb-item>
    </a-breadcrumb>
    <a-layout class="page">
      <a-layout-header style="background: #fff; padding: 20">
        <div class="btn_list">
          <a-button type="primary" :size="size">添加学生</a-button>
          <a-button type="dashed" :size="size">导出csv</a-button>
          <a-button type="primary" :size="size">删除学生</a-button>
        </div>
        <div class="search">
          <a-input-search placeholder="input search text" @search="onSearch" enterButton="Search" size="large" />
        </div>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
        <!-- 页面表单部分 -->
        <div>
          <div style="margin-bottom: 16px">
            <a-button
              type="primary"
              @click="start"
              :disabled="!hasSelected"
              :loading="loading"
            >
              Reload
            </a-button>
            <span style="margin-left: 8px">
              <template v-if="hasSelected">
                {{ `Selected ${selectedRowKeys.length} items` }}
              </template>
            </span>
          </div>
          <a-table :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :columns="columns" :dataSource="data" />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import { randomBytes } from 'crypto'
const columns = [{
  title: '姓名',
  dataIndex: 'name',
}, {
  title: 'ID',
  dataIndex: 'id',
}, {
  title: '试卷',
  dataIndex: 'exam',
}, {
  title: '考试账号',
  dataIndex: 'examid',
},
 {
  title: '密码',
  dataIndex: 'key',
 }
]
const data = []
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    id: `Edward King ${i}`,
    exam: 'A',
    examid :i,
    key: (randomBytes),
  })
}

export default {
  data(){
    return {
      data,
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      collapsed: false,
    }
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0
    }
  },
  methods: {
    onSearch (value) {
      console.log(value)
    },
    start () {
      this.loading = true
      // ajax request after empty completing
      setTimeout(() => {
        this.loading = false
        this.selectedRowKeys = []
      }, 1000)
    },
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    }
  },
}
</script>
<style>
.page
{
  margin: 20px;
}
.btn_list{
  align-items: center;
  width: 40%;
  display: inline-block;
}
.search{
  float: right ;
  display: inline-block;
}

#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color .3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255,255,255,.2);
  margin: 16px;
}
</style>