<template>
    <div>
        <el-row><el-text type="info" :size="'large'">原生input图片文件上传调用示例</el-text></el-row>
        <el-row>
            <input accept="image/*" type="file" @change="uploadFile($event)" />
        </el-row>

        <el-row>
            <img class="imgSty" :src="imgUrl.src" alt="上传的图片">
        </el-row>
    </div>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import uploadFileApi from '@/api/upload';
const uploadLoading = ref(false);
// import type {} from 'element-plus'
const imgFile = ref<File>();
interface imgFace{src:string}
const imgUrl = ref<imgFace>({
    src:''
})
const uploadFile = async (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
        imgFile.value = target.files[0];
        console.log("选择的文件:", imgFile.value);
        try {
            uploadLoading.value = true;
            const formData = new FormData();
            formData.append("file", imgFile.value);
            
            const res = await uploadFileApi.uploadFile(formData) as any;
            console.log('上传成功:', res);
            
            // 处理成功响应
            if (res.code === 200) {
                // 显示成功消息
                console.log('文件路径:', res.data.path);
                imgUrl.value.src = URL.createObjectURL(imgFile.value);
            }
        } catch (error) {
            console.error('上传失败:', error);
            // 处理错误
        } finally {
            uploadLoading.value = false;
        }
    }
    
}

</script>