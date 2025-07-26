<template>
    <el-table :data="tableData" stripe style="width:100%">
        <el-table-column prop="id" label="ID" width="100" ></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
        </el-table-column>
        
    </el-table>
    <el-pagination 
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"></el-pagination>
</template>
<script setup lang="ts">
import {ref,onMounted} from 'vue';
interface User{
    id:number;
    name:string;
    age:number;
    address:string
}

//表格数据
const tableData = ref<User[]>([])
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const allData = ref<User[]>([]);

const loadData = () => {
  tableData.value = allData.value.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value);
  total.value = allData.value.length;
};

onMounted(() => {
  allData.value = Array.from({length: 50}, (_, i) => ({
    id: i + 1,
    name: `用户${i + 1}`,
    age: Math.floor(Math.random() * 50) + 18,
    address: `北京市朝阳区${i + 1}号`
  }));
  loadData();
});
// 分页事件处理
const handleSizeChange = (newSize: number) => {
  pageSize.value = newSize;
  loadData();
};

const handleCurrentChange = (newPage: number) => {
  currentPage.value = newPage;
  loadData();
};

// 操作方法
const handleEdit = (row: User) => {
  console.log('编辑用户:', row);
  // 打开编辑对话框
};

const handleDelete = (row: User) => {
  console.log('删除用户:', row);
  const idx= tableData.value.findIndex(item => item.id === row.id);
  if(idx !== -1){
    allData.value.splice(idx,1);
    if((currentPage.value - 1) * pageSize.value >= allData.value.length && currentPage.value > 1){
      currentPage.value--;
    }
    loadData();
  }
  // 调用删除 API
};
</script>
