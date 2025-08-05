<script setup lang="ts">
interface User{
    id:number;
    name:string;
    email?:string;
    role:Role ;
}
enum Role {
    Admin,
    Editor,
    Guest
}

const user:User = {
    id:1,
    name:'John',
    role:Role.Editor
}

</script>
<template>
<el-card>
    <h3>接口和对象类型</h3>
    <p>ID:{{user.id}}</p>
    <p>姓名：{{user.name}}</p>
    <p>角色：{{user.role === Role.Admin ? "管理":user.role === Role.Editor?'编辑员':'访客'}}</p>
</el-card>
</template>