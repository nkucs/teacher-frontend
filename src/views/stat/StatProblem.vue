<template>
  <div>
    <Runtimes></Runtimes>
    <ProblemCaseStatus></ProblemCaseStatus>
    <ProblemSubmissionCount></ProblemSubmissionCount>
  </div>
</template>

<script>
  import Runtimes from '@/components/chart/RunTimes'
  import ProblemCaseStatus from '@/components/ProblemAnalysis/ProblemCaseStatus'
  import ProblemSubmissionCount from '@/components/ProblemAnalysis/ProblemSubmissionCount'
  export default {
  components: {
    Runtimes,
    ProblemCaseStatus,
    ProblemSubmissionCount
  }
}
</script>

<style scoped>

</style>