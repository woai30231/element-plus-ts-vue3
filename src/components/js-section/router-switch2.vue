<template>
    <div style="padding:20px;">
        <el-card style="background:#25d29a;width:400px;height:200px;">
            <el-text size="large">路由2</el-text>
            <el-input v-model="input" type="text" placeholder="输入的数据切换路由会继续保存" />
        </el-card>
    </div>
</template>
<script setup lang="ts">
import {ref} from 'vue';
const input = ref('');
</script>