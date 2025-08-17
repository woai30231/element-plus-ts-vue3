<template>
    <!-- <el-text>c008</el-text> -->
    <el-text>{{name}}</el-text>
    <el-text>{{address.bh}}</el-text>
    <el-text>{{address.addr}}</el-text>
    <el-button @click="changeUser">修改</el-button>
    <el-text>{{name}}</el-text>
    <el-text>{{user.address.bh}}</el-text>
    <el-text>{{user.address.addr}}</el-text>
</template>
<script setup lang="ts">
// console.log(abc)
import {reactive} from 'vue';
const user = reactive({
    name:'xiaoming',
    address:{
        bh:'124',
        addr:'城南'
    }
})
const {name,address} = user;
const changeUser = ()=>{
    // name = 'xiaohog';
    address.bh = '23424',
    address.addr = '城北'
}
</script>