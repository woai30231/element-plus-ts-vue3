import {ref} from 'vue'
import request from '@/utils/request';
interface Options{
    url:string;
    data?:{[key:string]:any}
}
export function useFetchUser<T>(options:Options){
    const data = ref<T |null>(null);
    const loading = ref<boolean>(false);
    const errorMsg = ref<string>('');
    
    const getData = async ()=>{
        const res = await request.get(options.url,{params:{...options.data}});
        console.log(res)
        data.value = res.data;
        errorMsg.value = '';
        loading.value = false;
    }
    return {data,errorMsg,loading,getData};
};