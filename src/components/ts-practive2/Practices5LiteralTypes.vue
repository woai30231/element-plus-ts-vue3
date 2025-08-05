<script setup lang="ts">
type ButtonType = "primary" | "success" | "warning";
let btnType :ButtonType = "primary";
</script>
<template>
    <el-card>
        <h3>字面量类型</h3>
        <el-button :type="btnType">{{btnType}}</el-button>
    </el-card>
</template>