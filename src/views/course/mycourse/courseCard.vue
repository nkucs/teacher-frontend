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
            <router-link to="course/details"><a>详情</a></router-link>
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
import { deletecourse, copycourse} from '@/api/course'
const dataSource = [
  {
    id:'123',
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
        dataSource
      }
    },
    methods:{
        copycourse (courseID, teacherID) {
      const self = this
      console.log(`复制课程${courseID}`)
      copycourse({
        params: {
          course_id: courseID,  //向后端传参
          teacher_id: teacherID,
        }
      }).then(() => {
        console.log(`${teacherID} copied course ${courseID} successfully.`)
        for (var item in self.data) {
          if (self.data[item].id === courseID) {
            self.data.splice(item, 1)
            break
          }
        }
      }).catch((fail) => {
        alert('复制课程失败！')
        console.log(fail)
      })
    },
    deletecourse(courseID) {
      const self = this
      console.log(`删除课程${courseID}`)
      deletecourse({
        params: {
          course_id: courseID,  //向后端传参
        }
      }).then(() => {
        console.log(`deleted course ${courseID} successfully.`)
        for (var item in self.data) {
          if (self.data[item].id === courseID) {
            self.data.splice(item, 1)
            break
          }
        }
      }).catch((fail) => {
        alert('删除课程失败！')
        console.log(fail)
      })
    }
    },
     mounted: function (teacherID) {
    const self = this
    getmycourse({
      params: {
        teacher_id: teacherID,
      }
    })
    .then(response => {
      console.log(response)
      self.data = response.course //对应后端数据
    })
    .catch(fail => {
      console.log(fail)
      alert('获取课程列表失败！')
    })
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