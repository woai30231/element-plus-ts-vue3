<template>
    <el-form label-width="120px">
        <el-form-item label="姓名">
            <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
            <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="密码">
            <el-input type="password" v-model="form.password"/>
        </el-form-item>
        <el-button @click="submitForm">提交</el-button>
    </el-form>
    
</template>
<script setup lang="ts">
import {reactive} from 'vue';
import request from '@/utils/request';
interface Form {
    username:string
    age?:number
    email:string
    password:string
}

const form = reactive<Form>({
    username:'',
    email:'',
    password:''
})
const submitForm = ()=>{
    console.log(form)
    const res = request.post("/api/signup",form);
    console.log(res);
}
</script>