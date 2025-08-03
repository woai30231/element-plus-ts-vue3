import {ref} from 'vue';
interface Params{
    size:number;
    src:string;
}
export const useAvatar = (params:Params)=>{
    const {src:_src,size:_size} = params;
    const src = ref<string>(_src);
    const size = ref<number>(_size);
    return {
        src,
        size
    }
}