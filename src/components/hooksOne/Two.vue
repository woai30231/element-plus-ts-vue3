<template>
<div v-if="loading">加载中……</div>
<div v-else-if="loading" style="color:red;">{{error}}</div>
<ul v-else>
    <li v-for="user in data" :key="user.id">
        {{user.name}} - {{user.email}}
    </li>
</ul>
</template>
<script setup lang="ts">
import { useFetchData } from '@/hooks/userFetch';
interface User{
    id:number;
    name:string;
    email:string;
}   
const {data,loading,error} = useFetchData<User[]>('/api/userlist');
</script>
