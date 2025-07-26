<template>
  <div class="interface-object-exercise">
    <el-card>
      <template #header>
        <h2>🏗️ 接口与对象类型练习</h2>
        <p>学习接口定义、对象类型、索引签名等</p>
      </template>
      
      <el-alert 
        title="接口与对象练习开发中..." 
        type="info" 
        show-icon 
        :closable="false"
      />
      
      <div style="margin-top: 20px;">
        <h4>本节将包含：</h4>
        <ul>
          <li>接口的定义和使用</li>
          <li>可选属性和只读属性</li>
          <li>索引签名</li>
          <li>接口继承</li>
          <li>函数接口</li>
          <li>构造函数接口</li>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
// 接口练习组件占位
</script>

<style scoped>
.interface-object-exercise {
  padding: 20px;
}
</style>