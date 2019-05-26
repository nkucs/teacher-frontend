<template>
  <div class="ant-layout-has-sider">
    <div class="title">
      <h1 class="title-text">预览题目</h1>
      <div class="view">
        <a href="./ProblemDetail.vue" disabled="">编辑</a>
        <div class="ant-divider ant-divider-vertical"></div>
        <a href="">预览</a>
      </div>
    </div>
    <div class="ant-divider ant-divider-horizontal"></div>
    <div class="bg">
      <div class="main">
        <div class="problem-title">
          <h1>{{ title }}</h1>
          <div class="ant-divider ant-divider-horizontal"></div>
        </div>
        <div data-v-21b4b419="">

          <button class="ant-btn ant-btn-primary" style="color: cornflowerblue; background: cyan;" type="button" data-v-21b4b419="">
            <span>提交：{{ submitSum }}次</span>
          </button>&nbsp;&nbsp;
          <button class="ant-btn ant-btn-primary" style="color: cornflowerblue; background: cyan;" type="button" data-v-21b4b419="">
            <span>通过：{{ acceptSum }}次</span>
          </button>&nbsp;&nbsp;
          <button class="ant-btn ant-btn-primary" style="color: cornflowerblue; background: cyan;" type="button" data-v-21b4b419="">
            <span>通过率：{{ acceptRate }}%</span>
          </button>&nbsp;
        </div>
        <br />
        <div data-v-21b4b419="">

          <button class="ant-btn ant-btn-primary" style="color: red; background: lightpink;" type="button" data-v-21b4b419="">
            <span>内存限制：{{ Memorylimit }}(MB)</span>
          </button>&nbsp;&nbsp;
          <button class="ant-btn ant-btn-primary" style="color: red; background: lightpink;" type="button" data-v-21b4b419="">
            <span>时间限制：{{ TimeLimit }}(MS)</span>
          </button>&nbsp;&nbsp;
          <button class="ant-btn ant-btn-primary" style="color: red; background: lightpink;" type="button" data-v-21b4b419="">
            <span>输入限制：{{ InputLimit }}(行)</span>
          </button>&nbsp;&nbsp;
          <button class="ant-btn ant-btn-primary" style="color: red; background: lightpink;" type="button" data-v-21b4b419="">
            <span>输出限制：{{ OutputLimit }}(行)</span>
          </button>&nbsp;
        </div>
        <div class="problem-block" id="multi-textarea">
          <h2>题目描述</h2>
          <br />
          <h3>问题描述：{{ ProblemDescription }}</h3>
          <h3>输入：{{ Input }}</h3>
          <h3>输出：{{ Output }}</h3>
          <br />
          <br />
          <h2>附件：</h2>
        </div>
        <div class="problem-block" id="multi-textarea">
          <br />
          <br />
          <h2>样例输入输出：</h2>
          <br />
          <h3>样例1</h3>
          <div style="background: rgb(236,236,236); padding: 30x;" data-v-21b4b419="">
            <h3>&nbsp;&nbsp;&nbsp;输入:</h3>
            <h3>&nbsp;&nbsp;&nbsp;{{ SampleInput }}</h3>
            <h3>&nbsp;&nbsp;&nbsp;输出:</h3>
            <h3>&nbsp;&nbsp;&nbsp;{{ SampleOutput }}</h3>
          </div>
        </div>
        <div class="problem-block" id="multi-textarea">
          <h2>测试:</h2>
          <br />
          <h3>语言</h3>
          <div class="ant-select ant-select-open ant-select-focused ant-select-enabled" style="width: 120px;" data-v-21b4b419="">
            <form action="" method="get">
              <a-select>
                <a-select-option value="C++">C++</a-select-option>
                <a-select-option value="Java">Java</a-select-option>
                <a-select-option value="Python">Python</a-select-option>
              </a-select>
            </form>
            <br />
            <br />
            <br />
          </div>
        </div>
        <div class="problem-block" id="multi-textarea">
          <editor></editor>
        </div>
				
      </div>
    </div>
  </div>
    </div>
</template>

<script>
    import Editor from './Editor'
    import EditableCell from './EditableCell'

    export default {
        name: 'MultiTextarea',
        components: {
            Editor,
            EditableCell
        },
        data() {
            return {
                title: 'a+b problem',
                submitSum: '5',
                acceptSum: '3',
                acceptRate: '60',
                Memorylimit: '256',
                TimeLimit: '1000',
                InputLimit: '1000',
                OutputLimit: '64',
                ProblemDescription: '输入两个整数a,b，输出他们的和',
                Input: '两个整数a,b',
                Output: '一个整数a+b',
                SampleInput: '1 2',
                SampleOutput: '3',
               
            }
        },
        
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