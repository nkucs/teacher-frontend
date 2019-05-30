<template>
  <div>
    <Runtimes></Runtimes>
    <ProblemCaseStatus></ProblemCaseStatus>
    <ProblemSubmission></ProblemSubmission>
  </div>
</template>

<script>
  import Runtimes from '../../components/chart/RunTimes'
  import ProblemCaseStatus from '@/components/linechart/ProblemCaseStatus'
  import ProblemSubmission from '@/components/linechart/ProblemSubmission'
  export default {
  components: {
    Runtimes,
    ProblemCaseStatus,
    ProblemSubmission
  }
}
</script>

<style scoped>

</style>