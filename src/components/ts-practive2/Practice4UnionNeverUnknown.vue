<script setup lang="ts">
// function handleError ():never{
//     throw new Error("出错了");
// };

let data:any = "随便赋值";
data = 123;
let value:unknown = "不确定类型";
if(typeof value === "string"){
    console.log(value.toUpperCase())
}
</script>
<template>
    <el-card>
        <h3>联合类型、never、unknown</h3>
        <p>any 类型值：{{data}}</p>
        <p>unknown 类型处理：已检查类型</p>
    </el-card>
</template>