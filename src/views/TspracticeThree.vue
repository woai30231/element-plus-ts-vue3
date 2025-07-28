<template>
<div>
    <h1>ts 组件化项目演示</h1>
    <el-card>
        <RegisterForm ref="childForm" />
        <el-button @click="handleClick">点击</el-button>
    </el-card>
</div>
</template>
<script setup lang="ts">
import RegisterForm from '@/components/ts-practice3/RegisterForm.vue';
import {ref,onMounted} from 'vue';
const childForm = ref<InstanceType<typeof RegisterForm> | null>(null);
const handleClick = ()=>{
    childForm.value?.submitForm();
    console.log(childForm.value?.form);
}
onMounted(()=>{
    
})
</script>