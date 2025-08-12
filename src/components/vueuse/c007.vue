<template>
    <div>当前fps：{{fps}}</div>
</template>
<script setup lang="ts">
import { useFps } from '@vueuse/core'

const fps = useFps()
</script>