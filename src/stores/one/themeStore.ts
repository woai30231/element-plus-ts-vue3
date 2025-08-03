import {defineStore} from 'pinia';
import {ref} from 'vue';
export const useThemeStore = defineStore('theme',()=>{
    const darkMode = ref<boolean>(false);
    darkMode.value = JSON.parse(localStorage.getItem('darkMode') as string);
    const toggleTheme = ()=>{
        darkMode.value = !darkMode.value;
        localStorage.setItem('darkMode',JSON.stringify(darkMode.value));
    }
    return {darkMode,toggleTheme}
})