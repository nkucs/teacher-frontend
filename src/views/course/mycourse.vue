<template>
  <a-layout id="components-layout-demo-top" class="layout">
    <a-layout-header style="background: #fff; padding: 50px">
      
    <p style="font-size:25px">我的课程</p>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <div style="padding: 80px;">
        <div style="padding: 20px;">
          <div class="title">当前学期课程</div>
        </div>
        <a-row :gutter="16">
           <a-col :span="8">
               <a-card title="算法导论" :bordered=false>
                  <a slot="extra">2019年春季学期</a>
                 <p>内容介绍</p>
                 <template class="ant-card-actions" slot="actions">
                   <a href="#">编辑</a>                  
                    <a href="#">详情</a>
                  <a-dropdown>
                    <a class="ant-dropdown-link" href="#">更多<a-icon type="down" /></a>
                      <a-menu slot="overlay">
                      <a-menu-item>
                      <a href="javascript:;">1st menu item</a>
                      </a-menu-item>
                      <a-menu-item>
                      <a href="javascript:;">2nd menu item</a>
                      </a-menu-item>
                      </a-menu>
                  </a-dropdown>
                 </template>
                </a-card>
           </a-col>
           
           <a-col :span="8">
           <a-card title="Java语言与应用" :bordered=false>
                  <a slot="extra">2019年春季学期</a>
                 <p>内容介绍</p>
                 <template class="ant-card-actions" slot="actions">
                   <a href="#">编辑</a>                  
                    <a href="#">详情</a>
                  <a-dropdown>
                    <a class="ant-dropdown-link" href="#">更多<a-icon type="down" /></a>
                      <a-menu slot="overlay">
                      <a-menu-item>
                      <a href="javascript:;">1st menu item</a>
                      </a-menu-item>
                      <a-menu-item>
                      <a href="javascript:;">2nd menu item</a>
                      </a-menu-item>
                      </a-menu>
                  </a-dropdown>
                 </template>
                </a-card> 
           </a-col>
           
        </a-row>
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>
<style>
.title{
  font-size: 20px;
}
</style>
