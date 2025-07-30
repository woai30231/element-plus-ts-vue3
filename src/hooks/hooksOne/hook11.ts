import {ref,onUnmounted} from 'vue';
export function useDebounce<T>(value:T,delay:number = 500):[T,(v:T)=>void]{
    const debouncedValue = ref<T>(value);
    let timer :number = 0;
    const setValue = (v:T)=>{
        clearTimeout(timer);
        timer = setTimeout(()=>{
            debouncedValue.value =v;
        },delay)
    }
    onUnmounted(()=>{
        clearTimeout(timer);
    })
    return [debouncedValue.value,setValue]
}