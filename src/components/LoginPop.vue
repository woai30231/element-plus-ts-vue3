<template>
    <el-dialog v-model="indexLoginPop.showPop" width="480px"  @close="close" :title="'注册'">
        <div style="padding:10px 20px;">
            <el-form ref="formdataRef" :rules="rules" :model="formdata" width="200px" :label-width="'80px'" :size="'small'">
                <!-- <el-form-item prop="email" label="'邮箱地址'">
                    <el-input v-model="formdata.email" />
                </el-form-item> -->
                <el-form-item prop="name" label="昵称">
                    <el-input v-model="formdata.name" />
                </el-form-item>
                <el-form-item prop="password" label="密码">
                    <el-input type="password" v-model="formdata.password" />
                </el-form-item>
                <el-form-item label="">
                    <el-text size="small" style="color:#aaa;">登录账号：user,密码：123456</el-text>
                </el-form-item>
            </el-form>
            
        </div>
        <template #footer>

            <div>
                <el-button @click="close">取消</el-button>
                <el-button  @click="signup" type="primary">登录</el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import { useToken } from '@/stores/useToken';
import { rules } from '@/utils/Form';
import request from '@/utils/request';
import {ElMessage ,type FormInstance} from 'element-plus'
import { useIndexLogin } from '@/stores/pop/indexlogin';
const indexLoginPop = useIndexLogin();
const formdataRef = ref<FormInstance>();
const token = useToken();
interface Login{
    email?:string;
    name:string;
    password:string
}
const formdata = ref<Login>({
    // email:'',
    name:'',
    password:''
})
const close = ()=>{
    indexLoginPop.handle(false);
}
interface T{
    [key:string]:any
}
interface Res{
    code:number;
    message:string;
    data:T
}
const signup = ()=>{
    formdataRef.value?.validate(async (valid:boolean)=>{
        if(valid){
            const {name:username,password} = formdata.value;
            const res = await request.post<Res>('/token/login',{username,password});
            console.log("登录")
            const _token  = (res.data as any).token;
            token.setToken(_token)
            console.log(res);
            close();
        }else{
            ElMessage.info("请检查所填信息是否有误！")
        }
    })
}
</script>