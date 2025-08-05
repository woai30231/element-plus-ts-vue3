<script setup lang="ts">
function identity<T>(arg:T):T{
    return arg;
}
const result = identity<string>("Hello")
</script>
<template>
    <el-card>
        <h3>泛型函数</h3>
        <p>泛型返回值:{{result}}</p>
    </el-card>
</template>