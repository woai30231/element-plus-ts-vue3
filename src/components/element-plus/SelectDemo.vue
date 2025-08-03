<template>
    <div>
        <el-select @change="handleChange" v-model="value" placeholder="请选择">
            <el-option v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"></el-option>
        </el-select>
        <el-select @change="mulhandleChange" multiple v-model="multipleValue" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >

            </el-option>
        </el-select>
    </div>
</template>
<script setup lang="ts">
import {ref,onMounted} from 'vue';
import request from '@/utils/request';


interface Option{
    label:string;
    value:string;
}
const options = ref<Option[]>([]);
const value = ref<string>('');
const multipleValue = ref<string[]>([]);

const loadOptions = async()=>{
    const res = await request.get('/api/objlist');
    const data = res.data;
    console.log("select")
    console.log(data);
    options.value = data.data;
};
onMounted(()=>{
    loadOptions();
})
const handleChange = (e:string)=>{
    console.log(e);
}
const mulhandleChange = (e:string[])=>{
    console.log(e);
}
</script>