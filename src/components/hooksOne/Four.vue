<template>
    <div>
        <p v-if="isRunning">{{count}}秒可以再次点击</p>
        <el-button v-if="!isRunning" @click="start">点击进入倒计时</el-button>
        <div @click="startSend">
            {{isRunning?count+'秒后可以重发':'发送验证码'}}
        </div>
    </div>
</template>
<script setup lang="ts">
import {ref } from 'vue';
import { useCountdown} from '@/hooks/hooksOne/fore';
import {ElMessage} from 'element-plus';
const seconds = ref(60);
const {count,isRunning,start} = useCountdown(seconds.value);
const startSend  = ()=>{
    ElMessage.info("验证码已经发送成功");
    start();
}
</script>