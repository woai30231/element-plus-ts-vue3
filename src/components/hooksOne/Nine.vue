<template>
    <div>
        <p>当前count值：{{count}}</p>
        <el-button-group>
            <el-button @click="increment">
                加-
            </el-button>
            <el-button @click="decrement">
                减一
            </el-button>
            <el-button @click="reset">
                重置
            </el-button>
        </el-button-group>
    </div>
</template>
<script setup lang="ts">
import { useCounter } from '@/hooks/hooksOne/nine';
const {count,reset,increment,decrement} = useCounter(8);
</script>