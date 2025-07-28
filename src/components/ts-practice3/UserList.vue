<template>
    <div>
        <h1>
            User List
        </h1>
        <el-table :data="users" style="width:540px;">
            <el-table-column prop="name" label="Name" width="180" />
            <el-table-column prop="email" label="Email" width="180" />
            <el-table-column prop="age" label="Age" width="180" />
        </el-table>

        <el-pagination 
            @size-change="handleSizeChange" 
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10,20,30,40]"
            :page-size="pageSize"
            layout="total,sizes,prev,pager,next,jumper"
            :total="total"        
        ></el-pagination>
    </div>
</template>
<script setup lang="ts">
import {ref,computed} from 'vue';
interface User {
    id:number;
    name:string;
    email:string;
    age:number;
}

const usersData :User[] = Array.from({length:100},(_,i)=>({
    id:i+1,
    name:`User ${i +1}`,
    email:`${i+1}@example.com`,
    age:Math.floor(Math.random() * 100)
}))

const total = ref(100);
const currentPage = ref(1);
const pageSize = ref(10);
const handleSizeChange = (size:number)=>{
    pageSize.value = size;
    currentPage.value = 1;
}
const handleCurrentChange = (page:number)=>{
    currentPage.value = page;
}

const users = computed(()=>{
    const start = (currentPage.value -1) * pageSize.value;
    const end = start + pageSize.value;
    return usersData.slice(start,end);
})
</script>