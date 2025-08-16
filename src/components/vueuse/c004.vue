<template>
    <el-row style="width:400px;">
        <el-input v-model="iValue" type="text" placeholder="只要键盘开始输入数字和字母这里就会自动触发焦点" ref="input1"/>
    </el-row>
</template>
<script setup lang="ts">
import {ref} from 'vue'
import { onStartTyping } from '@vueuse/core';
import { useTemplateRef } from 'vue';
const input1 = useTemplateRef<HTMLInputElement>('input1');
const iValue = ref('')
onStartTyping(()=>{
    console.log("键盘输入了？")
    if(document.activeElement !== input1.value){
        input1.value!.focus();
    }
})
</script>