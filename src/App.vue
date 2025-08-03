<template>
   <div :class="themeStyle">
      <div class="mainTop">
         <div class="topHeader">
            <el-menu  style="flex:1 1 100%;border-bottom:0px;" mode="horizontal">
               <el-menu-item v-for="(item,index) in navList" :index="''+index"><router-link :to="{path:item.path}">{{item.text}}</router-link></el-menu-item>
            </el-menu>
            <div class="_right">
               <el-button @click="themeStore.toggleTheme">切换主题</el-button>
               <el-button v-show="1 || !showLoginBtn" @click="indexLoginPop.handle(true)">登录</el-button>
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
import {ref,watch,defineAsyncComponent,computed} from 'vue';
import {useThemeStore} from '@/stores/one/themeStore';
import { useIndexLogin } from './stores/pop/indexlogin';
import { useToken } from './stores/useToken';
const token = useToken();
const showLoginBtn = computed(()=>{
   token.getToken();
   return !!token.token
})
const indexLoginPop = useIndexLogin();
const LoginPop = defineAsyncComponent(()=>{
   return import("@/components/LoginPop.vue")
})

const themeStore = useThemeStore();//获取主题
const themeStyle = computed(()=>{
   return themeStore.darkMode?'dark':'light' 
})
watch(()=>{
   return themeStore.darkMode
},(newValue)=>{
   if(newValue){
      document.body.classList.add('dark')
   }else{
      document.body.classList.remove('dark');
   }
},{immediate:true})
import {constantRoutes} from '@/router/router';
const rArr = constantRoutes.map((item)=>{
   const {path,name,meta} = item;
   return {name,path,text:meta?.title};
}) as routeArrType[];
console.log(rArr);

interface routeArrType {
   name:string;
   path:string;
   text:string
}
const navList = ref<routeArrType[]>(rArr );


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
