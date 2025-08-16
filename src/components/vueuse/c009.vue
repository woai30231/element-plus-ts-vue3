<script setup lang="ts">
import { useRafFn } from '@vueuse/core'
import { shallowRef } from 'vue'

const count = shallowRef(0)

const { pause, resume } = useRafFn(() => {
  count.value++
  console.log(count.value)
})
</script>
<template>
  <p>
    {{count}}
  </p>
  <el-button @click="pause">pause</el-button>
  <el-button @click="resume">resume</el-button>
</template>