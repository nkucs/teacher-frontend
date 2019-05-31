<template>
  <div>
    <SubmissionCount></SubmissionCount>
    <WordCloud></WordCloud>
    <BeautifulChart></BeautifulChart>
    <StatisticTables></StatisticTables>
  </div>
</template>

<script>
import SubmissionCount from '@/components/CourseAnalysis/SubmissionCount'
import WordCloud from '@/components/CourseAnalysis/WordCloud'
import BeautifulChart from '@/components/CourseAnalysis/BeautifulChart'
import StatisticTables from '@/components/CourseAnalysis/StatisticTables'
export default {
  components: {
    SubmissionCount,
    WordCloud,
    BeautifulChart,
    StatisticTables
  }
}
</script>


<style scoped>

</style>
