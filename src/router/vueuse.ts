import { type RouteRecordRaw } from "vue-router";

const vueuseRoutes:RouteRecordRaw[] = [
    {
        path:'/vueuse',
        name:'vueuse',
        component:()=>import("@/views/VususeIndex.vue")
    }
] 
export default vueuseRoutes;