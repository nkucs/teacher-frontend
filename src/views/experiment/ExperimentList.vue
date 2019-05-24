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
      href="/experiment/new"
    >
      新建实验
    </a-button>

    <div class="margin"></div>

    <a-table :dataSource="listData">
      <a-table-column
        title="实验ID"
        dataIndex="problem_id"
        key="problem_id"
      />
      <a-table-column
        title="实验名称"
        dataIndex="problem_name"
        key="problem_name"
      />
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
            <a href="/experiment/edit" target="_blank" @click="editLab(record.problem_id)">编辑</a>
            <a-divider type="vertical" />
            <a href="/stat/problem" target="_blank" @click="performance(record.problem_id)">完成情况</a>
            <a-divider type="vertical" />
            <a href="javascript:;" target="_blank" @click="deleteLab(record.problem_id)">删除</a>
          </span>
        </template>
      </a-table-column>
    </a-table>

  </div>
</template>

<script>
var listData = 
[
  {
    problem_id: '00001',
    problem_name: 'lab1：二叉搜索树',
    start_time: '2017-10-31 23:12:00',
    end_time: '2017-10-31 23:12:00',
  },
  {
    problem_id: '00002',
    problem_name: 'lab2：2',
    start_time: '2017-10-31 23:12:00',
    end_time: '2017-10-31 23:12:00',
  },
  {
    problem_id: '00003',
    problem_name: 'lab3：3',
    start_time: '2017-10-31 23:12:00',
    end_time: '2017-10-31 23:12:00',
  },
  {
    problem_id: '00004',
    problem_name: 'lab4：4',
    start_time: '2017-10-31 23:12:00',
    end_time: '2017-10-31 23:12:00',
  },
  {
    problem_id: '00005',
    problem_name: 'lab5：5',
    start_time: '2017-10-31 23:12:00',
    end_time: '2017-10-31 23:12:00',
  },
  {
    problem_id: '00006',
    problem_name: 'lab6：6',
    start_time: '2017-10-31 23:12:00',
    end_time: '2017-10-31 23:12:00',
  },
  {
    problem_id: '00007',
    problem_name: 'lab7：7',
    start_time: '2017-10-31 23:12:00',
    end_time: '2017-10-31 23:12:00',
  },
  {
    problem_id: '00008',
    problem_name: 'lab8：8',
    start_time: '2017-10-31 23:12:00',
    end_time: '2017-10-31 23:12:00',
  },
  {
    problem_id: '00009',
    problem_name: 'lab9：9',
    start_time: '2017-10-31 23:12:00',
    end_time: '2017-10-31 23:12:00',
  },
  {
    problem_id: '00010',
    problem_name: 'lab10：10',
    start_time: '2017-10-31 23:12:00',
    end_time: '2017-10-31 23:12:00',
  },
  {
    problem_id: '00011',
    problem_name: 'lab11：11',
    start_time: '2017-10-31 23:12:00',
    end_time: '2017-10-31 23:12:00',
  }
]

import { deleteLab, getProblems } from '@/api/experiment'
export default {
  data () {
    return {
      msg: '实验列表',
      listData,
    }
  },

  methods: {
    newLab() {
      console.log('进入添加新实验的页面')
      alert('进入添加新实验的页面')
    },

    editLab(labId) {
      console.log(`进入实验${labId}的编辑页面`)
      alert(`进入实验${labId}的编辑页面`)
    },

    performance(labId) {
      console.log(`进入实验${labId}的完成情况页面`)
      alert(`进入实验${labId}的完成情况页面`)
    },

    deleteLab(labId) {
      const self = this
      console.log(`删除实验${labId}`)
      deleteLab({
        params: {
          lab_id: labId,
        }
      }).then(() => {
        console.log(`delete lab ${labId} successfully`)
        for (var item in self.listData) {
          if (self.listData[item].id === labId) {
            self.listData.splice(item, 1)
            break
          }
        }
      }).catch((fail) => {
        alert('删除实验失败')
        console.log(fail)
      })
    }
  },

  mounted() {
    const self = this
    getProblems()
    .then(response => {
      console.log(response)
      self.listData = response.problems
    })
    .catch(fail => {
      console.log(fail)
      alert('无法获取实验列表')
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