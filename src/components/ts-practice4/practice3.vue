<template>
    <el-table :data="users" border style="width:100%">
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
                <el-button @click="editUser(scope.row)">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
<script setup lang="ts">
import {ref} from 'vue';
interface User {
    id:number;
    name:string;
    age:number
}

const users = ref<User[]>([
    {id:1,name:'张三',age:25},
    {id:2,name:'李四',age:30}
])
const editUser = (user:User)=>{
    console.log(user)
    console.log(`正在编辑用户：${user.name}`)
    const index = users.value.findIndex((item)=>item.id == user.id);
    console.log(index);
    users.value.splice(index,1)
}
</script>