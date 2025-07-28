<template>
    <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
        <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" />
        </el-form-item>
        <el-button @click="submitForm">提交</el-button>

    </el-form>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import request from '@/utils/request';
interface Form{
    username:string;
    email:string;
    password:string
}
const form = ref<Form>({
    username:'',
    email:'',
    password:''
})
const formRef = ref();
const rules = {
    username:[
        {required:true,message:'请输入用户名',trigger:'blur'}
    ],
    password:[
        {type:'password',required:true,message:'请输入你的密码',trigger:'blur'}
    ],
    email:[
        {type:'email',required:true,message:'请输入正确的邮箱',trigger:'blur'}
    ]
}
const submitForm = ()=>{
   formRef.value.validate((valid:boolean)=>{
        if(valid){
            console.log(form)
            const res = request.post('/api/signup',form.value);
            console.log(res)
        }else{
            alert("表单验证失败")
        }

   })
}
</script>