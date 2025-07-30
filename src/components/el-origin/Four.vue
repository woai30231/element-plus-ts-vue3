<template>
    <div>
        <el-button @click="addItem" type="primary">增加一项</el-button>
        <el-button @click="deleteItem" type="primary">删除一项</el-button>
        <el-scrollbar max-height="180px">
            <p v-for="item in lists" :key="item.index">{{item.text}}</p>
        </el-scrollbar>
    </div>
</template>
<script setup lang="ts">
import {ref} from 'vue';
interface Item {
    index:number;
    text:string
}
const lists = ref<Item[]>([
    {index:1,text:'index1'},
    {index:2,text:'index2'},
    {index:3,text:'index3'},
]);

const addItem = ()=>{
    let len = lists.value.length;
    lists.value.push({index:len+1,text:`index${len+1}`})
}
const deleteItem = ()=>{
    if(lists.value.length){
        lists.value.pop();
    }
}
</script>