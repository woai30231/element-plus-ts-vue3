<template>
    <el-button @click="showBtn = !showBtn" >点击删除按钮</el-button>
    <el-button v-if="showBtn" ref="btnRef">按钮</el-button>
</template>
<script setup lang="ts">
import {onElementRemoval} from '@vueuse/core';
import {ref, useTemplateRef } from 'vue';
const target = useTemplateRef<HTMLElement>('btnRef');
const showBtn = ref<boolean>(true);
onElementRemoval(target,()=>{console.log('dom被删除了')})
</script>