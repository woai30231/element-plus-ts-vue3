<template>
  <div class="todo-form">
    <el-form 
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="120px"
      @submit.prevent="handleSubmit"
    >
      <el-form-item label="任务标题" prop="title">
        <el-input 
          v-model="formData.title"
          placeholder="请输入任务标题"
          maxlength="100"
          show-word-limit
        />
      </el-form-item>
      
      <el-form-item label="任务描述" prop="description">
        <el-input 
          v-model="formData.description"
          type="textarea"
          :rows="3"
          placeholder="请输入任务描述（可选）"
          maxlength="500"
          show-word-limit
        />
      </el-form-item>
      
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="优先级" prop="priority">
            <el-select v-model="formData.priority" placeholder="选择优先级">
              <el-option 
                v-for="priority in priorityOptions" 
                :key="priority.value"
                :label="priority.label"
                :value="priority.value"
              >
                <span :style="{ color: priority.color }">
                  {{ priority.icon }} {{ priority.label }}
                </span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        
        <el-col :span="12">
          <el-form-item label="截止日期" prop="dueDate">
            <el-date-picker
              v-model="formData.dueDate"
              type="date"
              placeholder="选择截止日期"
              style="width: 100%"
              :disabled-date="disabledDate"
            />
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-form-item label="指派人员" prop="assignee">
        <el-select 
          v-model="formData.assigneeId"
          placeholder="选择指派人员"
          clearable
          filterable
        >
          <el-option 
            v-for="user in users" 
            :key="user.id"
            :label="user.name"
            :value="user.id"
          >
            <div class="user-option">
              <el-avatar :size="24" :src="user.profile.avatar">
                {{ user.name.charAt(0) }}
              </el-avatar>
              <span class="user-name">{{ user.name }}</span>
              <el-tag size="small" :type="getRoleType(user.role)">
                {{ getRoleText(user.role) }}
              </el-tag>
            </div>
          </el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item label="标签" prop="tags">
        <div class="tags-input">
          <el-tag 
            v-for="tag in formData.tags"
            :key="tag"
            closable
            @close="removeTag(tag)"
            style="margin-right: 8px; margin-bottom: 8px;"
          >
            {{ tag }}
          </el-tag>
          
          <el-input
            v-if="tagInputVisible"
            ref="tagInputRef"
            v-model="tagInputValue"
            size="small"
            style="width: 120px;"
            @keyup.enter="addTag"
            @blur="addTag"
          />
          
          <el-button 
            v-else
            @click="showTagInput"
            size="small"
            type="primary"
            link
          >
            + 添加标签
          </el-button>
        </div>
        
        <div class="suggested-tags">
          <span class="label">建议标签：</span>
          <el-tag 
            v-for="tag in suggestedTags"
            :key="tag"
            size="small"
            style="margin-right: 4px; cursor: pointer;"
            @click="addSuggestedTag(tag)"
          >
            {{ tag }}
          </el-tag>
        </div>
      </el-form-item>
      
      <el-form-item label="子任务">
        <div class="subtasks-section">
          <div 
            v-for="(subtask, index) in formData.subtasks"
            :key="subtask.tempId"
            class="subtask-item"
          >
            <el-input 
              v-model="subtask.title"
              placeholder="子任务标题"
              style="flex: 1;"
            />
            <el-button 
              @click="removeSubtask(index)"
              type="danger"
              link
              style="margin-left: 8px;"
            >
              删除
            </el-button>
          </div>
          
          <el-button 
            @click="addSubtask"
            type="primary"
            link
            style="margin-top: 8px;"
          >
            + 添加子任务
          </el-button>
        </div>
      </el-form-item>
      
      <el-form-item>
        <div class="form-actions">
          <el-button @click="handleCancel">取消</el-button>
          <el-button 
            type="primary" 
            @click="handleSubmit"
            :loading="submitting"
          >
            {{ todo ? '更新任务' : '创建任务' }}
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, nextTick, onMounted, type Ref } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import type { 
  TodoItem, 
  User, 
  Priority, 
  UserRole, 
  SubTask 
} from '../../types/exercises'

// ===== Props 和 Emits =====
interface Props {
  todo?: TodoItem | null
  users: User[]
}

const props = withDefaults(defineProps<Props>(), {
  todo: null
})

interface Emits {
  (e: 'save', todo: Omit<TodoItem, 'id' | 'createdAt' | 'updatedAt'>): void
  (e: 'cancel'): void
}

const emit = defineEmits<Emits>()

// ===== 响应式数据 =====

// 表单引用
const formRef = ref<FormInstance>()
const tagInputRef = ref()

// 表单数据类型定义
interface TodoFormData {
  title: string
  description: string
  priority: Priority
  dueDate: Date | null
  assigneeId: number | null
  tags: string[]
  subtasks: Array<{
    tempId: number
    title: string
    completed: boolean
  }>
}

// 表单数据
const formData: TodoFormData = reactive({
  title: '',
  description: '',
  priority: 'medium' as Priority,
  dueDate: null,
  assigneeId: null,
  tags: [],
  subtasks: []
})

// UI 状态
const submitting = ref(false)
const tagInputVisible = ref(false)
const tagInputValue = ref('')

// 优先级选项
const priorityOptions = [
  {
    value: 'high' as Priority,
    label: '高优先级',
    icon: '🔴',
    color: '#f56c6c'
  },
  {
    value: 'medium' as Priority,
    label: '中优先级',
    icon: '🟡',
    color: '#e6a23c'
  },
  {
    value: 'low' as Priority,
    label: '低优先级',
    icon: '🟢',
    color: '#67c23a'
  }
]

// 建议标签
const suggestedTags = [
  '紧急', '重要', '学习', '工作', '个人', 
  'Vue3', 'TypeScript', 'Element Plus', 
  '前端', '后端', '测试', '文档', '优化'
]

// ===== 表单验证规则 =====

// 自定义验证器类型
type Validator = (rule: any, value: any, callback: (error?: string | Error) => void) => void

// 标题验证器
const validateTitle: Validator = (rule, value, callback) => {
  if (!value || value.trim().length === 0) {
    callback(new Error('请输入任务标题'))
  } else if (value.length > 100) {
    callback(new Error('标题长度不能超过100个字符'))
  } else {
    callback()
  }
}

// 描述验证器
const validateDescription: Validator = (rule, value, callback) => {
  if (value && value.length > 500) {
    callback(new Error('描述长度不能超过500个字符'))
  } else {
    callback()
  }
}

// 截止日期验证器
const validateDueDate: Validator = (rule, value, callback) => {
  if (value && value < new Date()) {
    callback(new Error('截止日期不能早于今天'))
  } else {
    callback()
  }
}

// 表单验证规则
const formRules: FormRules = {
  title: [
    { validator: validateTitle, trigger: 'blur' }
  ],
  description: [
    { validator: validateDescription, trigger: 'blur' }
  ],
  priority: [
    { required: true, message: '请选择优先级', trigger: 'change' }
  ],
  dueDate: [
    { validator: validateDueDate, trigger: 'change' }
  ]
}

// ===== 计算属性 =====

// 当前指派的用户
const assignedUser = computed(() => {
  if (!formData.assigneeId) return null
  return props.users.find(user => user.id === formData.assigneeId) || null
})

// ===== 方法实现 =====

// 工具函数
const getRoleType = (role: UserRole): string => {
  const types = { 
    [UserRole.GUEST]: 'info',
    [UserRole.USER]: 'success',
    [UserRole.ADMIN]: 'warning',
    [UserRole.SUPER_ADMIN]: 'danger'
  }
  return types[role]
}

const getRoleText = (role: UserRole): string => {
  const texts = {
    [UserRole.GUEST]: '访客',
    [UserRole.USER]: '用户',
    [UserRole.ADMIN]: '管理员',
    [UserRole.SUPER_ADMIN]: '超级管理员'
  }
  return texts[role]
}

// 日期验证
const disabledDate = (time: Date): boolean => {
  // 禁用今天之前的日期
  return time.getTime() < Date.now() - 8.64e7
}

// 标签管理
const showTagInput = (): void => {
  tagInputVisible.value = true
  nextTick(() => {
    tagInputRef.value?.focus()
  })
}

const addTag = (): void => {
  const tag = tagInputValue.value.trim()
  if (tag && !formData.tags.includes(tag)) {
    formData.tags.push(tag)
  }
  tagInputValue.value = ''
  tagInputVisible.value = false
}

const addSuggestedTag = (tag: string): void => {
  if (!formData.tags.includes(tag)) {
    formData.tags.push(tag)
  }
}

const removeTag = (tag: string): void => {
  const index = formData.tags.indexOf(tag)
  if (index > -1) {
    formData.tags.splice(index, 1)
  }
}

// 子任务管理
const addSubtask = (): void => {
  formData.subtasks.push({
    tempId: Date.now() + Math.random(),
    title: '',
    completed: false
  })
}

const removeSubtask = (index: number): void => {
  formData.subtasks.splice(index, 1)
}

// 表单操作
const handleSubmit = async (): Promise<void> => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    submitting.value = true
    
    // 构建任务数据
    const todoData: Omit<TodoItem, 'id' | 'createdAt' | 'updatedAt'> = {
      title: formData.title.trim(),
      description: formData.description.trim() || undefined,
      completed: props.todo?.completed || false,
      priority: formData.priority,
      dueDate: formData.dueDate || undefined,
      tags: [...formData.tags],
      assignee: assignedUser.value || undefined,
      subtasks: formData.subtasks
        .filter(subtask => subtask.title.trim())
        .map((subtask, index) => ({
          id: props.todo?.subtasks?.[index]?.id || Date.now() + index,
          title: subtask.title.trim(),
          completed: subtask.completed
        }))
    }
    
    // 模拟异步提交
    await new Promise(resolve => setTimeout(resolve, 500))
    
    emit('save', todoData)
    ElMessage.success(`任务${props.todo ? '更新' : '创建'}成功`)
    
  } catch (error) {
    console.error('表单验证失败:', error)
  } finally {
    submitting.value = false
  }
}

const handleCancel = (): void => {
  emit('cancel')
}

// 初始化表单数据
const initializeForm = (): void => {
  if (props.todo) {
    // 编辑模式，填充现有数据
    Object.assign(formData, {
      title: props.todo.title,
      description: props.todo.description || '',
      priority: props.todo.priority,
      dueDate: props.todo.dueDate || null,
      assigneeId: props.todo.assignee?.id || null,
      tags: [...props.todo.tags],
      subtasks: props.todo.subtasks?.map(subtask => ({
        tempId: subtask.id,
        title: subtask.title,
        completed: subtask.completed
      })) || []
    })
  } else {
    // 创建模式，重置表单
    Object.assign(formData, {
      title: '',
      description: '',
      priority: 'medium' as Priority,
      dueDate: null,
      assigneeId: null,
      tags: [],
      subtasks: []
    })
  }
}

// 生命周期
onMounted(() => {
  initializeForm()
})

// 监听 todo 属性变化
import { watch } from 'vue'
watch(() => props.todo, () => {
  initializeForm()
}, { immediate: true })
</script>

<style scoped lang="scss">
.todo-form {
  .user-option {
    display: flex;
    align-items: center;
    gap: 8px;
    
    .user-name {
      flex: 1;
    }
  }
  
  .tags-input {
    min-height: 32px;
    border: 1px dashed #e5e7eb;
    border-radius: 4px;
    padding: 8px;
    background: #f9fafb;
    margin-bottom: 8px;
  }
  
  .suggested-tags {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 4px;
    
    .label {
      font-size: 12px;
      color: #6b7280;
      margin-right: 8px;
    }
  }
  
  .subtasks-section {
    border: 1px dashed #e5e7eb;
    border-radius: 4px;
    padding: 12px;
    background: #f9fafb;
    
    .subtask-item {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 20px;
  }
}

:deep(.el-select-dropdown__item) {
  height: auto;
  padding: 8px 20px;
}

:deep(.el-form-item__label) {
  font-weight: 500;
  color: #374151;
}

:deep(.el-input__count) {
  color: #9ca3af;
}

:deep(.el-textarea__inner) {
  resize: vertical;
}
</style>