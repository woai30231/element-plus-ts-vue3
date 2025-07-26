<template>
  <div class="enum-exercise">
    <el-card>
      <template #header>
        <h2>📝 枚举类型练习</h2>
        <p>学习数字枚举、字符串枚举、const断言等</p>
      </template>
      <el-alert title="枚举类型练习开发中..." type="info" show-icon :closable="false" />
    </el-card>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.enum-exercise { padding: 20px; }
</style>