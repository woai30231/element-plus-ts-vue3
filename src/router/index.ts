import {createRouter,createWebHistory} from 'vue-router';
import {constantRoutes} from './router';
const router = createRouter({
    history:createWebHistory(),
    routes:constantRoutes
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