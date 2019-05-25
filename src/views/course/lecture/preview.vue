<template>
  <div>
    <div class="head">
      <div>{{ lectureName }}</div>
    </div>
    <div class="body">
      <div class="detail">
        <div class="text">课程描述</div>
        <div class="des">{{ lectureDes }}</div>
      </div>
      <div class="detail">
        <div class="text">附件</div>
        <div class="problem">
          <ul v-for="item in files" :key="item">
            <div @click="() => downloadfile(item.filename,item.fileurl)">{{ item.filename }}</div>
          </ul>
        </div>
      </div>
      <div class="detail">
        <div class="text">练习题</div>
        <div class="problem">
          <ul v-for="item in problems" :key="item">
            <div @click="() => openproblem(item.problemcode)">{{ item.problemcode }}:{{ item.problemname }}</div>
          </ul>
        </div>
      </div>
      <div class="select">
        <a-button class="btn" type="dashed" @click="editpage">编辑</a-button>
        <a-button class="btn" type=primary @click="sure">确定</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data () {
        return{
            url:'',
            lectureid: 1,
            lectureName:'第一课时：排序和查找',
            lectureDes:'这是一节非常重要的课，希望同学们呢认真掌握',
            problems:[
                {
                    problemcode:'1',
                    problemname:'排序' 
                },
                {
                    problemcode:'1',
                    problemname:'排序' 
                }
                
            ],
            files:[
                {
                    filename:'第一个ppt',
                    fileurl:''
                },
                {
                    filename:'第一个ppt',
                    fileurl:''
                }

            ]
        }
    },
    methods:{
        editpage () {
            
        },
        sure () {

        },
        downloadfile (name,url) {
            url = window.URL.createObjectURL(url)
            const link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            link.setAttribute('download', name)
            document.body.appendChild(link)
            link.click()
        },

        openproblem (code) {
            console.log(code)
        }
        

    },
    created: function(){``
        axios.get(this.url,{
            params: {
                lecture_id: this.lectureid
            }
        })
        .then(response => {
            this.lectureName = response.data.name
            this.lectureDes = response.data.desctiption
            const problemslist = response.data.problems
            this.problems =  []
            for(let i = 0; i < problemslist.length; i++){
                this.problems.push({
                    'problemcode':problemslist[i].probllem_id,
                    'problemname':problemslist[i].problem_name
                })
            }
        })
    }
}
</script>

<style>
    .head{
        font-size: 20px;
        font-weight: bold;
        margin:50px
    }
    .text{
        font-size:17px;
        font-weight: bold
    }
    .detail{
        margin:50px
    }
    .btn{
        margin-right: 20px
    }
    .select{
        margin-left: 60%;
        margin-bottom: 10%
    }
    .problem{
        margin-top: 10px
    }
    .des{
        margin-top: 10px
    }
</style>
