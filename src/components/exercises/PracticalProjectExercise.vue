<template>
  <div class="practical-project-exercise">
    <el-card class="exercise-card">
      <template #header>
        <h2>🚀 TypeScript 实战项目 - 高级 Todo 应用</h2>
        <p>综合运用所有 TypeScript 特性：泛型、接口、类型守卫、工具类型等</p>
      </template>
      
      <!-- 项目概览 -->
      <el-row :gutter="20" style="margin-bottom: 20px;">
        <el-col :span="24">
          <el-card shadow="hover" class="overview-card">
            <template #header>
              <h3>📊 项目概览</h3>
            </template>
            
            <el-row :gutter="20">
              <el-col :span="6">
                <el-statistic title="总任务数" :value="todoStats.total" />
              </el-col>
              <el-col :span="6">
                <el-statistic title="已完成" :value="todoStats.completed" />
              </el-col>
              <el-col :span="6">
                <el-statistic title="进行中" :value="todoStats.active" />
              </el-col>
              <el-col :span="6">
                <el-statistic title="完成率" :value="todoStats.completionRate" suffix="%" />
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      
      <el-row :gutter="20">
        <!-- 左侧：任务管理 -->
        <el-col :span="14">
          <el-card shadow="hover" class="todo-management">
            <template #header>
              <div class="todo-header">
                <h3>📝 任务管理系统</h3>
                <el-button @click="showCreateDialog = true" type="primary" size="small">
                  新建任务
                </el-button>
              </div>
            </template>
            
            <!-- 筛选和排序 -->
            <div class="filter-bar">
              <el-row :gutter="10" align="middle">
                <el-col :span="6">
                  <el-select v-model="currentFilter" placeholder="筛选状态" @change="applyFilter">
                    <el-option label="全部" value="all" />
                    <el-option label="进行中" value="active" />
                    <el-option label="已完成" value="completed" />
                    <el-option label="高优先级" value="high-priority" />
                  </el-select>
                </el-col>
                <el-col :span="6">
                  <el-select v-model="sortBy" placeholder="排序方式" @change="applySorting">
                    <el-option label="创建时间" value="createdAt" />
                    <el-option label="优先级" value="priority" />
                    <el-option label="截止日期" value="dueDate" />
                    <el-option label="标题" value="title" />
                  </el-select>
                </el-col>
                <el-col :span="6">
                  <el-select v-model="sortOrder" @change="applySorting">
                    <el-option label="升序" value="asc" />
                    <el-option label="降序" value="desc" />
                  </el-select>
                </el-col>
                <el-col :span="6">
                  <el-input 
                    v-model="searchQuery" 
                    placeholder="搜索任务..."
                    clearable
                    @input="applySearch"
                  />
                </el-col>
              </el-row>
            </div>
            
            <!-- 任务列表 -->
            <div class="todo-list">
              <div 
                v-for="todo in displayedTodos" 
                :key="todo.id"
                class="todo-item"
                :class="{ completed: todo.completed }"
              >
                <el-row align="middle">
                  <el-col :span="1">
                    <el-checkbox 
                      v-model="todo.completed"
                      @change="toggleTodo(todo.id)"
                    />
                  </el-col>
                  <el-col :span="12">
                    <div class="todo-content">
                      <h4 :class="{ 'text-through': todo.completed }">{{ todo.title }}</h4>
                      <p v-if="todo.description" class="todo-description">{{ todo.description }}</p>
                      <div class="todo-meta">
                        <el-tag :type="getPriorityType(todo.priority)" size="small">
                          {{ getPriorityText(todo.priority) }}
                        </el-tag>
                        <el-tag v-if="todo.dueDate" size="small" :type="getDueDateType(todo.dueDate)">
                          {{ formatDate(todo.dueDate) }}
                        </el-tag>
                        <el-tag v-if="todo.assignee" size="small" type="info">
                          👤 {{ todo.assignee.name }}
                        </el-tag>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="todo-tags">
                      <el-tag 
                        v-for="tag in todo.tags" 
                        :key="tag"
                        size="small"
                        style="margin-right: 4px;"
                      >
                        {{ tag }}
                      </el-tag>
                    </div>
                  </el-col>
                  <el-col :span="5">
                    <div class="todo-actions">
                      <el-button @click="editTodo(todo)" type="primary" size="small" link>
                        编辑
                      </el-button>
                      <el-button @click="duplicateTodo(todo)" type="success" size="small" link>
                        复制
                      </el-button>
                      <el-button @click="deleteTodo(todo.id)" type="danger" size="small" link>
                        删除
                      </el-button>
                    </div>
                  </el-col>
                </el-row>
                
                <!-- 子任务 -->
                <div v-if="todo.subtasks && todo.subtasks.length > 0" class="subtasks">
                  <h5>子任务:</h5>
                  <div 
                    v-for="subtask in todo.subtasks" 
                    :key="subtask.id"
                    class="subtask-item"
                  >
                    <el-checkbox 
                      v-model="subtask.completed"
                      @change="updateSubtask(todo.id, subtask.id, { completed: subtask.completed })"
                    />
                    <span :class="{ 'text-through': subtask.completed }">{{ subtask.title }}</span>
                  </div>
                </div>
              </div>
              
              <div v-if="displayedTodos.length === 0" class="empty-state">
                <el-empty description="暂无任务" />
              </div>
            </div>
          </el-card>
        </el-col>
        
        <!-- 右侧：用户管理和统计 -->
        <el-col :span="10">
          <!-- 用户信息 -->
          <el-card shadow="hover" class="user-card" style="margin-bottom: 20px;">
            <template #header>
              <h3>👤 用户信息</h3>
            </template>
            
            <div class="user-info">
              <el-avatar :size="64" :src="currentUser.profile.avatar">
                {{ currentUser.name.charAt(0) }}
              </el-avatar>
              <div class="user-details">
                <h4>{{ currentUser.name }}</h4>
                <p>{{ currentUser.email }}</p>
                <el-tag :type="getRoleType(currentUser.role)">
                  {{ getRoleText(currentUser.role) }}
                </el-tag>
                <el-tag type="info" style="margin-left: 8px;">
                  {{ getThemeText(currentUser.preferences.theme) }}
                </el-tag>
              </div>
            </div>
          </el-card>
          
          <!-- 分析图表 -->
          <el-card shadow="hover" class="analytics-card">
            <template #header>
              <h3>📈 任务分析</h3>
            </template>
            
            <div class="analytics-content">
              <!-- 优先级分布 -->
              <div class="priority-distribution">
                <h5>优先级分布</h5>
                <div class="priority-bars">
                  <div 
                    v-for="priority in priorityDistribution" 
                    :key="priority.type"
                    class="priority-bar"
                  >
                    <span class="priority-label">{{ priority.label }}</span>
                    <el-progress 
                      :percentage="priority.percentage" 
                      :color="priority.color"
                      :stroke-width="12"
                    />
                    <span class="priority-count">{{ priority.count }}</span>
                  </div>
                </div>
              </div>
              
              <!-- 标签云 -->
              <div class="tag-cloud">
                <h5>标签云</h5>
                <div class="tags">
                  <el-tag 
                    v-for="tag in tagCloud" 
                    :key="tag.name"
                    :size="getTagSize(tag.count)"
                    style="margin: 4px;"
                  >
                    {{ tag.name }} ({{ tag.count }})
                  </el-tag>
                </div>
              </div>
              
              <!-- 最近活动 -->
              <div class="recent-activity">
                <h5>最近活动</h5>
                <el-timeline>
                  <el-timeline-item 
                    v-for="activity in recentActivities" 
                    :key="activity.id"
                    :timestamp="formatDateTime(activity.timestamp)"
                    :type="getActivityType(activity.type)"
                  >
                    {{ activity.description }}
                  </el-timeline-item>
                </el-timeline>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      
      <!-- TypeScript 特性展示 -->
      <el-row style="margin-top: 20px;">
        <el-col :span="24">
          <el-card shadow="hover" class="typescript-features">
            <template #header>
              <h3>💻 TypeScript 特性展示</h3>
            </template>
            
            <el-tabs v-model="activeFeatureTab">
              <el-tab-pane label="类型定义" name="types">
                <div class="feature-demo">
                  <h4>本项目使用的 TypeScript 类型定义:</h4>
                  <pre><code>{{ typeDefinitions }}</code></pre>
                </div>
              </el-tab-pane>
              
              <el-tab-pane label="泛型应用" name="generics">
                <div class="feature-demo">
                  <h4>泛型在项目中的实际应用:</h4>
                  <pre><code>{{ genericExamples }}</code></pre>
                  
                  <h4>泛型操作演示:</h4>
                  <div class="generic-demo">
                    <el-button @click="demonstrateGenericFilter" size="small">
                      泛型筛选演示
                    </el-button>
                    <el-button @click="demonstrateGenericMapper" size="small">
                      泛型映射演示
                    </el-button>
                    <el-button @click="demonstrateGenericValidator" size="small">
                      泛型验证演示
                    </el-button>
                  </div>
                  
                  <div v-if="genericResult" class="demo-result">
                    <h5>演示结果:</h5>
                    <pre>{{ genericResult }}</pre>
                  </div>
                </div>
              </el-tab-pane>
              
              <el-tab-pane label="类型守卫" name="type-guards">
                <div class="feature-demo">
                  <h4>类型守卫和类型缩窄:</h4>
                  <pre><code>{{ typeGuardExamples }}</code></pre>
                  
                  <h4>类型守卫演示:</h4>
                  <div class="type-guard-demo">
                    <el-button @click="demonstrateTypeGuards" size="small">
                      演示类型守卫
                    </el-button>
                    <el-button @click="demonstrateDiscriminatedUnions" size="small">
                      演示判别联合
                    </el-button>
                  </div>
                  
                  <div v-if="typeGuardResult" class="demo-result">
                    <h5>类型守卫结果:</h5>
                    <pre>{{ typeGuardResult }}</pre>
                  </div>
                </div>
              </el-tab-pane>
              
              <el-tab-pane label="工具类型" name="utility-types">
                <div class="feature-demo">
                  <h4>工具类型的实际应用:</h4>
                  <pre><code>{{ utilityTypeExamples }}</code></pre>
                  
                  <h4>工具类型演示:</h4>
                  <div class="utility-demo">
                    <el-button @click="demonstratePartial" size="small">
                      Partial 类型
                    </el-button>
                    <el-button @click="demonstratePick" size="small">
                      Pick 类型
                    </el-button>
                    <el-button @click="demonstrateOmit" size="small">
                      Omit 类型
                    </el-button>
                    <el-button @click="demonstrateRecord" size="small">
                      Record 类型
                    </el-button>
                  </div>
                  
                  <div v-if="utilityResult" class="demo-result">
                    <h5>工具类型结果:</h5>
                    <pre>{{ utilityResult }}</pre>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    
    <!-- 创建/编辑任务对话框 -->
    <el-dialog 
      v-model="showCreateDialog" 
      :title="editingTodo ? '编辑任务' : '创建新任务'"
      width="600px"
    >
      <TodoForm 
        :todo="editingTodo"
        :users="availableUsers"
        @save="saveTodo"
        @cancel="cancelEdit"
      />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, type Ref, type ComputedRef } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { 
  TodoItem, 
  User, 
  TodoFilter, 
  UserRole,
  Theme,
  Priority,
  SubTask,
  PaginationParams,
  ApiResponse
} from '../../types/exercises'

// 组件导入
import TodoForm from './TodoForm.vue'

// ===== 响应式数据 =====

// 当前用户
const currentUser: Ref<User> = ref({
  id: 1,
  name: 'TypeScript 学习者',
  age: 25,
  email: 'learner@typescript.com',
  role: UserRole.USER,
  permissions: [],
  profile: {
    avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
    bio: '正在学习 TypeScript 的开发者',
    socialLinks: {
      github: 'https://github.com/typescript-learner'
    }
  },
  preferences: {
    theme: 'light' as Theme,
    language: 'zh-CN',
    notifications: {
      email: true,
      push: true,
      sms: false,
      frequency: 'immediate'
    }
  }
})

// 可用用户列表
const availableUsers: Ref<User[]> = ref([
  currentUser.value,
  {
    id: 2,
    name: '项目经理',
    age: 30,
    email: 'pm@company.com',
    role: UserRole.ADMIN,
    permissions: [],
    profile: { socialLinks: {} },
    preferences: {
      theme: 'dark' as Theme,
      language: 'zh-CN',
      notifications: {
        email: true,
        push: true,
        sms: true,
        frequency: 'daily'
      }
    }
  }
])

// 任务列表
const todos: Ref<TodoItem[]> = ref([
  {
    id: 1,
    title: '学习 TypeScript 基础语法',
    description: '掌握类型注解、接口、泛型等核心概念',
    completed: true,
    priority: 'high' as Priority,
    dueDate: new Date('2024-01-15'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-10'),
    tags: ['学习', 'TypeScript', '基础'],
    assignee: currentUser.value,
    subtasks: [
      { id: 1, title: '理解类型注解', completed: true },
      { id: 2, title: '学习接口定义', completed: true },
      { id: 3, title: '掌握泛型概念', completed: false }
    ]
  },
  {
    id: 2,
    title: '实现 Todo 应用',
    description: '使用 Vue 3 + TypeScript + Element Plus 构建完整应用',
    completed: false,
    priority: 'medium' as Priority,
    dueDate: new Date('2024-01-20'),
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-15'),
    tags: ['实战', 'Vue3', 'Element Plus'],
    assignee: currentUser.value,
    subtasks: [
      { id: 1, title: '设计数据结构', completed: true },
      { id: 2, title: '实现CRUD操作', completed: false },
      { id: 3, title: '添加筛选排序', completed: false }
    ]
  },
  {
    id: 3,
    title: '优化应用性能',
    description: '使用 TypeScript 高级特性优化代码质量',
    completed: false,
    priority: 'low' as Priority,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    tags: ['优化', '性能'],
    assignee: availableUsers.value[1]
  }
])

// UI 状态
const showCreateDialog = ref(false)
const editingTodo: Ref<TodoItem | null> = ref(null)
const currentFilter: Ref<string> = ref('all')
const sortBy: Ref<keyof TodoItem> = ref('createdAt')
const sortOrder: Ref<'asc' | 'desc'> = ref('desc')
const searchQuery = ref('')

// 特性演示
const activeFeatureTab = ref('types')
const genericResult = ref('')
const typeGuardResult = ref('')
const utilityResult = ref('')

// 活动记录
interface Activity {
  id: number
  type: 'create' | 'update' | 'delete' | 'complete'
  description: string
  timestamp: Date
}

const recentActivities: Ref<Activity[]> = ref([
  {
    id: 1,
    type: 'complete',
    description: '完成了任务"学习 TypeScript 基础语法"',
    timestamp: new Date(Date.now() - 1000 * 60 * 30)
  },
  {
    id: 2,
    type: 'create',
    description: '创建了任务"实现 Todo 应用"',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2)
  },
  {
    id: 3,
    type: 'update',
    description: '更新了任务"优化应用性能"',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6)
  }
])

// ===== 计算属性 =====

// 任务统计
const todoStats: ComputedRef<{
  total: number
  completed: number
  active: number
  completionRate: number
}> = computed(() => {
  const total = todos.value.length
  const completed = todos.value.filter(t => t.completed).length
  const active = total - completed
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0
  
  return { total, completed, active, completionRate }
})

// 筛选后的任务
const filteredTodos: ComputedRef<TodoItem[]> = computed(() => {
  let filtered = todos.value
  
  // 状态筛选
  switch (currentFilter.value) {
    case 'active':
      filtered = filtered.filter(t => !t.completed)
      break
    case 'completed':
      filtered = filtered.filter(t => t.completed)
      break
    case 'high-priority':
      filtered = filtered.filter(t => t.priority === 'high')
      break
  }
  
  // 搜索筛选
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(t => 
      t.title.toLowerCase().includes(query) ||
      t.description?.toLowerCase().includes(query) ||
      t.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }
  
  return filtered
})

// 排序后的任务
const displayedTodos: ComputedRef<TodoItem[]> = computed(() => {
  const sorted = [...filteredTodos.value]
  
  sorted.sort((a, b) => {
    const aValue = a[sortBy.value]
    const bValue = b[sortBy.value]
    
    if (aValue === undefined || bValue === undefined) return 0
    
    let comparison = 0
    
    if (aValue instanceof Date && bValue instanceof Date) {
      comparison = aValue.getTime() - bValue.getTime()
    } else if (typeof aValue === 'string' && typeof bValue === 'string') {
      comparison = aValue.localeCompare(bValue)
    } else if (typeof aValue === 'number' && typeof bValue === 'number') {
      comparison = aValue - bValue
    } else {
      comparison = String(aValue).localeCompare(String(bValue))
    }
    
    return sortOrder.value === 'desc' ? -comparison : comparison
  })
  
  return sorted
})

// 优先级分布
const priorityDistribution: ComputedRef<Array<{
  type: Priority
  label: string
  count: number
  percentage: number
  color: string
}>> = computed(() => {
  const total = todos.value.length
  const priorities: Priority[] = ['high', 'medium', 'low']
  
  return priorities.map(priority => {
    const count = todos.value.filter(t => t.priority === priority).length
    const percentage = total > 0 ? Math.round((count / total) * 100) : 0
    
    return {
      type: priority,
      label: getPriorityText(priority),
      count,
      percentage,
      color: getPriorityColor(priority)
    }
  })
})

// 标签云
const tagCloud: ComputedRef<Array<{ name: string; count: number }>> = computed(() => {
  const tagCount = new Map<string, number>()
  
  todos.value.forEach(todo => {
    todo.tags.forEach(tag => {
      tagCount.set(tag, (tagCount.get(tag) || 0) + 1)
    })
  })
  
  return Array.from(tagCount.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
})

// ===== 方法实现 =====

// 任务操作
const toggleTodo = (id: number): void => {
  const todo = todos.value.find(t => t.id === id)
  if (todo) {
    todo.completed = !todo.completed
    todo.updatedAt = new Date()
    
    // 记录活动
    addActivity({
      type: todo.completed ? 'complete' : 'update',
      description: `${todo.completed ? '完成' : '重新激活'}了任务"${todo.title}"`,
      timestamp: new Date()
    })
    
    ElMessage.success(`任务已${todo.completed ? '完成' : '重新激活'}`)
  }
}

const deleteTodo = async (id: number): Promise<void> => {
  try {
    await ElMessageBox.confirm('确定要删除这个任务吗？', '确认删除', {
      type: 'warning'
    })
    
    const index = todos.value.findIndex(t => t.id === id)
    if (index > -1) {
      const todo = todos.value[index]
      todos.value.splice(index, 1)
      
      addActivity({
        type: 'delete',
        description: `删除了任务"${todo.title}"`,
        timestamp: new Date()
      })
      
      ElMessage.success('任务已删除')
    }
  } catch {
    // 用户取消删除
  }
}

const editTodo = (todo: TodoItem): void => {
  editingTodo.value = { ...todo }
  showCreateDialog.value = true
}

const duplicateTodo = (todo: TodoItem): void => {
  const newTodo: TodoItem = {
    ...todo,
    id: Date.now(),
    title: `${todo.title} (副本)`,
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  
  todos.value.unshift(newTodo)
  
  addActivity({
    type: 'create',
    description: `复制了任务"${newTodo.title}"`,
    timestamp: new Date()
  })
  
  ElMessage.success('任务已复制')
}

const saveTodo = (todoData: Omit<TodoItem, 'id' | 'createdAt' | 'updatedAt'>): void => {
  if (editingTodo.value) {
    // 编辑现有任务
    const index = todos.value.findIndex(t => t.id === editingTodo.value!.id)
    if (index > -1) {
      todos.value[index] = {
        ...todos.value[index],
        ...todoData,
        updatedAt: new Date()
      }
      
      addActivity({
        type: 'update',
        description: `更新了任务"${todoData.title}"`,
        timestamp: new Date()
      })
      
      ElMessage.success('任务已更新')
    }
  } else {
    // 创建新任务
    const newTodo: TodoItem = {
      id: Date.now(),
      ...todoData,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    todos.value.unshift(newTodo)
    
    addActivity({
      type: 'create',
      description: `创建了任务"${newTodo.title}"`,
      timestamp: new Date()
    })
    
    ElMessage.success('任务已创建')
  }
  
  showCreateDialog.value = false
  editingTodo.value = null
}

const cancelEdit = (): void => {
  showCreateDialog.value = false
  editingTodo.value = null
}

const updateSubtask = (todoId: number, subtaskId: number, updates: Partial<SubTask>): void => {
  const todo = todos.value.find(t => t.id === todoId)
  if (todo && todo.subtasks) {
    const subtask = todo.subtasks.find(s => s.id === subtaskId)
    if (subtask) {
      Object.assign(subtask, updates)
      todo.updatedAt = new Date()
    }
  }
}

// 筛选和排序
const applyFilter = (): void => {
  // 筛选逻辑在计算属性中处理
}

const applySorting = (): void => {
  // 排序逻辑在计算属性中处理
}

const applySearch = (): void => {
  // 搜索逻辑在计算属性中处理
}

// 活动记录
const addActivity = (activity: Omit<Activity, 'id'>): void => {
  recentActivities.value.unshift({
    id: Date.now(),
    ...activity
  })
  
  // 只保留最近10条活动
  if (recentActivities.value.length > 10) {
    recentActivities.value = recentActivities.value.slice(0, 10)
  }
}

// 工具函数
const getPriorityType = (priority: Priority): string => {
  const types = { high: 'danger', medium: 'warning', low: 'info' }
  return types[priority]
}

const getPriorityText = (priority: Priority): string => {
  const texts = { high: '高优先级', medium: '中优先级', low: '低优先级' }
  return texts[priority]
}

const getPriorityColor = (priority: Priority): string => {
  const colors = { high: '#f56c6c', medium: '#e6a23c', low: '#909399' }
  return colors[priority]
}

const getDueDateType = (dueDate: Date): string => {
  const now = new Date()
  const timeDiff = dueDate.getTime() - now.getTime()
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))
  
  if (daysDiff < 0) return 'danger'
  if (daysDiff <= 1) return 'warning'
  return 'success'
}

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

const getThemeText = (theme: Theme): string => {
  const texts = { light: '浅色主题', dark: '深色主题', auto: '自动主题' }
  return texts[theme]
}

const getActivityType = (type: Activity['type']): string => {
  const types = { create: 'success', update: 'primary', delete: 'danger', complete: 'success' }
  return types[type]
}

const getTagSize = (count: number): 'small' | 'default' | 'large' => {
  if (count >= 3) return 'large'
  if (count >= 2) return 'default'
  return 'small'
}

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('zh-CN')
}

const formatDateTime = (date: Date): string => {
  return date.toLocaleString('zh-CN')
}

// TypeScript 特性演示方法
const demonstrateGenericFilter = (): void => {
  // 泛型筛选函数
  function genericFilter<T>(items: T[], predicate: (item: T) => boolean): T[] {
    return items.filter(predicate)
  }
  
  const highPriorityTodos = genericFilter(todos.value, todo => todo.priority === 'high')
  const completedTodos = genericFilter(todos.value, todo => todo.completed)
  
  genericResult.value = `
泛型筛选演示:
1. 高优先级任务: ${highPriorityTodos.length} 个
2. 已完成任务: ${completedTodos.length} 个

泛型函数自动推断类型，确保类型安全
  `
}

const demonstrateGenericMapper = (): void => {
  // 泛型映射函数
  function genericMap<T, U>(items: T[], mapper: (item: T) => U): U[] {
    return items.map(mapper)
  }
  
  const todoTitles = genericMap(todos.value, todo => todo.title)
  const todoPriorities = genericMap(todos.value, todo => todo.priority)
  
  genericResult.value = `
泛型映射演示:
1. 任务标题: ${JSON.stringify(todoTitles, null, 2)}
2. 优先级列表: ${JSON.stringify(todoPriorities, null, 2)}

泛型确保输入输出类型的一致性
  `
}

const demonstrateGenericValidator = (): void => {
  // 泛型验证函数
  function validate<T>(data: T, rules: Partial<Record<keyof T, (value: any) => boolean>>): boolean {
    return Object.entries(rules).every(([key, validator]) => {
      const value = data[key as keyof T]
      return validator ? validator(value) : true
    })
  }
  
  const todoRules = {
    title: (value: string) => value.length > 0,
    priority: (value: Priority) => ['high', 'medium', 'low'].includes(value)
  }
  
  const validTodos = todos.value.filter(todo => validate(todo, todoRules))
  
  genericResult.value = `
泛型验证演示:
验证规则: 标题非空 && 优先级有效
有效任务数: ${validTodos.length} / ${todos.value.length}

泛型验证器提供类型安全的验证机制
  `
}

const demonstrateTypeGuards = (): void => {
  // 类型守卫函数
  function isTodoWithDueDate(todo: TodoItem): todo is TodoItem & { dueDate: Date } {
    return todo.dueDate !== undefined
  }
  
  function isHighPriorityTodo(todo: TodoItem): todo is TodoItem & { priority: 'high' } {
    return todo.priority === 'high'
  }
  
  const todosWithDueDate = todos.value.filter(isTodoWithDueDate)
  const highPriorityTodos = todos.value.filter(isHighPriorityTodo)
  
  typeGuardResult.value = `
类型守卫演示:
1. 有截止日期的任务: ${todosWithDueDate.length} 个
2. 高优先级任务: ${highPriorityTodos.length} 个

类型守卫确保在运行时进行正确的类型检查和缩窄
  `
}

const demonstrateDiscriminatedUnions = (): void => {
  // 判别联合类型
  type TodoEvent = 
    | { type: 'CREATE'; todo: TodoItem }
    | { type: 'UPDATE'; id: number; changes: Partial<TodoItem> }
    | { type: 'DELETE'; id: number }
    | { type: 'TOGGLE'; id: number }
  
  function handleTodoEvent(event: TodoEvent): string {
    switch (event.type) {
      case 'CREATE':
        return `创建任务: ${event.todo.title}`
      case 'UPDATE':
        return `更新任务 ${event.id}: ${Object.keys(event.changes).join(', ')}`
      case 'DELETE':
        return `删除任务 ${event.id}`
      case 'TOGGLE':
        return `切换任务 ${event.id} 状态`
      default:
        // TypeScript 会检查所有情况都被处理
        const _exhaustive: never = event
        return _exhaustive
    }
  }
  
  const events: TodoEvent[] = [
    { type: 'CREATE', todo: todos.value[0] },
    { type: 'UPDATE', id: 1, changes: { title: '新标题' } },
    { type: 'DELETE', id: 2 },
    { type: 'TOGGLE', id: 3 }
  ]
  
  const results = events.map(handleTodoEvent)
  
  typeGuardResult.value = `
判别联合类型演示:
${results.join('\n')}

判别联合确保 switch 语句的完整性检查
  `
}

// 工具类型演示
const demonstratePartial = (): void => {
  type TodoUpdate = Partial<TodoItem>
  
  const update: TodoUpdate = {
    title: '部分更新的标题',
    completed: true
    // 其他字段都是可选的
  }
  
  utilityResult.value = `
Partial<T> 演示:
原始 TodoItem 所有字段都是必需的
Partial<TodoItem> 使所有字段变为可选

更新对象: ${JSON.stringify(update, null, 2)}
  `
}

const demonstratePick = (): void => {
  type TodoSummary = Pick<TodoItem, 'id' | 'title' | 'completed'>
  
  const summaries: TodoSummary[] = todos.value.map(todo => ({
    id: todo.id,
    title: todo.title,
    completed: todo.completed
  }))
  
  utilityResult.value = `
Pick<T, K> 演示:
从 TodoItem 中选择特定字段创建新类型

任务摘要: ${JSON.stringify(summaries, null, 2)}
  `
}

const demonstrateOmit = (): void => {
  type TodoWithoutTimestamps = Omit<TodoItem, 'createdAt' | 'updatedAt'>
  
  // 模拟从 API 接收的数据（不包含时间戳）
  const apiData: TodoWithoutTimestamps = {
    id: 999,
    title: '来自 API 的任务',
    description: '这个任务不包含时间戳字段',
    completed: false,
    priority: 'medium',
    tags: ['API', '演示']
  }
  
  utilityResult.value = `
Omit<T, K> 演示:
从 TodoItem 中排除时间戳字段

API 数据: ${JSON.stringify(apiData, null, 2)}
  `
}

const demonstrateRecord = (): void => {
  type TodosByPriority = Record<Priority, TodoItem[]>
  
  const todosByPriority: TodosByPriority = {
    high: todos.value.filter(t => t.priority === 'high'),
    medium: todos.value.filter(t => t.priority === 'medium'),
    low: todos.value.filter(t => t.priority === 'low')
  }
  
  const counts = Object.entries(todosByPriority).map(([priority, todos]) => 
    `${priority}: ${todos.length} 个任务`
  ).join('\n')
  
  utilityResult.value = `
Record<K, T> 演示:
创建以优先级为键，任务数组为值的对象类型

优先级统计:
${counts}
  `
}

// 代码示例字符串
const typeDefinitions = `
// 核心业务类型定义
interface TodoItem {
  id: number
  title: string
  description?: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  dueDate?: Date
  createdAt: Date
  updatedAt: Date
  tags: string[]
  assignee?: User
  subtasks?: SubTask[]
}

interface User {
  id: number
  name: string
  age: number
  email?: string
  role: UserRole
  permissions: Permission[]
  profile: UserProfile
  preferences: UserPreferences
}

// 判别联合类型
type TodoEvent = 
  | { type: 'CREATE'; todo: TodoItem }
  | { type: 'UPDATE'; id: number; changes: Partial<TodoItem> }
  | { type: 'DELETE'; id: number }
  | { type: 'TOGGLE'; id: number }
`

const genericExamples = `
// 泛型API响应类型
interface ApiResponse<T> {
  code: number
  message: string
  data: T
  timestamp: Date
}

// 泛型筛选函数
function filter<T>(items: T[], predicate: (item: T) => boolean): T[] {
  return items.filter(predicate)
}

// 泛型映射函数
function map<T, U>(items: T[], mapper: (item: T) => U): U[] {
  return items.map(mapper)
}

// 实际使用
const highPriorityTodos = filter(todos, todo => todo.priority === 'high')
const todoTitles = map(todos, todo => todo.title)
`

const typeGuardExamples = `
// 类型守卫函数
function isTodoWithDueDate(todo: TodoItem): todo is TodoItem & { dueDate: Date } {
  return todo.dueDate !== undefined
}

function isUser(obj: any): obj is User {
  return obj && typeof obj.id === 'number' && typeof obj.name === 'string'
}

// 使用类型守卫
const todosWithDueDate = todos.filter(isTodoWithDueDate)
// 现在 TypeScript 知道这些 todo 一定有 dueDate 属性

// 判别联合类型处理
function handleEvent(event: TodoEvent) {
  switch (event.type) {
    case 'CREATE':
      // TypeScript 知道这里 event.todo 存在
      return createTodo(event.todo)
    case 'UPDATE':
      // TypeScript 知道这里有 id 和 changes
      return updateTodo(event.id, event.changes)
    // ... 其他情况
  }
}
`

const utilityTypeExamples = `
// Partial - 所有属性变为可选
type TodoUpdate = Partial<TodoItem>
function updateTodo(id: number, updates: TodoUpdate) {
  // 只需要提供部分字段
}

// Pick - 选择特定属性
type TodoSummary = Pick<TodoItem, 'id' | 'title' | 'completed'>

// Omit - 排除特定属性
type TodoCreate = Omit<TodoItem, 'id' | 'createdAt' | 'updatedAt'>

// Record - 创建映射类型
type TodosByPriority = Record<Priority, TodoItem[]>

// Required - 所有属性变为必需
type CompleteTodo = Required<TodoItem>

// Readonly - 所有属性变为只读
type ImmutableTodo = Readonly<TodoItem>
`
</script>

<style scoped lang="scss">
.practical-project-exercise {
  .exercise-card {
    .el-card__header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      
      h2 {
        margin: 0;
        font-size: 1.6em;
      }
      
      p {
        margin: 10px 0 0 0;
        opacity: 0.9;
      }
    }
  }
  
  .overview-card {
    .el-card__header {
      background: #f0fdf4;
      
      h3 {
        margin: 0;
        color: #15803d;
      }
    }
  }
  
  .todo-management {
    .todo-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      h3 {
        margin: 0;
        color: #1f2937;
      }
    }
    
    .filter-bar {
      margin-bottom: 20px;
      padding: 16px;
      background: #f8fafc;
      border-radius: 8px;
    }
    
    .todo-list {
      max-height: 600px;
      overflow-y: auto;
    }
    
    .todo-item {
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 12px;
      transition: all 0.3s ease;
      
      &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
      
      &.completed {
        background: #f9fafb;
        opacity: 0.8;
      }
      
      .todo-content {
        h4 {
          margin: 0 0 8px 0;
          color: #1f2937;
          
          &.text-through {
            text-decoration: line-through;
            color: #9ca3af;
          }
        }
        
        .todo-description {
          margin: 0 0 12px 0;
          color: #6b7280;
          font-size: 14px;
        }
        
        .todo-meta {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
      }
      
      .todo-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
      }
      
      .todo-actions {
        text-align: right;
      }
      
      .subtasks {
        margin-top: 16px;
        padding-top: 12px;
        border-top: 1px solid #e5e7eb;
        
        h5 {
          margin: 0 0 8px 0;
          color: #374151;
          font-size: 13px;
        }
        
        .subtask-item {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
          
          span {
            font-size: 13px;
            color: #6b7280;
            
            &.text-through {
              text-decoration: line-through;
              color: #9ca3af;
            }
          }
        }
      }
    }
    
    .empty-state {
      text-align: center;
      padding: 40px 0;
    }
  }
  
  .user-card {
    .user-info {
      display: flex;
      align-items: center;
      gap: 16px;
      
      .user-details {
        h4 {
          margin: 0 0 4px 0;
          color: #1f2937;
        }
        
        p {
          margin: 0 0 8px 0;
          color: #6b7280;
          font-size: 14px;
        }
      }
    }
  }
  
  .analytics-card {
    .analytics-content {
      .priority-distribution {
        margin-bottom: 24px;
        
        h5 {
          margin: 0 0 12px 0;
          color: #374151;
        }
        
        .priority-bars {
          .priority-bar {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 8px;
            
            .priority-label {
              min-width: 80px;
              font-size: 13px;
              color: #6b7280;
            }
            
            .priority-count {
              min-width: 30px;
              text-align: right;
              font-size: 13px;
              color: #374151;
            }
          }
        }
      }
      
      .tag-cloud {
        margin-bottom: 24px;
        
        h5 {
          margin: 0 0 12px 0;
          color: #374151;
        }
        
        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }
      }
      
      .recent-activity {
        h5 {
          margin: 0 0 12px 0;
          color: #374151;
        }
      }
    }
  }
  
  .typescript-features {
    .feature-demo {
      h4 {
        margin: 15px 0 10px 0;
        color: #374151;
      }
      
      pre {
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 6px;
        padding: 16px;
        font-size: 13px;
        line-height: 1.5;
        overflow-x: auto;
        margin: 10px 0;
      }
      
      .generic-demo, .type-guard-demo, .utility-demo {
        margin: 15px 0;
        
        .el-button {
          margin-right: 10px;
          margin-bottom: 10px;
        }
      }
      
      .demo-result {
        margin-top: 15px;
        
        h5 {
          margin: 0 0 10px 0;
          color: #374151;
        }
        
        pre {
          background: #fffbeb;
          border: 1px solid #fed7aa;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      }
    }
  }
}

:deep(.el-progress-bar__outer) {
  background-color: #f3f4f6;
}

:deep(.el-timeline-item__timestamp) {
  font-size: 12px;
  color: #9ca3af;
}
</style>