<template>
    <div>
        <h2>Pinia状态管理库</h2>
        <el-card>
            <One />
        </el-card>
        <el-card>
            <Two />
        </el-card>
        <el-card>
            <Three></Three>
        </el-card>
    </div>
</template>
<script setup lang="ts">
import One from '@/components/pinia-test/one.vue';
import Two from "@/components/pinia-test/two.vue"
import Three from '@/components/pinia-test/three.vue'
</script>