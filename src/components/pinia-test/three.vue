<template>
    <el-switch :value="darkMode" 
    active-text="深色模式"
    inactive-text="浅色模式"
    @change="toggleTheme"
    ></el-switch>
</template>
<script setup lang="ts">
import { useThemeStore } from '@/stores/one/themeStore';
import { storeToRefs } from 'pinia';

const themeStore = useThemeStore();
const { darkMode } = storeToRefs(themeStore); // 使用 storeToRefs 获取响应式引用
const toggleTheme = themeStore.toggleTheme;

</script>