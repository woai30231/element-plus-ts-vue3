<template>
    <div style="padding:20px;">
        <el-card style="background:#bfd854;width:400px;height:200px;">
            <el-text size="large">路由1</el-text>
            <el-input v-model="input1" type="text" placeholder="输入的数据切换路由会继续保存" />
        </el-card>
    </div>
</template>
<script setup lang="ts">
import {ref} from 'vue';
const input1 = ref('');
</script>