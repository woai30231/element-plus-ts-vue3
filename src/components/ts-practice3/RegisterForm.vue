<template>
    <div>
        <h1>Register Form</h1>
        <el-form :model="form" :rules="rules" ref="registerForm" label-width="100px">

            <el-form-item label="Username" prop="username">
                <el-input v-model="form.username" />
            </el-form-item>
            <el-form-item label="Email" prop="email">
                <el-input v-model="form.email" />
            </el-form-item>
            <el-form-item label="Password" prop="password">
                <el-input v-model="form.password" type="password" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">Submit</el-button>
            </el-form-item>
        </el-form>

        <form action="/api/signup" method="POST">
            <input type="text" v-model="form.username" name="username"/>
            <input type="text" v-model="form.email" name="email"/>
            <input type="password" v-model="form.password" name="password"/>
            <input type="submit" text="提交" />
        </form>
    </div>
</template>
<script setup lang="ts">
import {ref,reactive,defineExpose} from 'vue';
import request from '@/utils/request';
import {  type RegisterForm } from '@/types/ts-practice1/type1';
const rules  = {
    username :[
        {required:true,message:'Please input your username',trigger:'blur'},
        {min:3,max:50,message:'Length should be between 3 and 50',trigger:'blur'}
    ],
    email:[
        {required:true,message:'Please input your email',trigger:'blur'},
        {type:'email',message:'Please enter a valid email address',trigger:'blur'}
    ],
    password:[
        {required:true,message:'Please input your password',trigger:'blur'},
        {min:6,message:'Password must be at least 6 characters long',trigger:'blur'}
    ]
}
const form = reactive<RegisterForm>({
    username:'',
    email:'',
    password:''
})
const registerForm = ref(null);

const submitForm = ()=>{
    (registerForm.value as any).validate(async (valid :boolean) =>{
        if(valid){
            console.log("Form submitted;",form);
            const {username,email,password} = form;
            const formdata = new FormData();
            formdata.append("username",username);
            formdata.append("email",email);
            formdata.append("password",password);
            const res = await request.post('/api/signup',formdata);
            console.log(res);
        }else{
            console.log("Form validation failed");
            return false;
        }
    })
}
defineExpose({
    submitForm,
    form
})
</script>