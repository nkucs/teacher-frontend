<template>
  <div class="page-header-index-wide">
      <a-col >
        <a-card class="antd-pro-pages-dashboard-analysis-salesCard" :loading="loading" :bordered="true" title="选课学生" :style="{ marginTop: '24px', minHeight: '50px' }">
          <!-- <div slot="extra" style="height: inherit;"> -->
            <!-- style="bottom: 12px;display: inline-block;" -->
            <!-- <span class="dashboard-analysis-iconGroup">
              <a-dropdown :trigger="['click']" placement="bottomLeft">
                <a-icon type="ellipsis" class="ant-dropdown-link" />
                <a-menu slot="overlay">
                  <a-menu-item>
                    <a href="javascript:;">操作一</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;">操作二</a>
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            </span> -->
            <!-- <div class="analysis-salesTypeRadio">
              <a-radio-group defaultValue="a">
                <a-radio-button value="a">全部渠道</a-radio-button>
                <a-radio-button value="b">线上</a-radio-button>
                <a-radio-button value="c">门店</a-radio-button>
              </a-radio-group>
            </div> -->
          <!-- </div> -->
          <div>
              <!-- style="width: calc(100% - 240px);" -->
            <div>
              <ve-pie :data="stuData">
                对于这个图的提示，我只是测试一下可以把文字位置
              </ve-pie>
            </div>

          </div>
        </a-card>
      </a-col>

      <a-col >
        <a-card :style="{ marginTop: '24px' }">
          <!-- <a-dropdown :trigger="['click']" placement="bottomLeft" slot="extra">
            <a class="ant-dropdown-link" href="#">
              <a-icon type="ellipsis" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;">操作一</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;">操作二</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown> -->
          <div class="left-graph">
            <h4>课程题目总数</h4>
            <ve-ring :data="problemData">
            </ve-ring>
          </div>
          <div class="right-graph">
            <h4>AC次数</h4>
            <ve-ring :data="acData">
            </ve-ring>
          </div>
        </a-card>
      </a-col>
      <!-- :xl="12" :lg="24" :md="24" :sm="24" :xs="24" -->
      
  </div>
</template>

<script>
   export default {
    data () {
      return {
        stuData: {
          columns: ['年份', '人数'],
          rows: [
            { '年份': '2015', '人数': 1393 },
            { '年份': '2016', '人数': 3530 },
            { '年份': '2017', '人数': 2923 },
            { '年份': '2018', '人数': 1723 },
            { '年份': '2019', '人数': 3792 }
          ]
        },
        problemData: {
          columns: ['课程名称', '题目总数'],
          rows: [
            { '课程名称': '课程1', '题目总数': 1393 },
            { '课程名称': '课程2', '题目总数': 3530 },
            { '课程名称': '课程3', '题目总数': 3530 },
            { '课程名称': '课程4', '题目总数': 3530 },
            { '课程名称': '课程5', '题目总数': 3530 },
          ]
        },
        acData: {
          columns: ['是否ac', '次数'],
          rows: [
            { '是否ac': 'ac次数', '次数': 1393 },
            { '是否ac': '未ac次数', '次数': 3530 },
          ]
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .extra-wrapper {
    line-height: 55px;
    padding-right: 24px;

    .extra-item {
      display: inline-block;
      margin-right: 24px;

      a {
        margin-left: 20px;
      }
    }
  }
  .left-graph {
      width : 40%;
      float: left;
  }
  .right-graph {
      width : 40%;
      float: right;
      margin-right:5%;
  }
</style>