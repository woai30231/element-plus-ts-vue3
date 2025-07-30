<template>
    <el-input v-model="searchQuery" @input="handleInput" placeholder="输入搜索内容" />
</template>
<script setup lang="ts">
import { useDebounce } from '@/hooks/hooksOne/hook11';
const [searchQuery,handleInput] = useDebounce('',500);
</script>