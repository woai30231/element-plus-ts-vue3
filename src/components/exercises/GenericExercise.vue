<template>
  <div class="generic-exercise">
    <el-card>
      <template #header>
        <h2>🔧 泛型编程练习</h2>
        <p>学习泛型函数、泛型类、泛型约束等</p>
      </template>
      <el-alert title="泛型编程练习开发中..." type="info" show-icon :closable="false" />
    </el-card>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.generic-exercise { padding: 20px; }
</style>