<template>
    <div>
        <h3>{{user.name}}</h3>
        <p>年龄：{{user.age}}</p>
        <p>id:{{user.id}}</p>
    </div>
</template>
<script setup lang="ts">
import {defineProps,type PropType} from 'vue';
interface User{
    id:number
    name:string;
    age:number
}
const props = defineProps({
    user:{
        type:Object as PropType<User>,
        required:true
    }
})
   

</script>