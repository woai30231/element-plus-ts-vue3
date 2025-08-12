<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { useTemplateRef ,ref} from 'vue'

const target = useTemplateRef<HTMLElement>('target')
const count = ref(0)

onClickOutside(target,_event => {console.log("点击我以外的地方");count.value++;})
</script>

<template>
  <el-button ref="target">
    点击我以外的地方
  </el-button>
  <el-button>Count {{count}}</el-button>
</template>