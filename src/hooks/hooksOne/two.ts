import {ref} from 'vue';
export function useFetchData<T>(url:string){
    const data = ref<T | null>(null);
    const loading = ref(true);
    const error = ref<string |null>(null);
    fetch(url)
    .then(res=>res.json())
    .then(json=>{
        console.log(json)
        data.value = json;
    }).catch(err=>{
        error.value = err.message;
    })
    .finally(()=>{
        loading.value = false;
    })

    return {data,loading,error};
}