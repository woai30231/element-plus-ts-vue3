<template>
    <div>
        <h1>Composition API</h1>
        <p>Count:{{count}}</p>
        <p>Double Count:{{doubleCount}}</p>
        <el-button @click="increment">Increment</el-button>
    </div>
</template>
<script setup lang="ts">
import {ref,computed,watch} from 'vue';
const count = ref(0);
const increment = ()=>{count.value++};
const doubleCount = computed(()=>{
    return count.value * 2;
})
watch(count,(newValue,oldValue)=>{
    console.log(`Count changed from ${oldValue} to ${newValue}`);
})
</script>