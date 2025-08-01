import type { AppRouteRecordRaw } from "../types/router";
export const constantRoutes : AppRouteRecordRaw[] = [
    {
        path:'/',
        name:'Home',
        component:()=> import("@/views/Home.vue"),
        meta:{title:'李建枫 - Welcome to you'}
    },
    {
        path:'/element-plus',
        name:'element-plus',
        component:()=>import("@/views/Elementplus.vue"),
        meta:{title:'element-plus笔记'},
        children:[
            {
                path:'formdemo',
                name:'formdemo',
                component:()=>import("@/components/element-plus/Formdemo.vue"),
                meta:{title:'表单演示'}
            },
            {
                path:'elcom',
                name:'elcom',
                component:()=>import("@/components/element-plus/ElCom.vue"),
                meta:{title:'element-plus'}
            },
            {
                path:'tabledemo',
                name:'tabledemo',
                component:()=>import("@/components/element-plus/TableDemo.vue"),
                meta:{title:'表格演示'}
            },
            {
                path:'dialogdemo',
                name:'dialogdemo',
                component:()=>import("@/components/element-plus/Dialogdemo.vue"),
                meta:{title:'dialog演示'}
            },
            {
                path:'selectdemo',
                name:'selectdemo',
                component:()=>import("@/components/element-plus/SelectDemo.vue"),
                meta:{title:'select演示'}
            },//AllElCompnentTest
            {
                path:'AllElCompnentTest',
                name:'AllElCompnentTest',
                component:()=>import("@/components/element-plus/AllElCompnentTest.vue"),
                meta:{title:'所有组件演示'}
            },//DatePickerDemo
            {
                path:'DatePickerDemo',
                name:'DatePickerDemo',
                component:()=>import("@/components/element-plus/DatePickerDemo.vue"),
                meta:{title:'时间选择器'}
            },
        ]
    }, 
    {
        path:'/HooksDemo',
        name:'HooksDemo',
        component:()=>import("@/views/HooksDemo.vue"),
        meta:{title:'vue hooks'}
    },
    {
        path:'/PiniaDemo',
        name:'PiniaDemo',
        component:()=>import("@/views/PiniaDemo.vue"),
        meta:{title:'Pinia 演示'}
    },
    {
        path:'/tsdemo',
        name:'tsdemo',
        component:()=>import('@/views/tspractice/Index.vue'),
        redirect:'/tsdemo/TspracticeOne',
        meta:{title:'tsdemo'},
        children:[
            {
                path:'TspracticeOne',
                name:'TspracticeOne',
                component:()=>import("@/views/tspractice/TspracticeOne.vue"),
                meta:{title:'ts演示'}
            },
            {
                path:'TspracticeTwo',
                name:'TspracticeTwo',
                component:()=>import("@/views/tspractice/TspracticeTwo.vue"),
                meta:{title:'ts演示2'}
            },
            {
                path:'TspracticeThree',
                name:'TspracticeThree',
                component:()=>import("@/views/tspractice/TspracticeThree.vue"),
                meta:{title:'ts实战演示3'}
            },
            {
                path:'TspracticeFore',
                name:'TspracticeFore',
                component:()=>import("@/views/tspractice/TspracticeFore.vue"),
                meta:{title:'ts实战演示4'}
            }
        ]
    },
    
    

]