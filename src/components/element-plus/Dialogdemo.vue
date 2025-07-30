<template>
    <div>
        <el-button @click="dialogVisible =true">打开对话框</el-button>
        <el-dialog v-model="dialogVisible" title="用户信息">

            <template #default>
                <el-form :model="dialogForm" label-width="80px">
                    <el-form-item label="姓名">
                        <el-input v-model="dialogForm.name" />
                    </el-form-item>
                    <el-form-item label="年龄">
                        <el-input-number v-model="dialogForm.age" />
                    </el-form-item>
                </el-form>
            </template>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible =false">取消</el-button>
                    <el-button type="primary" @click="saveUser">确定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script setup lang="ts">
import {ref,reactive} from 'vue'
interface UserForm {
    name:string;
    age:number| null
};
const dialogVisible = ref<boolean>(false)
const dialogForm = reactive<UserForm>({
    name:'',
    age:null
})
;
const saveUser = ()=>{
    console.log("保存用户",dialogForm);
    dialogVisible.value = false;
};//
</script>