<template>
  <div class="page-header-index-wide">
    <a-row :gutter="12">
      <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card :loading="loading" :bordered="false" title="线上热门搜索" :style="{ marginTop: '24px' }">
          <a-dropdown :trigger="['click']" placement="bottomLeft" slot="extra">
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
          </a-dropdown>
          <ve-ring :data="chartData"></ve-ring>
        </a-card>
      </a-col>
      <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card class="antd-pro-pages-dashboard-analysis-salesCard" :loading="loading" :bordered="false" title="销售额类别占比" :style="{ marginTop: '24px', minHeight: '500px' }">
          <div slot="extra" style="height: inherit;">
            <!-- style="bottom: 12px;display: inline-block;" -->
            <span class="dashboard-analysis-iconGroup">
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
            </span>
            <div class="analysis-salesTypeRadio">
              <a-radio-group defaultValue="a">
                <a-radio-button value="a">全部渠道</a-radio-button>
                <a-radio-button value="b">线上</a-radio-button>
                <a-radio-button value="c">门店</a-radio-button>
              </a-radio-group>
            </div>

          </div>
          <h4>销售额</h4>
          <div style="width: calc(100% - 240px);">
            <div>
              <ve-pie :data="chartData"></ve-pie>
            </div>

          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
   export default {
    data () {
      return {
        chartData: {
          columns: ['日期', '访问用户'],
          rows: [
            { '日期': '1/1', '访问用户': 1393 },
            { '日期': '1/2', '访问用户': 3530 },
            { '日期': '1/3', '访问用户': 2923 },
            { '日期': '1/4', '访问用户': 1723 },
            { '日期': '1/5', '访问用户': 3792 },
            { '日期': '1/6', '访问用户': 4593 }
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
        margin-left: 24px;
      }
    }
  }
</style>