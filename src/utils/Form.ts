import {reactive} from 'vue';
import {type FormRules} from 'element-plus'
//注册表单雁阵规则
export const rules = reactive<FormRules>({
    name: [
      { 
        required: true, 
        message: '请输入用户名', 
        trigger: 'blur' 
      },
      { 
        min: 4, 
        max: 10, 
        message: '用户名长度必须在5-10个字符之间', 
        trigger: 'blur' 
      }
    ],
    password: [
      { 
        required: true, 
        message: '请输入密码', 
        trigger: 'blur' 
      },
      { 
        min: 6, 
        message: '密码长度至少为8个字符', 
        trigger: 'blur' 
      },
      { 
        // 正则说明：
        // (?=.*[A-Za-z]) 必须包含至少一个字母
        // (?=.*\d) 必须包含至少一个数字
        // [A-Za-z\d#]{8,} 允许字母、数字、#，且总长度至少8位
        pattern: /^[A-Za-z\d#]{6,}$/,
        message: '密码必须必须包含字母和数字，可包含#，至少8个字符', 
        trigger: 'blur' 
      }
    ],
    email: [
      { 
        required: false, 
        message: '请输入邮箱地址', 
        trigger: 'blur' 
      },
      { 
        type: 'email', 
        message: '请输入有效的邮箱地址', 
        trigger: ['blur', 'change'] 
      }
      // 如需更严格的邮箱验证，可使用自定义正则：
      // {
      //   pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      //   message: '请输入有效的邮箱地址',
      //   trigger: ['blur', 'change']
      // }
    ]
  });