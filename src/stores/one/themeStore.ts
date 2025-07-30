import {defineStore} from 'pinia';
import {ref} from 'vue';
export const useThemeStore = defineStore('theme',()=>{
    const darkMode = ref<boolean>(false);
    const toggleTheme = ()=>{
        darkMode.value = !darkMode.value;
    }
    return {darkMode,toggleTheme}
})