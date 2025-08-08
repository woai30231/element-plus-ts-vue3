<template>
    <div>
        <h3>子组件2</h3>
        <p>{{child2}}</p>
        <el-button @click="emits('toP2','我是老二')">传父</el-button>
    </div>
</template>
<script setup lang="ts">
import {defineProps,defineEmits} from 'vue';
const props = defineProps(['child2']);
const emits = defineEmits(['toP2'])

</script>