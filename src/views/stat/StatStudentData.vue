<template>
  <div>
    <stattimedistribution :studentId='student_id'></stattimedistribution>
    <studentnumberstatistics :courseIds='[1, 2, 3]'></studentnumberstatistics>
    <WordCloud></WordCloud>
    <runtimes :problemId='6'></runtimes>
    <studentcasetagstatistics :studentNumber='student_number'></studentcasetagstatistics>
  </div>
</template>

<script>
import stattimedistribution from './StatTimeDistribution'
import runtimes from '@/components/chart/RunTimes'
import WordCloud from '@/components/CourseAnalysis/WordCloud'
import studentnumberstatistics from '@/components/chart/StudentNumberStatistics'
import studentcasetagstatistics from '@/components/chart/StudentCaseTagStatistics'
export default {
  components: {
    stattimedistribution,
    runtimes,
    studentnumberstatistics,
    studentcasetagstatistics,
    WordCloud
  },
  data() {
    var params = this.$router.history.current.params
    var studentId
    var studentNumber
    if (params.student_id && params.student_number) {
      studentId = params.student_id
      studentNumber = params.student_number
    } else {
      studentId = 1
      studentNumber = 1000001 + ''
    }
    return {
      student_id: studentId,
      student_number: studentNumber + ''
    }
  }
  
}
</script>


<style scoped>

</style>
