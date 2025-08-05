<template>
   <div>
      <div class="mainTop">
         <div class="topHeader">
            <Nav />
            <div class="_right">
               <TopRightOperate />
            </div>
         </div>
      </div>
   <div class="mainContainer" >
      <router-view></router-view>
   </div>
   <el-backtop :right="100" :bottom="100" />
   <LoginPop  v-if="indexLoginPop.showPop"/>
</div>
</template>
<script setup lang="ts">
import {defineAsyncComponent} from 'vue';
import TopRightOperate from '@/components/Topnav/TopRightOperate.vue';
import Nav from '@/components/Topnav/Nav.vue';
import { useIndexLogin } from './stores/pop/indexlogin';
const indexLoginPop = useIndexLogin();
const LoginPop = defineAsyncComponent(()=>{
   return import("@/components/LoginPop.vue")
})



</script>
<style scoped>
.mainTop{
   background:#fff;
   padding:0px;
   /* --el-border-color:#c00; */
   border-bottom:1px solid #dcdfe6;
}
.topHeader{
   max-width:1200px;
   margin:0px auto;
   display:flex;
   align-items:center;
   justify-content:flex-start;
   background-color:#fff;
   padding-right:15px;
   ._right{
      flex:0 1 120px;
      text-align:right;
      display:flex;
      flex-direction:row;
      justify-content:flex-end;
      align-items:center;
   }
}

.mainContainer{
   max-width:1200px;
   margin:0px auto;
   background-color:#fff;
   padding:20px 10px;;
   min-height:500px;
}
</style>
