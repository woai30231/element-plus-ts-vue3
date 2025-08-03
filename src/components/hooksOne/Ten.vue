<script setup lang="ts">
import { useFetchUser } from '@/hooks/hooksOne/ten';
import {onMounted} from 'vue';
interface User{
    address:string;
    name:string;
    email:string;
}
const {data:user,getData} = useFetchUser<User>({url:'/api/user',data:{id:'1888'}});
onMounted(()=>{
    getData();
})
</script>
<template>
    <div>
        <p>user信息如下</p>
        <template v-if="user">
            <el-row>{{user.name}}</el-row>
            <el-row>{{user.email}}</el-row>
            <el-row>{{user.address}}</el-row>
        </template>
    </div>
</template>

