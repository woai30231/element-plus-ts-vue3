<template>
   <ul>
    <li>space</li>
    <li>enter</li>
    <li>a</li>
    <li>b</li>
    <li>c</li>
   </ul>
</template>
<script setup lang="ts">
import {watch} from 'vue'
import {useMagicKeys} from '@vueuse/core'
const {space,enter,a,b,c} = useMagicKeys();
watch(space,()=>{

})
</script>
<style scoped>
ul{
    display:flex;
    flex-wrap:wrap;
    align-items:center;
    justify-content:center;
    li{
        min-width:50px;
        padding:0px 8px;
        margin:0px 5px;
        height:50px;
        line-height:50px;
        background-color:#999;
        color:#fff;
        display:flex;
        justify-content:center;
        list-style:none;
        &:hover{
            background-color:#666;
        }
    }
}
</style>