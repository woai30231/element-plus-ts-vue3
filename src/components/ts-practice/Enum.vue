<template>
    <div>
        <h1>Enums</h1>
        <p>User Role:{{userRole}}</p>
        <el-select @change="getPermissions(selectValue as UserRole)"  v-model="selectValue">
            <el-option v-for="item in selectArr" :label="item" :value="item"></el-option>
        </el-select>
        <!-- <p>Permissions:{{getPermissions(userRole)}}</p> -->

    </div>
</template>
<script setup lang="ts">
import {ref} from 'vue'
enum UserRole {
    Admin = 'admin',
    Editor = 'editor',
    Viewer = 'viewer'
};
const userRole = ref<UserRole>(UserRole.Admin);
console.log("userRole")
console.log(userRole)
const selectArr = ref<string[]>([
    'admin','editor','viewer'
])
const selectValue = ref<string>('');
const getPermissions = (role:UserRole):string=>{
    console.log(role)
    switch(role){
        case UserRole.Admin:
            userRole.value = UserRole.Admin;
            return "Full access to all features";
        case UserRole.Editor:   
            userRole.value = UserRole.Editor;
            return "Can edit content";
        case UserRole.Viewer:
            userRole.value = UserRole.Viewer;
            return 'Can only view content';
        default :
            return "UnKnown role"
    }
}
</script>