<template>
  <div class="card-list" ref="content">
    <a-list
      :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 3, xxl: 3 }"
      :dataSource="dataSource"
    >
      <a-list-item slot="renderItem" slot-scope="item,index">    
        <a-card :hoverable="true">           
          <div slot="title">{{ item.name }}</div>
          <a slot="extra">{{ item.time }}</a>
          <a>{{ item.content }}</a>
          <template class="ant-card-actions" slot="actions">
            <!-- <a href="#">编辑</a>                   -->
            <editCourse></editCourse>
            <router-link
              :to="{path: 'course/details', query:{courseID:item.id}}">
              <a>详情</a>
            </router-link>
            <a-dropdown>
              <a class="ant-dropdown-link" href="#">更多<a-icon type="down" /></a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a href="javascript:;" key="copy" @click="copycourse(index.id, index.teacher)">复制</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;" key="delete" @click="deletecourse(index.id)">删除</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
        </a-card>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import editCourse from './editCourseForm'
import { deletecourse, copycourse,getnowcourse} from '@/api/course'
const dataSource = [
  {
    id:'1',
    name: '算法导论',
      time:'2019年春季学期',
      content:'在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面'
  },
  {
    id:'123',
    name: '876',
      time:'2019年春季学期',
      content:'在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面'
  },
  {
    id:'123',
    name: '123123',
      time:'2019年春季学期',
      content:'在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面'
  },
  {
    id:'123',
    name: '777dfdfg',
      time:'2019年春季学期',
      content:'在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面'
  },
  {
    id:'123',
    name: 'sdfsdf',
      time:'2019年春季学期',
      content:'在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面'
  },

]
  export default {
    name:'CardList',
    data () {
      return {
        dataSource,
        teacher_id: ''
      }
    },
    methods:{
    toDelete (ID) {
      this.deleteID = ID
      this.visibleDelete = true
    },
    toCopy (ID) {
      this.copyID = ID
      this.visibleCopy = true
    },
    copycourse () {
      copycourse({
        'courseCode': this.copyID
      }).then(() => {
        console.log(`copied course successfully.`)
      }).catch((fail) => {
        alert('复制课程失败！')
        console.log(fail)
      })
    },
    deletecourse() {
      deletecourse({
        'courseCode': this.deleteID
      }).then(() => {
        console.log(`deleted course successfully.`)
      }).catch((fail) => {
        alert('删除课程失败！')
        console.log(fail)
      })
    },
    getnowcourse() {
      getnowcourse({
        teacherId:this.teacher_id
      }).then((response) => {
        console.log(`get my courses successfully.`)
        this.dataSource = response.courseList
      }).catch((fail) => {
        alert('获取课程列表失败！')
        console.log(fail)
      })
    }
    },
     mounted: function () {
    this.getmycourse()
  },
    components: {
      editCourse
    }

  }
</script>

<style lang="scss" scoped>
  .ant-card-actions {
    background: #f7f9fa;
    li {
      float: left;
      text-align: center;
      margin: 12px 0;
      color: rgba(0, 0, 0, 0.45);
      width: 50%;

      &:not(:last-child) {
        border-right: 1px solid #e8e8e8;
      }

      a {
        color: rgba(0, 0, 0, .45);
        line-height: 22px;
        display: inline-block;
        width: 100%;
        &:hover {
          color: #1890ff;
        }
      }
    }
  }
</style>