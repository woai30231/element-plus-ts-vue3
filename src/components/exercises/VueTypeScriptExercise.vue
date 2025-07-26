<template>
  <div class="vue-typescript-exercise">
    <el-card>
      <template #header>
        <h2>🎯 Vue3 + TypeScript 练习</h2>
        <p>学习Vue3中TypeScript的最佳实践</p>
      </template>
      <el-alert title="Vue3 + TypeScript练习开发中..." type="info" show-icon :closable="false" />
    </el-card>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.vue-typescript-exercise { padding: 20px; }
</style>