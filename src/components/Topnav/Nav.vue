<template>
    <el-menu :default-active="$route.path" :router="true" style="flex:1 1 100%;border-bottom:0px;" mode="horizontal">
        <el-menu-item v-for="(item,index) in navList" :key="index" :index="item.path">{{item.text}}</el-menu-item>
    </el-menu>
</template>
<script setup lang="ts">
import {ref,watch} from 'vue';
import {useI18n} from 'vue-i18n';
// import {useRoute} from 'vue-router';
const {t,locale} = useI18n();
watch(locale,()=>{
   navList.value[0].text = t('nav.indextitle');
})
interface routeArrType {
   name:string;
   path:string;
   text:string
}
const navList = ref<routeArrType[]>([
   {
      path:'/',
      name:'Home',
      text:t('nav.indextitle')
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