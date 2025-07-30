<script setup lang="ts">
import {ref,computed,watch} from 'vue';
import {useThemeStore} from '@/stores/one/themeStore';
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

<template>
   <div :class="themeStyle">
      <div class="topHeader">
         <el-menu  style="flex:1 1 100%;" mode="horizontal">
            <el-menu-item v-for="(item,index) in navList" :index="''+index"><router-link :to="{path:item.path}">{{item.text}}</router-link></el-menu-item>
         </el-menu>
         <div class="_right">
            <el-button @click="themeStore.toggleTheme">切换主题</el-button>
         </div>
      </div>
   <div style="padding-top:30px;">
      <router-view></router-view>
   </div>

</div>
</template>

<style scoped>
.topHeader{
   display:flex;
   align-items:center;
   justify-content:flex-start;
   ._right{
      flex:120px;
      text-align:right;
   }
}
</style>
