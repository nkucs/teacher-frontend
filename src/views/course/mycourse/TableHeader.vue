<template>
  <div>
    <a-tabs>
      <a-tab-pane tab="我的课程" key="1"><myLesson></myLesson></a-tab-pane>
      <a-tab-pane tab="全部课程" key="2"><allLesson></allLesson></a-tab-pane>
      <a-button slot="tabBarExtraContent" ghost="true" style="border: 0px"><addCourse></addCourse></a-button>
    </a-tabs>
  </div>
</template>
<script>
import myLesson from './MyLessons'
import allLesson from './ALLLessons'
import addCourse from './addCourseForm'
export default {
  data() {
    return {
      courseType: false,
      allcourse_visible: true,
      mycourse_visible: true
    }
  },
  components: {
    myLesson,
    addCourse,
    allLesson
  }
}
</script>
