<script setup lang="ts">
import {onMounted,ref} from 'vue';
import {useRoute,useRouter} from 'vue-router';
import {constantRoutes} from '@/router/router';
const rArr = constantRoutes.map((item)=>{
   const {path,name,meta} = item;
   return {name,path,text:meta?.title};
}) as routeArrType[];
console.log(typeof rArr);
const routes = useRoute();
const router = useRouter();
interface routeArrType {
   name:string;
   path:string;
   text:string
}
const navList = ref<routeArrType[]>(rArr );

onMounted(()=>{
   console.log(routes)
   console.log(router)
})
</script>

<template>
   <div>
      <el-menu  mode="horizontal">
         <el-menu-item v-for="(item,index) in navList" :index="''+index"><router-link :to="{path:item.path}">{{item.text}}</router-link></el-menu-item>
      </el-menu>
   <div style="padding-top:30px;">
      <router-view></router-view>
   </div>

</div>
</template>

<style scoped>

</style>
