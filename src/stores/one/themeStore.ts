import {defineStore} from 'pinia';
import {ref,watch} from 'vue';
export const useThemeStore = defineStore('theme',()=>{
    const darkMode = ref<string>('light');
    const _local = localStorage.getItem('darkMode');
    darkMode.value = _local?JSON.parse(_local):'light';
    const toggleTheme = ()=>{
        darkMode.value = darkMode.value === 'dark'?'light':'dark';
        localStorage.setItem('darkMode',JSON.stringify(darkMode.value));
    }
    watch(()=>{
        return darkMode.value
     },(newValue)=>{
        if(newValue === 'dark'){
           document.body.classList.add('dark');
           document.body.classList.remove('light')
        }else{
           document.body.classList.remove('dark');
           document.body.classList.add("light")
        }
     },{immediate:true})
    return {darkMode,toggleTheme}
})