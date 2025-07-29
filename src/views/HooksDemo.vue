<template>
    <div>
        <h2>vue hooks使用</h2>
        <el-card>
            <One />
        </el-card>
        <el-card>
            <Two />
        </el-card>
    </div>
</template>
<script setup lang="ts">
import One from '@/components/hooksOne/One.vue';
import Two from "@/components/hooksOne/Two.vue"
</script>