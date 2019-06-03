<template>
  <div class="ant-layout-has-sider">
    <div class="bg">
      <div class="main">
        <div class="problem-title">
          <h1>{{ title }}</h1>
          <div class="ant-divider ant-divider-horizontal"></div>
        </div>
        <div data-v-21b4b419="">

          <!-- <button
            class="ant-btn ant-btn-primary"
            data-v-21b4b419=""
            style="color: cornflowerblue; background: cyan;"
            type="button">
            <span>提交：{{ submitSum }}次</span>
          </button>&nbsp;&nbsp;
          <button
            class="ant-btn ant-btn-primary"
            data-v-21b4b419=""
            style="color: cornflowerblue; background: cyan;"
            type="button">
            <span>通过：{{ acceptSum }}次</span>
          </button>&nbsp;&nbsp;
          <button
            class="ant-btn ant-btn-primary"
            data-v-21b4b419=""
            style="color: cornflowerblue; background: cyan;"
            type="button">
            <span>通过率：{{ (acceptSum/submitSum)*100 }}%</span>
          </button>&nbsp; -->
        </div>
        <br/>
        <div data-v-21b4b419="">

          <button
            class="ant-btn ant-btn-primary"
            data-v-21b4b419=""
            style="color: red; background: lightpink;"
            type="button">
            <span>内存限制：{{ Memorylimit }}(MB)</span>
          </button>&nbsp;&nbsp;
          <button
            class="ant-btn ant-btn-primary"
            data-v-21b4b419=""
            style="color: red; background: lightpink;"
            type="button">
            <span>时间限制：{{ TimeLimit }}(MS)</span>
          </button>&nbsp;&nbsp;
          <!-- <button
            class="ant-btn ant-btn-primary"
            data-v-21b4b419=""
            style="color: red; background: lightpink;"
            type="button">
            <span>输入限制：{{ InputLimit }}(行)</span>
          </button>&nbsp;&nbsp;
          <button
            class="ant-btn ant-btn-primary"
            data-v-21b4b419=""
            style="color: red; background: lightpink;"
            type="button">
            <span>输出限制：{{ OutputLimit }}(行)</span>
          </button>&nbsp; -->
        </div>
        <div class="problem-block">
          <h2>题目描述</h2>
          <br/>
          <P v-html="ProblemDescription"></P>
        </div>
        <div class="problem-block">
          <br/>
          <br/>
          <h2>输入输出</h2>
          <br/>
          <div
            data-v-21b4b419=""
            style="background: rgb(236,236,236); "
            v-for="i in cases"
            :key="i.id">
            <div
              data-v-21b4b419=""
              style="background: rgb(236,236,236); padding: 30px;"
            >
              <h3>&nbsp;&nbsp;&nbsp;输入:</h3>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ i.input }}</p>
              <h3>&nbsp;&nbsp;&nbsp;输出:</h3>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ i.output }}</p>
            </div>
          </div>
        </div>
        <!-- <div class="problem-block">
          <br/>
          <h3>语言</h3>
          <div
            class="ant-select ant-select-open ant-select-focused ant-select-enabled"
            data-v-21b4b419=""
            style="width: 120px;">
            <form action="" method="get">
              <a-select>
                <a-select-option value="C++">C++</a-select-option>
                <a-select-option value="Java">Java</a-select-option>
                <a-select-option value="Python">Python</a-select-option>
              </a-select>
            </form>
            <br/>
            <br/>
            <br/>
          </div> -->
        <br/>
        <h3>标签</h3>
        <button
          class="ant-btn ant-btn-primary"
          data-v-21b4b419=""
          style="color: cornflowerblue; background: cyan; margin-right: 10px;"
          type="button"
          v-for="i in tags"
          :key="i.id">
          <span>{{ i.name }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import { getProblemDetail } from '@/api/problem'

  export default {
    name: 'ProblemPreview',
    components: {},
    data() {
      return {
        problem_id: '',
        title: '',
        acceptRate: '',
        Memorylimit: '',
        TimeLimit: '',
        ProblemDescription: '',
        tags: [],
        cases: []
      }
    },
    mounted: function() {
      this.problem_id = this.$route.params.problem_id
      getProblemDetail({
        problem_id: this.problem_id
      }).then(res => {
        console.log(res)
        this.title = res.name
        this.ProblemDescription = res.description
        this.TimeLimit = res.runtime_limit
        this.Memorylimit = res.memory_limit
        this.tags = res.tags
        this.cases = res.cases

      })
        .catch(err => {
          console.log(err)
        })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .title {
    width: 100%;
    height: 3%;
  }

  .title-text {
    font-size: 20px;
    float: left;
  }

  .view {
    float: right;
  }

  .main {
    margin-left: 3%;
    display: block;
  }

  .bg {
    background-color: white;
    padding-top: 2%;
    padding-bottom: 2%;
  }

  .problem-title {
    margin-top: 3%;
  }

  .title-icon {
    float: left;
    font-size: 20px;
  }

  .ant-input {
    width: 80%;
  }

  .problem-block {
    margin-top: 2%;
    display: block;
  }

  #practice_type,
  #high {
    color: red;
  }

  #exam_type,
  #medium {
    color: yellow;
  }

  #homework_type,
  #low {
    color: deepskyblue;
  }

  .limit-input {
    width: 90%;
  }

  .test-span {
    margin-left: 3%;
    margin-top: 2%;
    display: flex;
  }

  .test-span-text {
    width: 10%;
    height: 2%;
  }

  .in-out {
    margin-left: 3%;
    margin-top: 1%;
    width: 80%;
    display: block;
  }

  .span-input {
    width: 15%;
  }

  .second-radio-group {
    margin-left: 5%;
  }

  #preread {
    margin-left: 1%;
  }

  .btn-block {
    margin-top: 3%;
  }

  #limit {
    display: flex;
  }

  .red-btn {
    color: red;
  }

  .yellow-btn {
    color: yellow;
  }

  .blue-btn {
    color: deepskyblue;
  }

  .confirm-btn {
    margin-top: 1%;
  }

  .in-out-textarea {
    width: 60%;
  }
</style>