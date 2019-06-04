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
      <!-- <div class="divider">
        <a-divider :span="4" orientation="left" >当前学期</a-divider>
      </div>-->
      <div class="personal-mybuluo-head">
        <div class="personal-mybuluo-wording">当前学期</div>
        <div class="personal-border jmu-border-1px border-bottom"></div>
      </div>

      <a-list itemLayout="vertical" size="large" :pagination="pagination " :dataSource="listData">
        <a-list-item slot="renderItem" slot-scope="item" key="item.title">
          <div>
            <a-collapse defaultActiveKey="1" class="collapse">
              <a-collapse-panel key="1" :showArrow="false" class="shadow">
                <template slot="header" class="collapse-panel">
                  <div style="height:80px;font-size:24px">
                    {{ item.title }}
                    <div class="description">{{ item.description }}</div>
                  </div>
                </template>
                <div style="height:360px">
                  <div :style="{ marginBottom: '16px' }">
                    <a-button @click="add">ADD</a-button>
                  </div>
                  <a-tabs hideAdd v-model="activeKey" type="editable-card" @edit="onEdit">
                    <a-tab-pane
                      v-for="pane in panes"
                      :tab="pane.title"
                      :key="pane.key"
                      :closable="pane.closable"
                    >{{ pane.content }}</a-tab-pane>
                  </a-tabs>
                </div>
              </a-collapse-panel>
            </a-collapse>
          </div>
          <!-- {{item.content}} -->
        </a-list-item>
      </a-list>
    </div>

    <!--     
    <a-layout-content
        :style="{ margin: '40px 80px', padding: '24px', background: '#fff', minHeight: '280px' }"
    >-->
    <div>
      <div class="personal-mybuluo-head">
        <div class="personal-mybuluo-wording">已结束学期</div>
        <div class="personal-border jmu-border-1px border-bottom"></div>
      </div>
      <a-list itemLayout="vertical" size="large" :pagination="pagination" :dataSource="listData">
        <a-list-item slot="renderItem" slot-scope="item" key="item.title">
          <div>
            <a-collapse defaultActiveKey="1" class="collapse">
              <a-collapse-panel key="1" :showArrow="false" class="shadow">
                <template slot="header" class="collapse-panel">
                  <div style="height:80px;font-size:24px">
                    {{ item.title }}
                    <div class="description">{{ item.description }}</div>
                  </div>
                </template>
                <div style="height:360px">
                  <div :style="{ marginBottom: '16px' }">
                    <a-button @click="add">ADD</a-button>
                  </div>
                  <a-tabs hideAdd v-model="activeKey" type="editable-card" @edit="onEdit">
                    <a-tab-pane
                      v-for="pane in panes"
                      :tab="pane.title"
                      :key="pane.key"
                      :closable="pane.closable"
                    >{{ pane.content }}</a-tab-pane>
                  </a-tabs>
                </div>
              </a-collapse-panel>
            </a-collapse>
          </div>
          <!-- {{item.content}} -->
        </a-list-item>
      </a-list>
    </div>
    <!-- </a-layout-content> -->
  </a-layout>
</template>
<script>
const panes = [
  { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
  { title: 'Tab 2', content: 'Content of Tab 2', key: '2' }
]
const listData = []
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://vue.ant.design/',
    title: '数据结构',
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
  })
}

export default {
  data() {
    return {
      listData,
      pagination: {
        onChange: page => {
          console.log(page)
        },
        pageSize: 4
      },
      activeKey: panes[0].key,
      panes,
      newTabIndex: 0
    }
  },
  methods: {
    callback(key) {
      console.log(key)
    },
    onEdit(targetKey, action) {
      this[action](targetKey)
    },
    add() {
      const panes = this.panes
      const activeKey = `newTab${this.newTabIndex++}`
      panes.push({ title: `New Tab ${activeKey}`, content: `Content of new Tab ${activeKey}`, key: activeKey })
      this.panes = panes
      this.activeKey = activeKey
    },
    remove(targetKey) {
      let activeKey = this.activeKey
      let lastIndex
      this.panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
          lastIndex = i - 1
        }
      })
      const panes = this.panes.filter(pane => pane.key !== targetKey)
      if (lastIndex >= 0 && activeKey === targetKey) {
        activeKey = panes[lastIndex].key
      }
      this.panes = panes
      this.activeKey = activeKey
    }
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

.description {
  margin-top: 20px;
  font-size: 16px;
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



