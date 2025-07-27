<template>
    <div>
        <h1>Element Plus Components</h1>
        <el-input v-model="inputValue" placeholder="Enter something"></el-input>
        <el-button @click="handleClick">Submit</el-button>
        <el-table :data="users" style="width:360px;">
            <el-table-column prop="name" label="Name" width="180"></el-table-column>
            <el-table-column prop="email" label="Email" width="180"></el-table-column>
        </el-table>
        <el-form @submit.prevent="addUser">
            <el-form-item label="Name">
                <el-input v-model="newUserName" />
            </el-form-item>
            <el-form-item label="Email">
                <el-input v-model="newUserEmail" />
            </el-form-item>
            <el-button type="primary" native-type="submit">Add User</el-button>
        </el-form>
    </div>
</template>
<script setup lang="ts">
import {ref} from 'vue';
const inputValue = ref('');
const users = ref([
    {name:'Alice',email:'alice@example.com'},
    {name:'Bob',email:'bob@example.com'}
])
const handleClick = ()=>{
    console.log("Input Value:",inputValue.value);
}
const newUserName = ref('');
const newUserEmail = ref('');
const addUser = ()=>{
    if(newUserName.value && newUserEmail.value){
        users.value.push({name:newUserName.value,email:newUserEmail.value});
        newUserName.value = '';
        newUserEmail.value = '';
    };
}
</script>