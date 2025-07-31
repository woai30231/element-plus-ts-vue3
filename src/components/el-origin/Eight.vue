<template>
    <div class="demo-color-block">
      <span class="demonstration">With default value</span>
      <el-color-picker  v-model="color1" />
    </div>
    <div class="demo-color-block">
      <span class="demonstration">With no default value</span>
      <el-color-picker  v-model="color2" />
    </div>

    <input type="color" value="#ff0000" />
  </template>
  
  <script lang="ts" setup>
  import { ref,watchEffect } from 'vue'
  
  const color1 = ref('#409EFF')
  const color2 = ref()

  watchEffect(()=>{
    console.log(color2.value)
  })
  </script>
  
  <style>
  .demo-color-block {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }
  .demo-color-block .demonstration {
    margin-right: 16px;
  }
  </style>
  