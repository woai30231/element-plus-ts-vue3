<template>
    <el-card>
        <h3>练习1：基础类型</h3>
        <p>姓名：{{name}}</p>
        <p>年龄：{{age}}</p>
        <p>是否学生：{{isStudent?"是":"否"}}</p>
        <p>职业：{{job??'未填写'}}</p>
        <p>爱好：{{hobby??"未填写"}}</p>
    </el-card>
</template>
<script setup lang="ts">
let name:string = 'Alice';
let age :number = 25;
let isStudent :boolean = true;
let job:string | null = null;
let hobby:string | undefined = undefined;

</script>