<template>
    <el-checkbox-group @change="handleChange" v-model="checkList">
      <el-checkbox label="Option A" value="Option A"/>
      <el-checkbox label="Option B" value="Option B" />
      <el-checkbox label="Option C" value="Option c"/>
      <el-checkbox label="disabled" value="disabled" disabled />
      <el-checkbox label="selected and disabled" value="selected and disabled" disabled />
    </el-checkbox-group>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  const handleChange = (v:any)=>{
    console.log(v)
  }
  
  const checkList = ref(['selected and disabled', 'Option A'])
  </script>
  