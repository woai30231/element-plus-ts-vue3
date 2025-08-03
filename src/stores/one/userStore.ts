import {defineStore} from 'pinia';
import request from '@/utils/request'

interface User{
    address:string;
    name:string;
    email:string;
}

export const useUserStore = defineStore('user',{
    state : ()=>({
        user: null as User | null,
        loading:false,
        error:null as string | null
    }),
    actions:{
        async fetchUser(_userId?:number){
            this.loading = true;
            try{
                const res = await request.get("/api/user");
                this.user = res.data;
            }catch(err){
                this.error = '获取用户失败'
            }finally{
                this.loading = false;
            }
        }
    }
})