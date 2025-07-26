<template>
  <div class="utility-types-exercise">
    <el-card>
      <template #header>
        <h2>🛠️ 工具类型练习</h2>
        <p>学习Partial、Pick、Omit、Record等工具类型</p>
      </template>
      <el-alert title="工具类型练习开发中..." type="info" show-icon :closable="false" />
    </el-card>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.utility-types-exercise { padding: 20px; }
</style>