import {ref,computed} from 'vue';
export function useSearchFilter<T>(items:T[],key:keyof T){
    const searchQuery = ref('');
    const filteredItems = computed(()=>{
        return items.filter(item => String(item[key]).toLowerCase().includes(searchQuery.value.toLowerCase()))
    })

    return {
        searchQuery,
        filteredItems
    }
}