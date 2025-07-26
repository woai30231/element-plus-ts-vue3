import request from "@/utils/request";
//定义接口返回的数据类型
interface  User{
    id:number;
    name:string;
    age:number;
    address:string;
};

interface ApiResponse<T>{
    code:number;
    message:string;
    data:T
}

export const userApi = {
    // 获取用户列表
  getUserList: (params?: any) => {
    return request.get<ApiResponse<User[]>>('/user/list', { params })
  },
  
  // 获取用户详情
  getUserDetail: (id: number) => {
    return request.get<ApiResponse<User>>(`/user/${id}`)
  },
  
  // 创建用户
  createUser: (data: Omit<User, 'id'>) => {
    return request.post<ApiResponse<User>>('/user', data)
  },
  
  // 更新用户
  updateUser: (id: number, data: Partial<User>) => {
    return request.put<ApiResponse<User>>(`/user/${id}`, data)
  },
  
  // 删除用户
  deleteUser: (id: number) => {
    return request.delete<ApiResponse<null>>(`/user/${id}`)
  }
};