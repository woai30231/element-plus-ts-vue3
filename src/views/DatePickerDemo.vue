<template>
    <div>
        <el-date-picker
            v-model="date"
            type="date"
            placeholder="选择日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            @change="handleChange"
        />

        <el-date-picker 
            v-model="dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            @change="handleChange"
        />
    </div>
</template>
<script setup lang="ts">
import {ref} from 'vue';
//单个日期
const date = ref<string | null>(null)
//日期范围
const dateRange = ref<string[]| null>(null)
const handleChange = ()=>{
    console.log("单选日期:",date)
    console.log("单选日期:",date.value)
    console.log("时间范围:",dateRange)
    console.log("时间范围:",dateRange.value)
}
</script>