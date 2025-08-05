<template>
    <el-button @click="themeStore.toggleTheme">切换主题</el-button>
    <el-button v-show="!hasLogin" @click="indexLoginPop.handle(true)">登录</el-button>
    <el-button v-show="hasLogin" @click="token.setToken()">退出</el-button>
</template>
<script setup lang="ts">
import {computed,watch} from 'vue'
import {useThemeStore} from '@/stores/one/themeStore';
import { useIndexLogin } from '@/stores/pop/indexlogin';
import { useToken } from '@/stores/useToken';
const token = useToken();
const indexLoginPop = useIndexLogin();
const hasLogin = computed(()=>{
   token.getToken();
   const _t = token.token;
   return !!_t;
})
const themeStore = useThemeStore();//获取主题
// const themeStyle = computed(()=>{
//    return themeStore.darkMode?'dark':'light' 
// })
watch(()=>{
   return themeStore.darkMode
},(newValue)=>{
   if(newValue){
      document.body.classList.add('dark')
   }else{
      document.body.classList.remove('dark');
   }
},{immediate:true})
</script>