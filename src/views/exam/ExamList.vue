  <template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-breadcrumb>
      <a-breadcrumb-item>首页</a-breadcrumb-item>
      <a-breadcrumb-item>
        <a href>考试中心</a>
      </a-breadcrumb-item>
      <a-breadcrumb-item>考试列表</a-breadcrumb-item>
    </a-breadcrumb>

    <div>
      <div class="personal-mybuluo-head">
        <div class="personal-mybuluo-wording">当前学期</div>
        <div class="personal-border jmu-border-1px border-bottom"></div>
      </div>

      <a-list itemLayout="vertical" size="large" :pagination="nowCoursePagination" :dataSource="nowCourseData">
        <a-list-item slot="renderItem" slot-scope="item" key="item.id">
          <div>
            <a-collapse defaultActiveKey="1" class="collapse">
              <a-collapse-panel key="1" :showArrow="false" class="shadow">
                <template slot="header" class="collapse-panel">
                  <h1>{{ item.name }}：{{ item.code }}</h1>
                  <div>{{ item.starttime }} —— {{item.endtime}}</div>
                  <div class="content">{{ item.description }}</div>
                </template>
                <div style="height:360px" >
                  <div :style="{ marginBottom: '16px' }">
                    <a-button slot="tabBarExtraContent" :ghost="true" style="border: 0px">
                      <AddExam :parentToChild="item.id" @fflush="updateNowData"></AddExam>
                      </a-button>
                  </div>


                  <a-tabs hideAdd v-model="item.activeKey" type="editable-card"  >
                    <a-tab-pane
                      v-for="pane in item.exampanes"
                      :tab="pane.title"
                      :key="pane.key"
                      :closable="false"
                      >
                      <div style="font-size:20px">
                        考试名称：{{pane.title}}<br>
                      </div>
                      <div style="font-size:20px">
                        开始时间：{{pane.starttime}}<br>
                        考试时长：{{pane.duration}}<br>
                      </div>
                      <div style="font-size:20px">
                        考试描述：{{pane.content}}
                      </div>
                    <div>

                        <a-button><router-link to="/exam/examdetial">查看考试</router-link></a-button>
                    </div>

                    <div>
                        <a-button @click="remove(pane)">删除考试</a-button>
                    </div>
                    </a-tab-pane>
                  </a-tabs>
                </div>
              </a-collapse-panel>
            </a-collapse>
          </div>
        </a-list-item>
      </a-list>
    </div>


    <div>
      <div class="personal-mybuluo-head">
        <div class="personal-mybuluo-wording">已结束学期</div>
        <div class="personal-border jmu-border-1px border-bottom"></div>
      </div>
      <a-list itemLayout="vertical" size="large" :pagination="lastCoursePagination" :dataSource="lastCourseData">
        <a-list-item slot="renderItem" slot-scope="item" key="item.id">
          <div>
            <a-collapse defaultActiveKey="1" class="collapse">
              <a-collapse-panel key="1" :showArrow="false" class="shadow">
                <template slot="header" class="collapse-panel">
                  <h1>{{ item.name }}：{{ item.code }}</h1>
                  <div>{{ item.starttime }} —— {{item.endtime}}</div>
                  <div class="content">{{ item.description }}</div>
                </template>
                <div style="height:360px">
                  <div :style="{ marginBottom: '16px' }">
                  </div>
                  <!-- <a-tabs hideAdd v-model="item.exampanse[0].id" type="editable-card" @edit="onEdit"> -->
                    <a-tabs hideAdd type="editable-card">
                    <a-tab-pane
                      v-for="pane in item.exampanes"
                      :tab="pane.title"
                      :key="pane.key"
                      :closable="false"
                      >
                      {{pane.content}}
                    </a-tab-pane>
                  </a-tabs>
                </div>
              </a-collapse-panel>
            </a-collapse>
          </div>
        </a-list-item>
      </a-list>
    </div>
  </a-layout>
</template>
<script>
import AddExam from './AddExam'

import {
  getnowexam,
  getlastexam,
  deleteexam
} from '@/api/exam'

export default {
  data() {
    return {
      teacher_id: 1,
      nowCourseData: [],
      lastCourseData: [],
      newTabIndex: 0,

      nowCoursePagination: {
        pageSize: 4,
        total: 30,
        current: 1
      },

      lastCoursePagination: {
        pageSize: 4,
        total: 30,
        current: 1
      },
      visible: false,

    }
  },
  components: {
    AddExam
  },
  methods: {
    addexam: function() {
      this.visible = true
    },
    handleCancel: function() {
      this.visible = false
    },

    remove(item) {
      let self = this
      deleteexam({
        exam_id: item.exam_id
      }).then(function(response) {
        if (!response.data.error) {
          self.$message.success('删除成功！')
          self.updateNowData()
        } else {
          alert('删除失败！')
        }
      }).catch((fail) => {
        alert('删除失败！')
      })
    },
    pageChange(page) {
      this.page = page
    },

    updateNowData: function() {
      let self = this
      getnowexam({
        teacher_id: this.teacher_id,
        page_index: self.nowCoursePagination.current,
        page_length: self.nowCoursePagination.pageSize
      }).then(function(response) {
        const pagination = {
          ...self.nowCoursePagination
        }
        pagination.total = pagination.pageSize * parseInt(response.data.totalPages)
        pagination.current = parseInt(response.data.current)
        self.nowCourseData = response.data.course_list
        self.nowCoursePagination = pagination
      }).catch((fail) => {
        alert('获取课程列表失败！')
      })
    },

    updateLastData: function() {
      let self = this
      getlastexam({
        teacher_id: this.teacher_id,
        page_index: self.lastCoursePagination.current,
        page_length: self.lastCoursePagination.pageSize
      }).then(function(response) {
        const pagination = {
          ...self.lastCoursePagination
        }
        pagination.total = pagination.pageSize * parseInt(response.data.totalPages)
        pagination.current = parseInt(response.data.current)
        self.lastCourseData = response.data.course_list
        self.lastCoursePagination = pagination
      }).catch((fail) => {
        alert('获取课程列表失败！')
      })
    },

    update: function() {
      this.updateNowData()
      this.updateLastData()
    }
  },
  mounted: function() {
    this.update();
  }
}
</script>
<style>
.shadow {
  -webkit-box-shadow: #666 0px 0px 10px;
  -moz-box-shadow: #666 0px 0px 10px;
  box-shadow: #666 0px 0px 10px;
  background: #666 0px 0px 10px;
}

.content {
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 20px;
  height: 80px;
  margin-top: 20px;
  font-size: 12px;
}

.collapse {
  margin-left: 9%;
  width: 76%;
}

.collapse-panel {
  background: whitesmoke;
  /* border-radius: 10px; */
  margin-bottom: 32px;
  border: 0px;
  overflow: hidden;
}

/* .divider{
  font-size: 600px;
  background: red;
} */

.personal-mybuluo-head {
  /* height: 14px; */

  position: relative;
  font-size: 24px;
  margin-top: 60px;
  margin-bottom: 36px;
}

.personal-mybuluo-wording {
  background-color: #fff;

  background-color: rgba(255, 255, 255, 0.1);
  position: absolute;
  top: -6px;
  z-index: 2;
  left: 10%;

  /* color: #777; */
  color: black;
  text-align: center;
  -webkit-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
  padding: 0 10px;
}

.personal-border {
  position: absolute;
  top: 0px;
  left: 0;
  width: 100%;
  height: 14px;
  z-index: 1;
}

.jmu-border-1px {
  position: relative;
}

.jmu-border-1px.border-bottom:after {
  border-bottom: 2px solid #dedfe0;
}

.jmu-border-1px:after {
  display: block;
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  -webkit-transform-origin: 0 0;
  -webkit-transform: scale(1);
  pointer-events: none;
}
</style>
