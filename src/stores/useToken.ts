import {defineStore} from 'pinia';
import {ref} from 'vue';
export const useToken = defineStore('token',()=>{
    const token = ref<string>('');
    const getToken = ()=>{
        let localtoken = localStorage.getItem('localToken');
        if(localtoken){
            token.value = localtoken;
        }
    }
    const setToken = (_token:string)=>{
        token.value = _token;
        localStorage.setItem('localToken',JSON.stringify(_token));
    }
    return {token,setToken,getToken}

})