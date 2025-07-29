<template>
    <div>
        <input v-model="searchQuery" placeholder="输入姓名搜索" />
        <ul>
            <li v-for="user in filteredItems" :key="user.id">
                {{user.name}} - {{user.role}}
            </li>
        </ul>
    </div>
</template>
<script setup lang="ts">
import { useSearchFilter } from '@/hooks/hooksOne/three';
interface User {
    id:number;
    name:string;
    role:string;
} 
const users = [
    {id:1,name:'Alice',role:'admin'},
    {id:2,name:'Bob',role:'editor'},
    {id:3,name:'Charlie',role:'guest'}
];

const {searchQuery,filteredItems} = useSearchFilter<User>(users,'name');
</script>