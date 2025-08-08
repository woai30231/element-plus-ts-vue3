<template>
    <div>
        <h3>子组件1</h3>
        <p>{{child1}}</p>
        <el-button @click="emits('toP1','我是老一')">传父</el-button>
    </div>
</template>
<script setup lang="ts">
import {defineProps,defineEmits,inject} from 'vue';
const props = defineProps(['child1']);
const emits = defineEmits(['toP1'])
const child :{name:string} |undefined = inject('parent');
console.log("父亲provide："+child!.name)
</script>