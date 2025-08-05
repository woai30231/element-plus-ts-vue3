<template>
    <div style="padding:20px 40px;padding-left:10px;">
        <el-container>
            <el-aside width="auto" max-width="180px">
                <el-switch 
                    :active-text="'展开'"
                    :inactive-text="'折叠'"
                    v-model="isCollapse"
                ></el-switch>
                <el-menu :router="true" :collapse="!isCollapse" :default-active="$route.name" mode="vertical" max-width="180px">
                    <el-menu-item v-for="item in lastArr" :index="item.path" :key="item.name">
                        <el-icon><Position /></el-icon>
                        <span>{{item.text}}</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main style="padding-left:15px;">
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>
<script setup lang="ts">
// import {computed} from 'vue';
import {ref} from 'vue';
import {constantRoutes} from '@/router/router';
const rItem = constantRoutes.filter(item=>item.name == 'tsdemo');
const rArr = rItem[0]?.children || [];
const lastArr = rArr.map((item,_index)=>{
    let {path,name,meta} = item;
    return {path,name,text:meta?.title};
})
const isCollapse = ref<boolean>(true);


</script>