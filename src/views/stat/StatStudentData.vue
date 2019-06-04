<template>
  <div>
    <stattimedistribution :studentId='2'></stattimedistribution>
    <studentnumberstatistics></studentnumberstatistics>
    <runtimes :problemId='6'></runtimes>
    <studentcasetagstatistics></studentcasetagstatistics>
  </div>
</template>

<script>
import stattimedistribution from './StatTimeDistribution'
import runtimes from '@/components/chart/RunTimes'
import studentnumberstatistics from '@/components/chart/StudentNumberStatistics'
import studentcasetagstatistics from '@/components/chart/StudentCaseTagStatistics'
export default {
  components: {
    stattimedistribution,
    runtimes,
    studentnumberstatistics,
    studentcasetagstatistics
  }
}
</script>


<style scoped>

</style>
