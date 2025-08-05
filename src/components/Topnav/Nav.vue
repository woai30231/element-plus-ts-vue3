<template>
    <el-menu :default-active="$route.path" :router="true" style="flex:1 1 100%;border-bottom:0px;" mode="horizontal">
        <el-menu-item v-for="(item,index) in navList" :key="index" :index="item.path">{{item.text}}</el-menu-item>
    </el-menu>
</template>
<script setup lang="ts">
import {ref} from 'vue';
// import {useRoute} from 'vue-router';
interface routeArrType {
   name:string;
   path:string;
   text:string
}
const navList = ref<routeArrType[]>([
   {
      path:'/',
      name:'Home',
      text:'首页'
   },
   {
      path:'/jssection',
      name:'jssection',
      text:'Javascript'
   },
   {
      path:'/element-plus',
      name:'element-plus',
      text:'Element-plus'
   },
   {
      path:'/HooksDemo',
      name:'HooksDemo',
      text:'Hooks'
   },
   {
      path:'/tsdemo',
      name:'tsdemo',
      text:'Typescript',
   }
])
</script>