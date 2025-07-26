<template>
    <div>
        <el-row><el-text type="info" :size="'large'">element-plus库的el-upload组件实现文件上传图片调用示例</el-text></el-row>
        <el-row>
            <el-button  @click="uploadFile">获取数据</el-button>
        </el-row>

        <el-row>
            <el-col :span="4">返回的数据:</el-col>
            <el-col :span="20">
                {{returnJson}}
            </el-col>
        </el-row>
    </div>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import uploadFileApi from '@/api/upload';
import { ElMessage } from 'element-plus';
const uploadLoading = ref(false);

const returnJson = ref("")
const uploadFile = async () => {
    try{
        uploadLoading.value = true;
        const res = await uploadFileApi.getObjlist({name:'xiaoming'})
        const str = JSON.stringify(res.data)

        returnJson.value = str;
    }catch(e){
        console.log("错误：",e);
        ElMessage.error("错误信息："+e);
    }finally{
        uploadLoading.value = false;
    }    
    
    
}

</script>