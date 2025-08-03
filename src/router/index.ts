import {createRouter,createWebHistory} from 'vue-router';
import {constantRoutes as commonRoutes} from './router';
import Jsroutes from './jssection';
const router = createRouter({
    history:createWebHistory(),
    routes:[
        ...commonRoutes,
        ...Jsroutes
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