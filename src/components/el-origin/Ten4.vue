<template>
    <div style="text-align:left;">
        <el-statistic title="Total Transactions" :value="outputValue" />

        <el-affix :offset="120">
            <el-button type="success">offset top 120px</el-button>
        </el-affix>

        <el-backtop :right="100" :bottom="100" />

        <el-steps :active="step">
            <el-step title="step1" icon="Delete"></el-step>
            <el-step title="step2"></el-step>
            <el-step title="step3"></el-step>
        </el-steps>
        <el-button type="primary" @click="next" icon="Delete">next</el-button>

            <el-icon color="#c00" size="50" icon="Delete">
                <Delete />
            </el-icon>
    </div>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import {useTransition} from '@vueuse/core';
const source = ref(0);
const outputValue = useTransition(source,{
    duration:1500
})
source.value = 172000;
const step = ref<number>(0);
const next = ()=>{
    console.log(step.value);
    if(step.value >= 3){
        step.value =1;
    }else{
        step.value += 1;
    }
}
</script>