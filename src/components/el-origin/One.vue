<template>
    <el-row :gutter="12" class="demo-radius">
      <el-col
        v-for="(radius, i) in radiusGroup"
        :key="i"
        :span="6"
        :xs="{ span: 12 }"
      >
        <div class="title">{{ radius.name }}</div>
        <div class="value">
          <code>border-radius: {{ getValue(radius.type) || '0px' }}</code>
        </div>
        <div
          class="radius"
          :style="{
            borderRadius: radius.type
              ? `var(--el-border-radius-${radius.type})`
              : '',
          }"
        />
      </el-col>
    </el-row>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  
  const radiusGroup = ref([
    {
      name: 'No Radius',
      type: '',
    },
    {
      name: 'Small Radius',
      type: 'small',
    },
    {
      name: 'Large Radius',
      type: 'base',
    },
    {
      name: 'Round Radius',
      type: 'round',
    },
  ])
  
  const getValue = (type: string) => {
    const getCssVarValue = (prefix:string, type:string) =>
      getComputedStyle(document.documentElement).getPropertyValue(
        `--el-${prefix}-${type}`
      )
    return getCssVarValue('border-radius', type)
  }
  </script>
  <style scoped>
  .demo-radius .title {
    color: var(--el-text-color-regular);
    font-size: 18px;
    margin: 10px 0;
  }
  .demo-radius .value {
    color: var(--el-text-color-primary);
    font-size: 16px;
    margin: 10px 0;
  }
  .demo-radius .radius {
    height: 40px;
    width: 70%;
    border: 1px solid var(--el-border-color);
    border-radius: 0;
    margin-top: 20px;
  }
  </style>
  