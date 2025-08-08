<template>
    <div>
       
        <h2>vue use</h2>
        <Com1 v-model="mod1" @toP1="e=>getChildMsg(e)" :child1="'child1111'"/>
        <Com2 v-model="mod2" @toP2="e=>getChildMsg2(e)" :child2="'child2222'" />
        <p>收到老一信息：{{msgR1}}</p>
        <p>收到老二信息：{{msgR2}}</p>
    </div>
</template>
<script setup lang="ts">
import {ref,provide,type Ref} from 'vue';
import Com1 from './test/Com1.vue';
import Com2 from './test/Com2.vue';
const msgR1 = ref<string>('')
const msgR2 = ref<string>('')
const mod1 = ref('mod1')
const mod2 = ref('mod2')
provide("parent",{name:'parent'})
const getChildMsg = (data:string)=>{
    msgR1.value = data;
}
const getChildMsg2 = (data:string)=>{
    msgR2.value = data;
}
</script>