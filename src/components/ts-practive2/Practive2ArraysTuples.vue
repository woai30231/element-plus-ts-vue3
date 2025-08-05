<script setup lang="ts">
let fruits:string[] = ['苹果','香蕉','橛子'];
let numbers:Array<number> = [1,2,3];

let person:[string,number] = ['Tom',20];
</script>
<template>
    <el-card>
        <h3>数组和元组</h3>
        <p>水果列表：{{ fruits.join(", ") }}</p>
        <p>数字列表：{{ numbers.join(", ") }}</p>
        <p>元组列表：{{ person[0] }} - {{person[1]}}</p>
    </el-card>
</template>