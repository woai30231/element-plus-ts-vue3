<template>
    <el-row>
        <el-col>
            <el-avatar :size="50" :src="testUrl"></el-avatar>
            <div class="testdiv" style="height:150px;"></div>
        </el-col>
    </el-row>
</template>
<script setup lang="ts">
import {reactive,toRefs,ref} from 'vue';
const state = reactive({
    testUrl:'/src/assets/2.jpeg'
})
import imgUrl from '/2.jpeg';
// const {testUrl} = toRefs(state)
const testUrl = ref<string>(imgUrl);
</script>
<style lang="scss" scoped>
.testdiv{
    background:url("@/assets/2.jpeg");
}
</style>