<template>
	<div class="ant-layout-has-sider" >
		<div class="title">
			<h1 class="title-text">修改题目</h1>
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
					<a-icon class="title-icon" type="caret-right" /><h3>题目标题</h3>
					<input type="text" class="ant-input">
				</div>
				<div class="problem-block">
					<a-icon class="title-icon" type="caret-right" /><h3>题目类型</h3>
					<a-radio-group  @change="selectType">
				      <a-radio-button value="practice" class="red-btn">练习题</a-radio-button>
				      <a-radio-button value="exam" class="yellow-btn">考试题</a-radio-button>
				      <a-radio-button value="homework" class="blue-btn">作业题</a-radio-button>
				    </a-radio-group>
				</div>
				<div class="problem-block" id="multi-textarea">
					<a-icon class="title-icon" type="caret-right" /><h3>题目描述</h3>
	               <editor></editor>
				</div>
				<div class="problem-block">
					<a-icon class="title-icon" type="caret-right" /><h3>附件</h3>
					<a-upload action="//jsonplaceholder.typicode.com/posts/" :defaultFileList="defaultFileList">
					    <a-button>
					      <a-icon type="upload" /> 上传附件
					    </a-button>
					  </a-upload>
				</div>
				<div class="problem-block" id="limit">
					<div class="problem-limit">
						<a-icon class="title-icon" type="caret-right" /><h3>内存限制(MB)</h3>
						<input type="text" class="ant-input limit-input" name="memory_limit">
					</div>
					<div class="problem-limit">
						<a-icon class="title-icon" type="caret-right" /><h3>时间限制(MS)</h3>
						<input type="text" class="ant-input limit-input" name="time_limit">
					</div>
					<div class="problem-limit">
						<a-icon class="title-icon" type="caret-right" /><h3>输入限制(行)</h3>
						<input type="text" class="ant-input limit-input" name="input_limit">
					</div>
					<div class="problem-limit">
						<a-icon class="title-icon" type="caret-right" /><h3>输出限制(行)</h3>
						<input type="text" class="ant-input limit-input" name="output_limit">
					</div>
				</div>
				<div class="problem-block">
					<a-icon class="title-icon" type="caret-right" /><h3>测例输入与输出</h3>
					<div class="test-span">
						<div class="test-span-text">
							<a-icon class="title-icon test-input-span" type="caret-right" /><h3>测例标签</h3>
						</div>
						<input type="text" class="ant-input span-input" name="test_span" placeholder="例：边界条件" v-model="test_span" >
					</div>
					<div class="in-out">
						<a-icon class="title-icon test-input-span" type="caret-right" /><h3>输入</h3>
						<a-textarea placeholder="输入" :autosize="{ minRows: 2, maxRows: 6}" class="in-out-textarea" v-model="test_input"/>
					</div>
					<div class="in-out">
						<a-icon class="title-icon test-input-span" type="caret-right" /><h3>输出</h3>
						<a-textarea placeholder="输出" :autosize="{ minRows: 2, maxRows: 6}" class="in-out-textarea" v-model="test_output"/>
					</div>
		            <button type="button" class="ant-btn ant-btn-primary confirm-btn" @click="handleAdd1">
		             	<span>添加>></span>
		             </button>
		             <a-table bordered :dataSource="dataSource1" :columns="columns1" style="width: 80%;margin-top: 1%;">
					      <template slot="input" slot-scope="text, record">
					        <editable-cell :text="text" @change="onCellChange(record.key, 'input', $event)"/>
					      </template>
					      <template slot="output" slot-scope="text, record">
					        <editable-cell :text="text" @change="onCellChange(record.key, 'output', $event)"/>
					      </template>
					      <template slot="span" slot-scope="text, record">
					        <editable-cell :text="text" @change="onCellChange(record.key, 'span', $event)"/>
					      </template>
					      <template slot="operation" slot-scope="text, record">
					        <a-popconfirm
					          v-if="dataSource1.length"
					          title="确认删除?"
					          @confirm="() => onDelete1(record.key)">
					          <a href="javascript:;">删除</a>
					        </a-popconfirm>
					      </template>
				    </a-table>
				</div>
				<div class="problem-block">
					<a-icon class="title-icon" type="caret-right" /><h3>样例输入与输出</h3>
					<div class="test-span">
						<div class="test-span-text">
							<a-icon class="title-icon test-input-span" type="caret-right" /><h3>样例标签</h3>
						</div>
						<input type="text" class="ant-input span-input" name="test_span" placeholder="例：边界条件" v-model="sample_span">
					</div>
					<div class="in-out">
						<a-icon class="title-icon test-input-span" type="caret-right" /><h3>输入</h3>
						<a-textarea placeholder="输入" :autosize="{ minRows: 2, maxRows: 6}" class="in-out-textarea" v-model="sample_input"/>
					</div>
					<div class="in-out">
						<a-icon class="title-icon test-input-span" type="caret-right" /><h3>输出</h3>
						<a-textarea placeholder="输出" :autosize="{ minRows: 2, maxRows: 6}" class="in-out-textarea" v-model="sample_output"/>
					</div>
	                <div class="test-input-output">
			             <button type="button" class="ant-btn ant-btn-primary confirm-btn" @click="handleAdd2">
			             	<span>添加>></span>
			             </button>
		             </div>
		             <a-table bordered :dataSource="dataSource2" :columns="columns2" style="width: 80%;margin-top: 1%;">
					      <template slot="input2" slot-scope="text, record">
					        <editable-cell :text="text" @change="onCellChange(record.key, 'input2', $event)"/>
					      </template>
					      <template slot="output2" slot-scope="text, record">
					        <editable-cell :text="text" @change="onCellChange(record.key, 'output2', $event)"/>
					      </template>
					      <template slot="span2" slot-scope="text, record">
					        <editable-cell :text="text" @change="onCellChange(record.key, 'span2', $event)"/>
					      </template>
					      <template slot="operation2" slot-scope="text, record">
					        <a-popconfirm
					          v-if="dataSource2.length"
					          title="确认删除?"
					          @confirm="() => onDelete2(record.key)">
					          <a href="javascript:;">删除</a>
					        </a-popconfirm>
					      </template>
				    </a-table>
				</div>
				
				<div class="problem-block">
					<a-icon class="title-icon" type="caret-right" /><h3>题目标签</h3>
				    <a-select
				      mode="tags"
				      placeholder="Please select"
				      style="width: 220px"
				      @change="handleChange"
				      allowClear="true"
				    >
				     <a-select-option value="C">C</a-select-option>
				     <a-select-option value="C++">C++</a-select-option>
				     <a-select-option value="Java">Java</a-select-option>
				     <a-select-option value="Python">Python</a-select-option>
				     <a-select-option value="algorithm">算法导论</a-select-option>
				     <a-select-option value="data strutrue">数据结构</a-select-option>
				    </a-select>
				</div>	
				<div class="problem-block">
					<a-icon class="title-icon" type="caret-right" /><h3>状态</h3>
					<a-radio-group  @change="selectStatus">
				      <a-radio-button value="public">公开</a-radio-button>
				      <a-radio-button value="private">不公开</a-radio-button>
				    </a-radio-group>
				    <a-radio-group @change="selectDifficult" class="second-radio-group">
				      <a-radio-button value="high" class="red-btn">High</a-radio-button>
				      <a-radio-button value="medium" class="yellow-btn">Medium</a-radio-button>
				      <a-radio-button value="low" class="blue-btn">Low</a-radio-button>
				    </a-radio-group>
				</div>	
				<div class="btn-block">
					<button type="button" class="ant-btn ant-btn-primary" >
		             	<span>保存</span>
		             </button>
	            </div>
			</div>
		</div>
		</div>
</template>

<script>
import Editor from './Editor' 
import EditableCell from './EditableCell'
	
export default {
	name: 'multi-textarea',
	components:{
		Editor,
		EditableCell
	},
	data () {
	    return {
	    	  test_span: '',
	    	  test_input: '',
	    	  test_output: '',
	    	  sample_span: '',
	    	  sample_input: '',
	    	  sample_output: '',
	      dataSource1: [],
	      dataSource2: [],
	      count1: 0,
	      count2: 0,
	      columns1: [{
	        title: '输入',
	        dataIndex: 'input',
	        width: '30%',
	        scopedSlots: { customRender: 'input' },
	      }, {
	        title: '输出',
	        dataIndex: 'output',
	        width: '30%',
	        scopedSlots: { customRender: 'output' },
	      }, {
	        title: '标签',
	        dataIndex: 'span',
	        width: '30%',
	        scopedSlots: { customRender: 'span' },
	      }, {
	        title: '操作',
	        dataIndex: 'operation',
	        scopedSlots: { customRender: 'operation' },
	      }],
	      columns2: [{
	        title: '输入',
	        dataIndex: 'input2',
	        width: '30%',
	        scopedSlots: { customRender: 'input2' },
	      }, {
	        title: '输出',
	        dataIndex: 'output2',
	        width: '30%',
	        scopedSlots: { customRender: 'output2' },
	      }, {
	        title: '标签',
	        dataIndex: 'span2',
	        width: '30%',
	        scopedSlots: { customRender: 'span2' },
	      }, {
	        title: '操作',
	        dataIndex: 'operation2',
	        scopedSlots: { customRender: 'operation2' },
	      }],
	    }
	  },
  	methods: {
	    	handleChange(value) {
	      console.log(`Selected: ${value}`);
	    },
	    popupScroll(){
	      console.log('popupScroll');
		},
		selectStatus (value) {
		  console.log(`Selcted: ${value}`);
		},
		selectDifficult(value){
		  console.log(`Selcted: ${value}`);
		},
		selectType(value){
		 console.log(`Selcted: ${value}`);
		},
		handleChange({file, fileList}) {
	      if (file.status !== 'uploading') {
	        console.log(file, fileList);
	      }
		 },
	  	 onCellChange1(key, dataIndex, value) {
	        const dataSource1 = [...this.dataSource1]
	        const target = dataSource1.find(item => item.key === key)
	        if (target) {
	          target[dataIndex] = value
	          this.dataSource1 = dataSource1
	        }
	     },
	  	  onDelete1 (key) {
		      const dataSource1 = [...this.dataSource1]
		      this.dataSource1 = dataSource1.filter(item => item.key !== key)
		   },
		   handleAdd1 () {
		      const { count1, dataSource1 } = this
		      const newData = {
		        key: count1,
		        input: this.test_input,
		        output: this.test_output,
		        span: this.test_span,
		      }
		      this.dataSource1 = [...dataSource1, newData]
		      this.count1 = count1 + 1
		    },
		    onCellChange2(key, dataIndex, value) {
		        const dataSource2 = [...this.dataSource2]
		        const target = dataSource2.find(item => item.key === key)
		        if (target) {
		          target[dataIndex] = value
		          this.dataSource2 = dataSource2
		        }
		     },
		    onDelete2 (key) {
		      const dataSource2 = [...this.dataSource2]
		      this.dataSource2 = dataSource2.filter(item => item.key !== key)
		   },
		    handleAdd2 () {
		      const { count2, dataSource2 } = this
		      const newData = {
		        key: count2,
		        input2: this.sample_input,
		        output2: this.sample_output,
		        span2: this.sample_span,
		      }
		      this.dataSource2 = [...dataSource2, newData]
		      this.count2 = count2 + 1
		    },
	}
}
</script>
    
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title{
	width: 100%;
	height: 3%;
}
.title-text{
	font-size: 20px;
	float: left;
}
.view{
	float: right;
}
.main{
	margin-left: 3%;
	display: block;
}
.bg{
	background-color: white;
	padding-top: 2%;
	padding-bottom: 2%;
}
.problem-title{
	margin-top: 3%;
}
.title-icon{
	float: left;
	font-size: 20px;
}
.ant-input{
	width: 80%;
}
.problem-block{
	margin-top: 2%;
	display: block;
}
#practice_type,#high{
	color: red;
}
#exam_type,#medium{
	color: yellow;
}
#homework_type,#low{
	color: deepskyblue;
}

.limit-input{
	width: 90%;
}
.test-span{
	margin-left: 3%;
	margin-top: 2%;
	display: flex;
}
.test-span-text{
	width: 10%;
	height: 2%;
}
.in-out{
	margin-left: 3%;
	margin-top: 1%;
	width: 80%;
	display: block;
}
.span-input{
	width: 15%;
}
.second-radio-group{
	margin-left: 5%;
}
#preread{
	margin-left: 1%;
}
.btn-block{
	margin-top: 3%;
}
#limit{
	display: flex;
}
.red-btn{
	color: red;
}
.yellow-btn{
	color: yellow;
}
.blue-btn{
	color: deepskyblue;
}
.confirm-btn{
	margin-top: 1%;
}
.in-out-textarea{
	width: 60%;
}

</style>
