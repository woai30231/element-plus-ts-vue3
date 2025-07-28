<template>
    <div>
        <h2>用户详情</h2>
        <p>ID:{{user?.id}}</p>
        <p>姓名：{{user?.name}}</p>
        <p>年龄：{{user?.age}}</p>
    </div>
</template>
<script lang="ts" setup>
import {useRoute} from 'vue-router';
import {ref,onMounted} from 'vue';
interface User {
    id:number
    name:string;
    age:number
}
const route = useRoute();
const user = ref<User | null>(null);
onMounted(()=>{
    user.value = {
        id:parseInt(route.params.id as string),
        name:'张三',
        age:25
    }
})
</script>