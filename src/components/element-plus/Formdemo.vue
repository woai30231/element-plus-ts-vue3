<template>
    <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
        <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
            <el-input-number v-model="form.age"></el-input-number>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="form.gender">
                <el-radio :value="1">男</el-radio>
                <el-radio :value="2">女</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
        </el-form-item>
    </el-form>
</template>
<script setup lang="ts">
import {ref,reactive } from 'vue';
import type { FormInstance ,FormRules} from 'element-plus';

//定义表单数据类型
interface FormData{
    username:string;
    age:number | null;
    gender:number | null;
}

const form = reactive<FormData>({
    username:'',
    age:null,
    gender:null
})

const rules = reactive<FormRules>({
    username:[
        {required:true,message:'请输入用户名',trigger:'blur'},
        {min:3,max:20,message:'长度在3到20个字符串',trigger:'blur'}
    ],
    age:[
        {
            required:true,message:'请输入年龄',trigger:'blur'
        },{
            type:'number',message:'年轻必须为数字值',trigger:'blur'
        }
    ]
})

const formRef = ref<FormInstance>();
//提交表单
const submitForm = ()=>{
    formRef.value?.validate((valid)=>{
        if(valid){
            console.log("表单数据:",form)
        }else{
            console.log("表单验证失败")
            // return false;
        }
    })
}

//重置表单
const resetForm = ()=>{
    formRef.value?.resetFields();
}
</script>