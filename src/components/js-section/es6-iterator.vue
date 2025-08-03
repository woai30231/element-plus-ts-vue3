<template>
    <div>es6可遍历对象</div>
    <p>
        {{user.name}}
        {{newuser.username}}
    </p>
</template>
<script setup lang="ts">
import {ref} from 'vue';
const user = {
    name:ref<string>('小明')
}
const getUser = ()=>{
    return {
        username:ref<string>('小红')
    }
}
const newuser = getUser();
</script>