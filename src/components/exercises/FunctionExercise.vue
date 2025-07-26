<template>
  <div class="function-exercise">
    <el-card>
      <template #header>
        <h2>⚙️ 函数类型练习</h2>
        <p>学习函数签名、重载、高阶函数等</p>
      </template>
      <el-alert title="函数类型练习开发中..." type="info" show-icon :closable="false" />
    </el-card>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.function-exercise { padding: 20px; }
</style>