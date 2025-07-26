import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import type {AxiosInstance,AxiosResponse} from 'axios';
import {ElMessage} from 'element-plus';

//创建axios实例
const request:AxiosInstance = axios.create({
    baseURL:'/',
    timeout:10000,
    headers:{
        "Content-Type":"application/json"
    }
})

//请求拦截器
request.interceptors.request.use(
    (config:InternalAxiosRequestConfig)=>{
        //在发送请求之前做些什么
        console.log("发送请求：",config.url);

        const token = localStorage.getItem("token");
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },(error)=>{
        console.log("请求错误：",error);
        return Promise.reject(error);
    })

    interface resData {
        code:number,
        message:string,
        data:Object | resData
    };

//响应拦截器
request.interceptors.response.use((response:AxiosResponse)=>{

    const {code ,message} = response.data as resData;

    if(code == 200){
        return response.data;
    }else{
        ElMessage.error(message || "请求失败")
        return Promise.reject(new Error(message || '请求失败'))
    };

},(error)=>{
    //对响应错误做点什么
    console.log("响应错误：",error);

    if(error.response){
        switch (error.response.status){
            case 401:
                ElMessage.error("未授权，请重新登录")
                break;
            case 403:
                ElMessage.error("拒绝访问")
                break;
            case 404:
                ElMessage.error("要访问的资源不存在")
                break;
            case 500:
                ElMessage.error("服务器内部错误")
                break;
            default:
                ElMessage.error(`请求失败：${error.response.status}`)
        }
    }else{
        ElMessage.error("网络错误，请检查网络连接")
    }

    return Promise.reject(error);
})

export default request;