import {createRouter,createWebHistory} from 'vue-router';
import {constantRoutes as commonRoutes} from './router';
import Jsroutes from './jssection';
import vueuse from './vueuse'
const router = createRouter({
    history:createWebHistory(import.meta.env.VITE_BASE_PATH),
    routes:[
        ...commonRoutes,
        ...Jsroutes,
        ...vueuse,
        {
            path:'/:pathMatch(.*)*',
            name:'notfound',
            component:()=>import("@/views/Notfund.vue")
        }
    ]
})
router.beforeEach((to,from,next)=>{
    console.log(from.path);
    if(to.meta && to.meta.title){
        document.title = to.meta.title as string;
    }else{
        document.title = "elememt-plus + ts演示"
    }
    next();
})

export default router;