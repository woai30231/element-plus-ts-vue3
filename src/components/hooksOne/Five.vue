<script setup lang="ts">
import { useLocalStorage } from '@/hooks/hooksOne/five';
const username = useLocalStorage('username','');
</script>
<template>
    <el-input v-model="username"  placeholder="请输入用户名"/>
    <p>当前保存的用户名：{{username}}</p>
</template>