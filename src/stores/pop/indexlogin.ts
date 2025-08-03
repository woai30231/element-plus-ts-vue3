import {defineStore} from 'pinia';
import {ref} from 'vue';
export const useIndexLogin = defineStore('pop-indexLogin',()=>{
    const showPop = ref<boolean>(false);
    const handle = (bool:boolean)=>{
        showPop.value = bool;
    }
    return {
        showPop,
        handle
    };
})