<template>
    <div>
        <h2>element-plus</h2>
        <el-menu mode="horizontal">
            <el-menu-item v-for="route in routeArr" :index="route.path" :key="route.path"><router-link :to="{name:route.name}">{{route.text}}</router-link></el-menu-item>
        </el-menu>
        <router-view></router-view>
    </div>
</template>
<script setup lang="ts">
import {constantRoutes} from '@/router/router'
const elementplusItem = constantRoutes.filter(item=>item.name == 'element-plus');
const itemChild = elementplusItem[0].children;
const routeArr = itemChild?.map(item=>{
    const {path,name,meta} = item;
    return {path,name,text:meta?.title};
})
</script>