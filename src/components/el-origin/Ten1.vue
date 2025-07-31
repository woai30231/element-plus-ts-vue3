<template>
    <el-row>
        <el-col :span="3">slide demo</el-col>
        <el-col :span="21">
            <el-slider v-model="value" />
        </el-col>
    </el-row>
    <el-row>
        <el-input-number v-model="value1"></el-input-number>
    </el-row>

    <el-row>
        <el-switch v-model="value2"></el-switch>
    </el-row>

    <el-row>
        <el-time-picker v-model="value3" placeholder="请选择时间"></el-time-picker>
    </el-row>

    <el-row>
        <el-transfer v-model="value4" :data="data"></el-transfer>
    </el-row>

    <el-row>

        <el-upload 
        ref="upload"
        v-model:file-list="fileList"
        multiple
            :limit="3"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-exceed="handleExceed"
            action="/test/api"
            :auto-upload="false"
            drag
            >
            <el-button type="success">click to upload</el-button>
            <el-button type="success" @click="uploadServer">上传到服务器</el-button>
            <template #tip>
                <div>jpg/png files with a size less than 500kb</div>
            </template>
        </el-upload>
    </el-row>
</template>
<script setup lang="ts">
import {ref ,watch} from 'vue'
import { ElUpload,type UploadProps,type UploadUserFile ,ElMessage,ElMessageBox} from 'element-plus';
const value = ref<number>(0)
const value1 = ref<number>(0)
var value2 = ref<number>(1);
    const value3 = ref<string>('')
watch(value3,()=>{
    console.log(value3.value)
},{immediate:true})
interface Option{
    key:number;
    label:string;
    disabled:boolean;
}

const generateData = ()=>{
    const data:Option[] = [];
    for(let i= 1;i<=15;i++){
        data.push({
            key:i,
            label:`Option ${i}`,
            disabled:i%4 === 0
        })
    }
    return data;
}
const data = ref<Option[]>(generateData());
const value4  = ref([]);

watch(value4,()=>{
    console.log(value4.value)
})
const fileList = ref<UploadUserFile[]>([])

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
    console.log('onRemove')
    console.log(file, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
    console.log('uploadFile')
    console.log(uploadFile)
    console.log(URL.createObjectURL(uploadFile.raw!))
}
const upload = ref();
const uploadServer = ()=>{
    console.log("上传服务器")
    upload.value!.submit();
}

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
    console.log('upload+file')
    console.log(files)
    console.log(uploadFiles)
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`
  )
}

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `Cancel the transfer of ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  )
}
</script>