import {ref,onMounted} from 'vue';
import request from '@/utils/request';

interface FetchOptions {
    url:string;
    params?:any;
};

export function useFetch<T>(options:FetchOptions){
    const data = ref<T | null>(null);
    // data.value = {name:'xiaoming'}
    const error = ref<Error | null>(null);
    const loading = ref<boolean>(true);

    const fetchData = async()=>{
        try{
            console.log("走这里了吗jjfajfljaljflj")
            const response = await request.get<T>(options.url,{params:options.params})
            console.log(response)
            data.value = response.data;

        }catch(e){
            error.value = e as Error;
        }finally{
            loading.value = false;
        }
    }
    onMounted(fetchData);
    return {data,error,loading};
}