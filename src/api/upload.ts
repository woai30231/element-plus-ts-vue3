import request from '@/utils/request';


// message:'上传成功',
//         data:{
//             filename:req.file.filename,
//             path:`/client-upload/${req.file.filename}`,
//         },
//         code:200
// {error:string}
interface rData {
    filename:string;
    path:string;
    id?:number;
    uploadDate?:string
}

interface listData {
    label:string;
    valeu:string
}
interface ApiRes<T>{
    message:string;
    code:number;
    data:T;
}
const uploadFileApi = {
    //上传文件
    uploadFile : (data:any)=>{
        return request.post<ApiRes<rData>>('/api/upload/secure',data,{
            "headers":{
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    //获取
    getObjlist : (params?:any)=>{
        return request.get<ApiRes<listData[]>>('/api/objlist',{params})
    }
    
}
export default uploadFileApi;

