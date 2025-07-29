import {ref,watch} from 'vue';
export function useLocalStorage<T>(key:string,initialValue:T){
    const storedValue = localStorage.getItem(key);
    const value = ref<T>(storedValue?JSON.stringify(storedValue) as T:initialValue)
    watch(value,(newValue)=>{
        localStorage.setItem(key,newValue);
    },{deep:true});
    return value;
}
