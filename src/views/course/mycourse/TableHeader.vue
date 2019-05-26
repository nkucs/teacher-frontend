<template>
  <div>
    <div style="margin-bottom: 5px">
      <a-radio-group>
        <a-radio-button>我的课程</a-radio-button>
        <a-radio-button>全部课程</a-radio-button>
      </a-radio-group>
      <addCourse style="margin-bottom: 5px" align="right"></addCourse>
    </div>
    <div>
      <div style="margin-bottom: 5px">
        <a-input style="width: 44%" addonBefore="课程名称" defaultValue="在此输入课程名称" />
        <a-input style="width: 43%" addonBefore="教师姓名" defaultValue="在此输入教师姓名" />
        <a-button type="primary" align="right">查询</a-button>
        <a-button align="right">重置</a-button>
      </div>
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
