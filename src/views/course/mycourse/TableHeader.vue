<template>
  <div>
    <div>
      <a-button-group>
        <a-button>我的课程</a-button>
        <a-button>全部课程</a-button>
      </a-button-group>
      <addCourse></addCourse>
    </div>
    <div>
      <div style="margin-bottom: 16px">
        <a-input addonBefore="课程名称" defaultValue="在此输入课程名称" />
      </div>
      <div style="margin-bottom: 16px">
        <a-input addonBefore="教师姓名" defaultValue="在此输入教师姓名" />
      </div>
      <a-button>查询</a-button>
      <a-button>重置</a-button>
    </div>
    <div>
      <myLesson></myLesson>
    </div>
  </div>
</template>
<script>
import myLesson from './MyLessons'
import addCourse from './addCourseForm'
export default {
  data() {
    return {
      courseType: false
    }
  },
  components: {
    myLesson,
    addCourse
  }
}
</script>
