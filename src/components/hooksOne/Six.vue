<template>
    <div>
        <div v-if="data">数据：{{data}}</div>
        <el-button @click="operate">{{isLoading?'正在请求数据中……':'模拟请求接口'}}</el-button>
    </div>
</template>
<script setup lang="ts">
import { useLoading } from '@/hooks/hooksOne/six';
interface User{
    name:string;
    email:string;
    age:number;
}
const {isLoading,data,operate} = useLoading<User>();
</script>