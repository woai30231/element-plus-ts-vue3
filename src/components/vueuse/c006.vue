<template>
    <el-button type="primary" @click="handleClick" ref="b500">
        长按我超过500毫秒：{{press500}}
    </el-button>
    <el-button ref="b2000">
        长按我超过2000毫秒：{{press2000}}
    </el-button>
    <el-button type="primary" ref="b2000C">
        长按我超过2000毫秒或者点击了:{{press2000Click}}
    </el-button>
    <el-button @click="reset">重置</el-button>
</template>
<script setup lang="ts">
import {onLongPress} from '@vueuse/core';
import {useTemplateRef,ref} from 'vue';
const b500= useTemplateRef('b500');
const b2000= useTemplateRef('b2000');
const b2000C= useTemplateRef('b2000C');
const press500 = ref(false);
const press2000 = ref(false);
const press2000Click = ref(false);
const handleClick = ()=>{
    press500.value = true;
}
const handl2000Click = ()=>{
    press2000.value = true;
}
const handl2000CClick = ()=>{
    press2000Click.value = true;
}
onLongPress(b500,handleClick,{
    delay:500
})
onLongPress(b2000,handl2000Click,{
    delay:2000
})
onLongPress(b2000C,handl2000CClick,{
    delay:2000,
})
const reset = ()=>{
    press500.value = false;
    press2000.value = false;
    press2000Click.value = false;
}
</script>