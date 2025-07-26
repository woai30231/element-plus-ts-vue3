import type { AppRouteRecordRaw } from "../types/router";
export const constantRoutes : AppRouteRecordRaw[] = [
    {
        path:'/',
        name:'Home',
        component:()=> import("@/views/Home.vue"),
        meta:{title:'首页'}
    },
    {
        path:'/formdemo',
        name:'formdemo',
        component:()=>import("@/views/FormDemo.vue"),
        meta:{title:'表单演示'}
    },
    {
        path:'/tabledemo',
        name:'tabledemo',
        component:()=>import("@/views/TableDemo.vue"),
        meta:{title:'表格演示'}
    },
    {
        path:'/dialogdemo',
        name:'dialogdemo',
        component:()=>import("@/views/Dialogdemo.vue"),
        meta:{title:'dialog演示'}
    },
    {
        path:'/selectdemo',
        name:'selectdemo',
        component:()=>import("@/views/SelectDemo.vue"),
        meta:{title:'select演示'}
    },//AllElCompnentTest
    {
        path:'/AllElCompnentTest',
        name:'AllElCompnentTest',
        component:()=>import("@/views/AllElCompnentTest.vue"),
        meta:{title:'所有组件演示'}
    },//DatePickerDemo
    {
        path:'/DatePickerDemo',
        name:'DatePickerDemo',
        component:()=>import("@/views/DatePickerDemo.vue"),
        meta:{title:'时间选择器'}
    },
    {
        path: '/typescript-exercises',
        name: 'TypeScriptExercises',
        component: () => import("@/views/TypeScriptExercises.vue"),
        meta: { title: 'TypeScript 全面练习' }
    }
]