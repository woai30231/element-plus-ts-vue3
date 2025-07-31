<template>
    <el-form :rules="rules" :model="formdata" ref="Formdom" label-width="150px">
        <el-form-item prop="input" label="Activity name">
            <el-input  v-model="formdata.input"/>
        </el-form-item>

        <el-form-item prop="select" label="Activity zone">
            <el-select v-model="formdata.select">
                <el-option v-for="item in selectOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item  label="Activity time">
            <el-col :span="11">
                <el-form-item prop="date1">
                    <el-date-picker prop="date1"
                        v-model="formdata.date1"
                        type="date"
                        placeholder="Pick a date"
                        style="width: 100%"
                />
                </el-form-item>
            </el-col>
            <el-col :span="2" class="text-center">
                <span class="text-gray-500">-</span>
            </el-col>
            <el-col :span="11">
               <el-form-item prop="date2">
                <el-time-picker
                    prop="date2"
                    v-model="formdata.date2"
                    placeholder="Pick a time"
                    style="width: 100%"
                />
               </el-form-item>
            </el-col>
        </el-form-item>

        <el-form-item prop="switch" label="Instant delivery">
            <el-switch v-model="formdata.switch"/>
        </el-form-item>

        <el-form-item prop="checkbox" label="Activity type">
            <el-checkbox-group v-model="formdata.checkbox"> 
                <el-checkbox value="onlineone" label="Online one activities"/>
                <el-checkbox value="onlinetwo" label="Online two activities"/>
                <el-checkbox value="onlinethree" label="Online three activities"/>
                <el-checkbox value="onlinefour" label="Online four activities"/>
            </el-checkbox-group>
        </el-form-item>

        <el-form-item prop="radio" label="Resources">
            <el-radio-group v-model="formdata.radio">
                <el-radio label="Sponsor" value="sponsor"></el-radio>
                <el-radio label="Venue" value="venue"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item prop="textarea" label="Activity form">
            <el-input v-model="formdata.textarea" :rows="6" type="textarea"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="create" type="success">Create</el-button>
            <el-button>Cancel</el-button>
        </el-form-item>
    </el-form>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import {ElMessage ,type FormRules,type FormInstance} from 'element-plus';
import request from '@/utils/request'
interface Optionszone{
    value:string;
    label:string;
}
interface Formdata{
    [key:string]:string | boolean | string[];
}
const rules = ref<FormRules>({
    input:[
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    select:[
        {
        required: true,
        message: 'Please select Activity zone',
        trigger: 'change',
        },
    ],
    date1:[
        {
        type: 'date',
        required: true,
        message: 'Please pick a date',
        trigger: 'change',
        },
    ],
    date2:[
        {
        type: 'date',
        required: true,
        message: 'Please pick a time',
        trigger: 'change',
        },
    ],
    switch:[
        {
            required: true,
            message: 'Please select activity resource',
            trigger: 'change',
        },
    ],
    checkbox:[
        {
        type: 'array',
        required: true,
        message: 'Please select at least one activity type',
        trigger: 'change',
        },
    ],
    radio:[
        {
            required: true,
            message: 'Please select activity resource',
            trigger: 'change',
        },
    ],
    textarea:[
        { required: true, message: 'Please input activity form', trigger: 'blur' },
    ],
    
})
const formdata = ref<Formdata>({
    input:'',
    select:'',
    date1:'',
    date2:'',
    switch:false,
    checkbox:[],
    radio:'',
    textarea:''
})
const selectOption = ref<Optionszone[]>([
    {value:'Zone one',label:'Zone one'},
    {value:'Zone second',label:'Zone secod'}
])
const Formdom = ref<FormInstance>();

const create = ()=>{
    console.log("提交数据");
    // return;
    Formdom.value?.validate(async (value:boolean)=>{
        if(value){
            console.log("表单验证通过")
            const res = await request.get('/test/api',{
                params:formdata.value
            });
            console.log(res)
        }else{
            ElMessage.info("提交表单时出现错误！")
        }
    })
}
</script>