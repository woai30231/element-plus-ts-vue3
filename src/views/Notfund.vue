<template>
    <div style="height:500px;">
        <el-empty :description="'对不起，你访问的资源不存在！'" >

            <el-button @click="$router.replace({path:'/'})">返回首页</el-button>
            <el-button type="primary" @click="$router.go(-1)">返回上一页</el-button>
        </el-empty>
    </div>
</template>
<script setup lang="ts">

</script>