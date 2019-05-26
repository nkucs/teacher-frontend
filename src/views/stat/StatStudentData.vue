<template>
  <div>
    <stattimedistribution></stattimedistribution>
    <studentnumberstatistics></studentnumberstatistics>
    <runtimes></runtimes>
    <studentcasetagstatistics></studentcasetagstatistics>
  </div>
</template>

<script>
import stattimedistribution from './StatTimeDistribution'
import studentnumberstatistics from '../../components/chart/StudentNumberStatistics'
import runtimes from '../../components/chart/RunTimes'
import studentcasetagstatistics from '../../components/chart/StudentCaseTagStatistics'
export default {
  components: {
    stattimedistribution,
    studentnumberstatistics,
    runtimes,
    studentcasetagstatistics
  }
}
</script>


<style scoped>

</style>
