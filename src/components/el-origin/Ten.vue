<template>
   <div class="m-4">
    <el-rate v-model="value" size="large" allow-half />
   </div>
</template>
<script setup lang="ts">
import {ref,watch} from 'vue';
const value = ref(3); 
watch(value,()=>{
    console.log(value.value);
})
</script>