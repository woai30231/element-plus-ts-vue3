<script setup lang="ts">
import {useUserStore} from "@/stores/one/userStore";
const userStore = useUserStore();

</script>
<template>
    <div>
        <el-card>
            <h3>用户信息</h3>
            <div>
                <p>用户名:{{userStore.user?.name}}</p>
                <p>邮箱：{{userStore.user?.email}}</p>
                <p>地址：{{userStore.user?.address}}</p>
            </div>
            <el-row><el-button @click="userStore.fetchUser">加载用户信息</el-button></el-row>
        </el-card>
    </div>
</template>