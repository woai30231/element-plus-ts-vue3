<template>
    <div>
        <h2>vue hooks使用</h2>
        <el-card>
            <One />
        </el-card>
        <el-card>
            <Two />
        </el-card>
        <el-card>
            <Three />
        </el-card>
        <el-card>
            <Four />
        </el-card>
        <el-card>
            <Five />
        </el-card>
    </div>
</template>
<script setup lang="ts">
import One from '@/components/hooksOne/One.vue';
import Three from '@/components/hooksOne/Three.vue';
import Two from "@/components/hooksOne/Two.vue"
import Four from '@/components/hooksOne/Four.vue'
import Five from '@/components/hooksOne/Five.vue';
</script>