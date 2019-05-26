<template>
  <div>
    <div class="head">
      <text>{{ lectureName }}</text>
    </div>
    <div class="body">
      <div class="detail">
        <text>课程描述</text>
        <text>{{ lectureDes }}</text>
      </div>
      <div class="file">
        <text>附件</text>
      </div>
      <div class="problem">
        <text>练习题</text>
        <div>
        </div>
      </div>
    </div></div></template>

<script>
export default {
    data () {
        return{
            lectureName:'第一课时：排序和查找',
            lectureDes:'这是一节非常重要的课，希望同学们呢认真掌握'
        }
    }
}
</script>

<style>

</style>
