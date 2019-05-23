<<<<<<< HEAD
=======
<template>
  <div>
    <a-tabs defaultActiveKey="1" tabBarGutter="10%">
      <a-tab-pane key="1">
        <span slot="tab">
          <a-icon type="table" />
          主讲课管理
        </span>
        <lecture></lecture>
      </a-tab-pane>
      <a-tab-pane key="2" forceRender>
        <span slot="tab">
          <a-icon type="experiment" />
          实验课管理
        </span>
      </a-tab-pane>
      <a-tab-pane key="3">
        <span slot="tab">
          <a-icon type="project" />
          考试管理
        </span>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import lecture from './lecture/Lecture.vue'
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    lecture
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
</style>
>>>>>>> b907751d241d7ef9e05d3c2bde1a0f9bf1de5333
