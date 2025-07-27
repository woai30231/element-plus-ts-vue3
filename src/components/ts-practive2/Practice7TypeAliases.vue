<script setup lang="ts">
type ID = string | number;
type Product = {
    id:ID;
    name:string;
    price:number;
}
const product:Product = {

    id:1001,
    name:'手机',
    price:2999
}

</script>
<template>
    <el-card>
        <h3>练习7：类型别名</h3>
        <p>产品ID:{{product.id}}</p>
        <p>产品名称：{{product.name}}</p>
        <p>价格：{{product.price}}</p>
    </el-card>
</template>