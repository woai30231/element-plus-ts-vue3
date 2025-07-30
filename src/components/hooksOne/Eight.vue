<template>
    <div>
        <h1>Register Form</h1>
        <el-form :model="formstate" label-width="200px">
            <el-form-item label="Username" :error="errors.username">
                <el-input v-model="formstate.username.value" @blur="validateField('username')" />
            </el-form-item>
            <el-form-item label="Email" :error="errors.email">
                <el-input v-model="formstate.email.value" @blur="validateField('email')"/>
            </el-form-item>
            <el-form-item label="password" :error="errors.password">
                <el-input v-model="formstate.password.value" type="password" @blur="validateField('password')" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm" :disabled="!isFormValid">Submit</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup lang="ts">
import { useForm } from '@/hooks/hooksOne/eight';
import {reactive} from 'vue'
const formstate = reactive({
    username:{
        value:'',
        rules:[
            (value:string)=>(value?undefined:'username is required'),
            (value:string)=>(value.length>=3?undefined:'username must be at least 3 characters long')
        ]
    },
    email:{
        value:'',
        rules:[
            (value:string)=>(value?undefined:'Email is required'),
            (value:string)=>(/.+@.+\..+/.test(value)?undefined:'please enter a valid email address')
        ]
    },
    password:{
        value:'',
        rules:[
            (value:string)=>(value?undefined:'password is required!'),
            (value:string)=>(value.length >= 6?undefined:'password must be at least 6 characters long')
        ]
    }
})
const {errors,validateField,isFormValid} = useForm(formstate);
const submitForm = ()=>{
    if(isFormValid.value){
        console.log("Form submitted",formstate);
    }else{
        console.log("Form validation failed")
    }
}
</script>