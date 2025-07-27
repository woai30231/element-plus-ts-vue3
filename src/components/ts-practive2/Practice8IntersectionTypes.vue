<script setup lang="ts">
interface Identifiable{
    id:number;
}
interface Timestamped{
    createAt:Date;
}
type RecordItem = Identifiable & Timestamped;
const item : RecordItem = {
    id:23,
    createAt:new Date()
}
</script>
<template>
    <el-card>
        <h3>练习8：交叉类型</h3>
        <p>ID:{{item.id}}</p>
        <p>创建时间：{{
            item.createAt.toLocaleString()}}</p>
    </el-card>
</template>