<template>
    首页
    <p>
        <v-node></v-node>
    </p>
</template>
<script setup lang="ts">
import {h} from 'vue'
const vNode = h("div","小明")
console.log("首页")
console.log(vNode)
</script>