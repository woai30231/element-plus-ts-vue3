<script setup lang="ts">
import {ref} from 'vue';
enum Role {
    Admin,
    Editor,
    Guest
}
let userRole = ref<Role>(Role.Admin);
const selectRole = ():void=>{
    const num = Math.random();
    if(num<0.4){
        userRole.value = Role.Admin;
    }else if(num < 0.7){
        userRole.value = Role.Editor;
    }else{
        userRole.value = Role.Guest;
    }

};
</script>
<template>
<el-card>
    <h3>练习3：枚举类型</h3>
    <p @click="selectRole">用户角色：{{userRole === Role.Admin?"管理员":userRole === Role.Editor ? "编辑员":"访客"}}</p>

</el-card>
</template>