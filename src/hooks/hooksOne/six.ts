import {ref} from 'vue';
export function useLoading<T>(){
    const isLoading = ref(false);
    const data = ref<T | null>(null);
    
    const operate = ()=>{
        if(isLoading.value)return;
        isLoading.value = true;
        data.value = {
            name:'xiaoming',
            email:'xx@xx.com'
        };
        //模拟数据请求，或者其他超时操作
        setTimeout(()=>{
            isLoading.value = false;
        },5000)
    };
    return {isLoading,data,operate}
}