<template>
    <div>
        <h2>ts相关演示</h2>
        <el-menu :default-active="dataIndex+''" mode="horizontal" v-if="lastArr?.length">
            <el-menu-item v-for="item in lastArr" :index="item.path" :key="item.path"><router-link :to="{path:item.path}">{{item.text}}</router-link></el-menu-item>
        </el-menu>
        <router-view></router-view>
    </div>
</template>
<script setup lang="ts">
import {ref,computed} from 'vue';
import {constantRoutes} from '@/router/router';
const rItem = constantRoutes.filter(item=>item.name == 'tsdemo');
const rArr = rItem[0]?.children || [];
const lastArr = rArr.map((item,index)=>{
    let {path,name,meta} = item;
    // if(item.path.includes('TspracticeFore')){
    //     path = '/TspracticeFore/'+Math.floor(Math.random()*100000)
    // }
    return {path,name,text:meta?.title};
})
import {useRoute} from 'vue-router';
console.log(useRoute().path)
const dataIndex = computed(()=>{
   return lastArr.findIndex(item=> useRoute().path.includes(item.path));
})


</script>