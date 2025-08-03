<template>
    <div class="jssection">
        <el-container>
            <el-aside class="_aside" width="auto">
                <el-radio-group v-model="isCollapse">
                    <el-radio-button :label="'展开'" :value="false" />
                    <el-radio-button :label="'折叠'" :value="true" />
                </el-radio-group>
                <el-menu :default-active="$route.name" class="navMenu" :collapse="isCollapse" :mode="'vertical'" min-height="300px" :router="true">
                    <el-menu-item  v-for="lItem in navList" :key="lItem.name" :route="lItem" :index="lItem.name">
                        <el-icon><ArrowRight /></el-icon><span>{{lItem.text}}</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import type{Nav} from '@/types/common/nav';
const isCollapse = ref<boolean>(false)
const navList = ref<Nav[]>([
    {
        path:'/tssection/virtual-scroll-list',
        name:'VirtualScrollList',
        text:'虚拟滚动列表实现'
    },
    {
        path:'/jssection/tree-data-structure',
        name:'treeDataStructureShow',
        text:'树形结构大量数据展示'
    },
    {
        path:'/jssection/debounce-and-throttle',
        name:'debounceandthrottle',
        text:'防抖和节流'
    },
    {
        path:'/jssection/iterator',
        name:'iterator',
        text:'es6可遍历对象'
    },
    {
        path:'/jssection/destructuring',
        name:'destructuring',
        text:'es6解构介绍'
    }
])
</script>
<style scoped lang="scss">
.jssection{
    --el-menu-item-height:40px;
    ._aside{
        text-align:left;
    }
}
.navMenu{
    padding-right:20px;
    overflow:hidden;
}
</style>