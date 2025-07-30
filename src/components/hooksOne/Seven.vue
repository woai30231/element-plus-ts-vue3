<script setup lang="ts">
import {useFetch} from '@/hooks/hooksOne/seven'
interface User{
    id:number;
    name:string;
    email:string;
}
const {data,loading,error} = useFetch<User>({
    url:'/api/userlist'
});
</script>
<template>

    <div>
        <h1>Users list</h1>
        <el-table :data="data" style="width:100%">

            <el-table-column prop="id" width="100" label="ID"></el-table-column>
            <el-table-column prop="name" width="100" label="Name"></el-table-column>
            <el-table-column prop="email" width="100" label="Email"></el-table-column>
        </el-table>
        <p v-if="loading">loading……</p>
        <p v-else-if="error">Error:{{error.message}}</p>
    </div>
</template>