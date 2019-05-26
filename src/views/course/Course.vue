<template>
  <div>
    <course-card></course-card>
    <table-header></table-header>
  </div>
</template>
<script>
import tableHeader from './mycourse/TableHeader'
import courseCard from './mycourse/courseCard'
export default {
  components: {
    tableHeader,
    courseCard
  }
}
</script>

