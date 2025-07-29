<script setup lang="ts">
import {useFormValidation} from '@/hooks/hooksOne/one';
interface LoginForm {
    username:string;
    password:string;
}

const {formData,errors,validateForm} = useFormValidation<LoginForm>({
    username:'',
    password:''
})
function login(){
    const rules = {
        username:(val:string)=>val.trim() === ''?'用户名不能为空':null,
        password:(val:string)=>val.length<6?'密码至少6位':null
    };
    if(validateForm(rules)){
        alert("验证通过，可以提交");
    }
}
</script>

<template>
    <div>
        <input v-model="formData.username" placeholder="用户名"/>
        <span v-if="errors.username" style="color:red">{{errors.username}}</span>
        <input v-model="formData.password" placeholder="密码" />
        <span v-if="errors.password" style="color:red;">{{errors.password}}</span>
        <button @click="login">登录</button>
    </div>
</template>