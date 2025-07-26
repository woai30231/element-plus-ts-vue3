<template>
    <h3>element plus所有组件库带功能测试</h3>

    <!--文件上传测试-->
    <Upload class="blockItem"/>

    <!--文件图片上传测试-->
    <Elupload class="blockItem"/>

    <!--element-plus el-upload-->
    <ElplusUpload />
</template>
<script setup lang="ts">
import Upload from '@/components/el-test/upload.vue';
import Elupload from "@/components/el-test/elupload.vue";
import ElplusUpload from  "@/components/el-test/elplusupload.vue"
</script>
<style scoped lang="scss">
.blockItem{
    margin-bottom:30px;
}
</style>