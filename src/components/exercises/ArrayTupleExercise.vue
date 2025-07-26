<template>
  <div class="array-tuple-exercise">
    <el-card class="exercise-card">
      <template #header>
        <h2>📊 数组与元组类型练习</h2>
        <p>学习数组、只读数组、元组、命名元组等高级数组类型</p>
      </template>
      
      <el-row :gutter="20">
        <!-- 基础数组练习 -->
        <el-col :span="12">
          <el-card shadow="hover" class="type-card">
            <template #header>
              <h3>📋 基础数组操作</h3>
            </template>
            
            <div class="exercise-content">
              <el-form label-width="120px">
                <el-form-item label="添加数字:">
                  <el-input-number 
                    v-model="newNumber" 
                    placeholder="输入数字"
                    @keyup.enter="addNumber"
                  />
                  <el-button @click="addNumber" type="primary" size="small" style="margin-left: 10px;">
                    添加
                  </el-button>
                </el-form-item>
                
                <el-form-item label="数字数组:">
                  <div class="array-display">
                    <el-tag 
                      v-for="(num, index) in numberArray" 
                      :key="index"
                      closable
                      @close="removeNumber(index)"
                      style="margin-right: 8px; margin-bottom: 8px;"
                    >
                      {{ num }}
                    </el-tag>
                  </div>
                </el-form-item>
                
                <el-form-item label="数组统计:">
                  <div class="array-stats">
                    <el-tag size="small">长度: {{ arrayStats.length }}</el-tag>
                    <el-tag size="small" type="success">总和: {{ arrayStats.sum }}</el-tag>
                    <el-tag size="small" type="warning">平均值: {{ arrayStats.average }}</el-tag>
                    <el-tag size="small" type="danger">最大值: {{ arrayStats.max }}</el-tag>
                    <el-tag size="small" type="info">最小值: {{ arrayStats.min }}</el-tag>
                  </div>
                </el-form-item>
                
                <el-form-item label="数组操作:">
                  <div class="array-operations">
                    <el-button @click="sortArray" size="small">排序</el-button>
                    <el-button @click="reverseArray" size="small">反转</el-button>
                    <el-button @click="shuffleArray" size="small">洗牌</el-button>
                    <el-button @click="clearArray" size="small" type="danger">清空</el-button>
                  </div>
                </el-form-item>
              </el-form>
            </div>
          </el-card>
        </el-col>
        
        <!-- 字符串数组练习 -->
        <el-col :span="12">
          <el-card shadow="hover" class="type-card">
            <template #header>
              <h3>📝 字符串数组操作</h3>
            </template>
            
            <div class="exercise-content">
              <el-form label-width="120px">
                <el-form-item label="添加标签:">
                  <el-input 
                    v-model="newTag" 
                    placeholder="输入标签"
                    @keyup.enter="addTag"
                  />
                  <el-button @click="addTag" type="success" size="small" style="margin-left: 10px;">
                    添加
                  </el-button>
                </el-form-item>
                
                <el-form-item label="标签数组:">
                  <div class="array-display">
                    <el-tag 
                      v-for="(tag, index) in tagArray" 
                      :key="index"
                      :type="getTagType(tag)"
                      closable
                      @close="removeTag(index)"
                      style="margin-right: 8px; margin-bottom: 8px;"
                    >
                      {{ tag }}
                    </el-tag>
                  </div>
                </el-form-item>
                
                <el-form-item label="过滤搜索:">
                  <el-input 
                    v-model="tagFilter" 
                    placeholder="搜索标签"
                    clearable
                  />
                </el-form-item>
                
                <el-form-item label="过滤结果:">
                  <div class="filtered-tags">
                    <el-tag 
                      v-for="tag in filteredTags" 
                      :key="tag"
                      size="small"
                      style="margin-right: 8px; margin-bottom: 8px;"
                    >
                      {{ tag }}
                    </el-tag>
                  </div>
                </el-form-item>
                
                <el-form-item label="字符串操作:">
                  <div class="string-operations">
                    <el-button @click="joinTags" size="small">连接</el-button>
                    <el-button @click="capitalizeTags" size="small">首字母大写</el-button>
                    <el-button @click="sortTags" size="small">排序</el-button>
                  </div>
                </el-form-item>
                
                <el-form-item v-if="joinedString" label="连接结果:">
                  <el-input v-model="joinedString" readonly type="textarea" />
                </el-form-item>
              </el-form>
            </div>
          </el-card>
        </el-col>
      </el-row>
      
      <el-row :gutter="20" style="margin-top: 20px;">
        <!-- 元组类型练习 -->
        <el-col :span="12">
          <el-card shadow="hover" class="type-card">
            <template #header>
              <h3>🎯 元组类型操作</h3>
            </template>
            
            <div class="exercise-content">
              <el-form label-width="120px">
                <el-form-item label="人员信息:">
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <el-input v-model="personName" placeholder="姓名" />
                    </el-col>
                    <el-col :span="8">
                      <el-input-number v-model="personAge" placeholder="年龄" :min="0" :max="150" />
                    </el-col>
                    <el-col :span="8">
                      <el-checkbox v-model="personMarried">已婚</el-checkbox>
                    </el-col>
                  </el-row>
                  <el-button @click="addPerson" type="primary" size="small" style="margin-top: 10px;">
                    添加人员
                  </el-button>
                </el-form-item>
                
                <el-form-item label="人员列表:">
                  <el-table :data="personTuples" stripe size="small">
                    <el-table-column prop="0" label="姓名" />
                    <el-table-column prop="1" label="年龄" />
                    <el-table-column prop="2" label="婚姻状态">
                      <template #default="{ row }">
                        <el-tag :type="row[2] ? 'success' : 'info'">
                          {{ row[2] ? '已婚' : '未婚' }}
                        </el-tag>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" width="100">
                      <template #default="{ $index }">
                        <el-button @click="removePerson($index)" type="danger" size="small">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-form-item>
              </el-form>
            </div>
          </el-card>
        </el-col>
        
        <!-- 只读数组和高级类型 -->
        <el-col :span="12">
          <el-card shadow="hover" class="type-card">
            <template #header>
              <h3>🔒 只读数组与高级类型</h3>
            </template>
            
            <div class="exercise-content">
              <el-form label-width="120px">
                <el-form-item label="配置项:">
                  <el-checkbox-group v-model="selectedConfigs">
                    <el-checkbox v-for="config in readonlyConfigs" :key="config" :label="config">
                      {{ config }}
                    </el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                
                <el-form-item label="坐标元组:">
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <el-input-number v-model="coordinateX" placeholder="X坐标" />
                    </el-col>
                    <el-col :span="12">
                      <el-input-number v-model="coordinateY" placeholder="Y坐标" />
                    </el-col>
                  </el-row>
                  <el-button @click="addCoordinate" type="success" size="small" style="margin-top: 10px;">
                    添加坐标
                  </el-button>
                </el-form-item>
                
                <el-form-item label="坐标列表:">
                  <div class="coordinates-display">
                    <el-tag 
                      v-for="(coord, index) in coordinates" 
                      :key="index"
                      closable
                      @close="removeCoordinate(index)"
                      style="margin-right: 8px; margin-bottom: 8px;"
                    >
                      ({{ coord[0] }}, {{ coord[1] }})
                    </el-tag>
                  </div>
                </el-form-item>
                
                <el-form-item label="可变参数:">
                  <el-input 
                    v-model="variableInput" 
                    placeholder="输入多个值，用逗号分隔"
                    @keyup.enter="parseVariableArgs"
                  />
                  <el-button @click="parseVariableArgs" type="warning" size="small" style="margin-left: 10px;">
                    解析
                  </el-button>
                </el-form-item>
                
                <el-form-item v-if="variableArgs.length > 0" label="解析结果:">
                  <div class="variable-args">
                    <el-tag size="small" type="success">第一个: {{ variableArgs[0] }}</el-tag>
                    <el-tag v-if="variableArgs.length > 1" size="small" type="warning">
                      其余: [{{ variableArgs.slice(1).join(', ') }}]
                    </el-tag>
                  </div>
                </el-form-item>
              </el-form>
            </div>
          </el-card>
        </el-col>
      </el-row>
      
      <!-- 类型演示和代码示例 -->
      <el-row style="margin-top: 20px;">
        <el-col :span="24">
          <el-card shadow="hover" class="demo-card">
            <template #header>
              <h3>💻 TypeScript 类型定义演示</h3>
            </template>
            
            <el-tabs v-model="activeTypeTab">
              <el-tab-pane label="基础数组类型" name="basic-arrays">
                <div class="code-demo">
                  <h4>基础数组类型定义:</h4>
                  <pre><code>{{ basicArrayCode }}</code></pre>
                  
                  <h4>当前实际应用:</h4>
                  <div class="current-usage">
                    <p><strong>数字数组:</strong> {{ JSON.stringify(numberArray) }}</p>
                    <p><strong>字符串数组:</strong> {{ JSON.stringify(tagArray) }}</p>
                    <p><strong>类型注解:</strong> {{ arrayTypeAnnotations }}</p>
                  </div>
                </div>
              </el-tab-pane>
              
              <el-tab-pane label="元组类型" name="tuple-types">
                <div class="code-demo">
                  <h4>元组类型定义:</h4>
                  <pre><code>{{ tupleCode }}</code></pre>
                  
                  <h4>当前实际应用:</h4>
                  <div class="current-usage">
                    <p><strong>人员元组数量:</strong> {{ personTuples.length }}</p>
                    <p><strong>坐标元组数量:</strong> {{ coordinates.length }}</p>
                    <p><strong>可变参数元组:</strong> {{ JSON.stringify(variableArgs) }}</p>
                  </div>
                </div>
              </el-tab-pane>
              
              <el-tab-pane label="只读数组" name="readonly-arrays">
                <div class="code-demo">
                  <h4>只读数组类型:</h4>
                  <pre><code>{{ readonlyArrayCode }}</code></pre>
                  
                  <h4>当前实际应用:</h4>
                  <div class="current-usage">
                    <p><strong>只读配置:</strong> {{ JSON.stringify(readonlyConfigs) }}</p>
                    <p><strong>选中配置:</strong> {{ JSON.stringify(selectedConfigs) }}</p>
                    <p><strong>不可变性保证:</strong> readonlyConfigs 不能被修改</p>
                  </div>
                </div>
              </el-tab-pane>
              
              <el-tab-pane label="高级数组操作" name="advanced-operations">
                <div class="code-demo">
                  <h4>高级数组操作:</h4>
                  <pre><code>{{ advancedOperationsCode }}</code></pre>
                  
                  <h4>函数式编程示例:</h4>
                  <div class="functional-demo">
                    <el-button @click="demonstrateMap" size="small">map 操作</el-button>
                    <el-button @click="demonstrateFilter" size="small">filter 操作</el-button>
                    <el-button @click="demonstrateReduce" size="small">reduce 操作</el-button>
                    <el-button @click="demonstrateComposition" size="small">组合操作</el-button>
                  </div>
                  
                  <div v-if="functionalResult" class="functional-result">
                    <h5>操作结果:</h5>
                    <pre>{{ functionalResult }}</pre>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, type Ref, type ComputedRef } from 'vue'
import { ElMessage } from 'element-plus'

// TypeScript 练习：数组类型定义

// 基础数组类型
const numberArray: Ref<number[]> = ref([1, 2, 3, 42, 100])
const tagArray: Ref<string[]> = ref(['Vue3', 'TypeScript', 'Element Plus'])

// 输入控制
const newNumber: Ref<number> = ref(0)
const newTag: Ref<string> = ref('')
const tagFilter: Ref<string> = ref('')
const joinedString: Ref<string> = ref('')

// 元组类型练习
type PersonTuple = [string, number, boolean] // [姓名, 年龄, 是否已婚]
type CoordinateTuple = [number, number] // [x, y]
type VariableArgsTuple = [string, ...number[]] // [第一个字符串, ...其余数字]

const personTuples: Ref<PersonTuple[]> = ref([
  ['张三', 25, false],
  ['李四', 30, true],
  ['王五', 28, false]
])

const coordinates: Ref<CoordinateTuple[]> = ref([
  [0, 0], [10, 20], [30, 40]
])

// 人员信息输入
const personName: Ref<string> = ref('')
const personAge: Ref<number> = ref(0)
const personMarried: Ref<boolean> = ref(false)

// 坐标输入
const coordinateX: Ref<number> = ref(0)
const coordinateY: Ref<number> = ref(0)

// 可变参数
const variableInput: Ref<string> = ref('')
const variableArgs: Ref<VariableArgsTuple> = ref(['start'])

// 只读数组类型
const readonlyConfigs: readonly string[] = ['debug', 'production', 'test', 'development'] as const
const selectedConfigs: Ref<string[]> = ref(['debug'])

// 演示选项卡
const activeTypeTab: Ref<string> = ref('basic-arrays')
const functionalResult: Ref<string> = ref('')

// 计算属性
const arrayStats: ComputedRef<{
  length: number
  sum: number
  average: number
  max: number
  min: number
}> = computed(() => {
  const arr = numberArray.value
  if (arr.length === 0) {
    return { length: 0, sum: 0, average: 0, max: 0, min: 0 }
  }
  
  const sum = arr.reduce((acc, num) => acc + num, 0)
  return {
    length: arr.length,
    sum,
    average: Math.round((sum / arr.length) * 100) / 100,
    max: Math.max(...arr),
    min: Math.min(...arr)
  }
})

const filteredTags: ComputedRef<string[]> = computed(() => {
  if (!tagFilter.value) return tagArray.value
  return tagArray.value.filter(tag => 
    tag.toLowerCase().includes(tagFilter.value.toLowerCase())
  )
})

const arrayTypeAnnotations: ComputedRef<string> = computed(() => {
  return `number[]: ${numberArray.value.length}项, string[]: ${tagArray.value.length}项`
})

// 方法实现

// 数组操作方法
const addNumber = (): void => {
  if (newNumber.value !== null && !numberArray.value.includes(newNumber.value)) {
    numberArray.value.push(newNumber.value)
    newNumber.value = 0
    ElMessage.success('数字添加成功')
  }
}

const removeNumber = (index: number): void => {
  numberArray.value.splice(index, 1)
}

const addTag = (): void => {
  if (newTag.value.trim() && !tagArray.value.includes(newTag.value.trim())) {
    tagArray.value.push(newTag.value.trim())
    newTag.value = ''
    ElMessage.success('标签添加成功')
  }
}

const removeTag = (index: number): void => {
  tagArray.value.splice(index, 1)
}

const getTagType = (tag: string): string => {
  const types = ['', 'success', 'warning', 'danger', 'info']
  return types[tag.length % types.length]
}

// 数组操作
const sortArray = (): void => {
  numberArray.value.sort((a, b) => a - b)
  ElMessage.info('数组已排序')
}

const reverseArray = (): void => {
  numberArray.value.reverse()
  ElMessage.info('数组已反转')
}

const shuffleArray = (): void => {
  for (let i = numberArray.value.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numberArray.value[i], numberArray.value[j]] = [numberArray.value[j], numberArray.value[i]]
  }
  ElMessage.info('数组已洗牌')
}

const clearArray = (): void => {
  numberArray.value = []
  ElMessage.warning('数组已清空')
}

// 字符串数组操作
const joinTags = (): void => {
  joinedString.value = tagArray.value.join(' | ')
}

const capitalizeTags = (): void => {
  tagArray.value = tagArray.value.map(tag => 
    tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()
  )
}

const sortTags = (): void => {
  tagArray.value.sort()
}

// 元组操作
const addPerson = (): void => {
  if (personName.value.trim() && personAge.value >= 0) {
    const newPerson: PersonTuple = [personName.value.trim(), personAge.value, personMarried.value]
    personTuples.value.push(newPerson)
    
    // 重置输入
    personName.value = ''
    personAge.value = 0
    personMarried.value = false
    
    ElMessage.success('人员添加成功')
  }
}

const removePerson = (index: number): void => {
  personTuples.value.splice(index, 1)
}

const addCoordinate = (): void => {
  const newCoord: CoordinateTuple = [coordinateX.value, coordinateY.value]
  coordinates.value.push(newCoord)
  
  coordinateX.value = 0
  coordinateY.value = 0
  
  ElMessage.success('坐标添加成功')
}

const removeCoordinate = (index: number): void => {
  coordinates.value.splice(index, 1)
}

const parseVariableArgs = (): void => {
  if (!variableInput.value.trim()) return
  
  const parts = variableInput.value.split(',').map(s => s.trim())
  if (parts.length === 0) return
  
  const firstString = parts[0]
  const restNumbers = parts.slice(1)
    .map(s => parseFloat(s))
    .filter(n => !isNaN(n))
  
  variableArgs.value = [firstString, ...restNumbers]
  variableInput.value = ''
}

// 函数式编程演示
const demonstrateMap = (): void => {
  const doubled = numberArray.value.map(n => n * 2)
  functionalResult.value = `
map 操作 - 每个数字乘以2:
原数组: [${numberArray.value.join(', ')}]
结果: [${doubled.join(', ')}]
  `
}

const demonstrateFilter = (): void => {
  const evens = numberArray.value.filter(n => n % 2 === 0)
  const odds = numberArray.value.filter(n => n % 2 !== 0)
  functionalResult.value = `
filter 操作 - 筛选偶数和奇数:
原数组: [${numberArray.value.join(', ')}]
偶数: [${evens.join(', ')}]
奇数: [${odds.join(', ')}]
  `
}

const demonstrateReduce = (): void => {
  const sum = numberArray.value.reduce((acc, n) => acc + n, 0)
  const product = numberArray.value.reduce((acc, n) => acc * n, 1)
  functionalResult.value = `
reduce 操作 - 聚合计算:
原数组: [${numberArray.value.join(', ')}]
求和: ${sum}
求积: ${product}
  `
}

const demonstrateComposition = (): void => {
  const result = numberArray.value
    .filter(n => n > 10)          // 筛选大于10的数
    .map(n => n * 2)              // 每个数乘以2
    .reduce((acc, n) => acc + n, 0) // 求和
  
  functionalResult.value = `
组合操作 - filter + map + reduce:
原数组: [${numberArray.value.join(', ')}]
1. filter(n > 10): [${numberArray.value.filter(n => n > 10).join(', ')}]
2. map(n * 2): [${numberArray.value.filter(n => n > 10).map(n => n * 2).join(', ')}]
3. reduce(求和): ${result}
  `
}

// 代码示例
const basicArrayCode = `
// 基础数组类型定义
let numbers: number[] = [1, 2, 3, 4, 5]
let strings: Array<string> = ['a', 'b', 'c']

// 泛型数组
let items: Array<T> = []

// 数组方法的类型安全
numbers.push(6)        // ✅ 正确
numbers.push("text")   // ❌ 类型错误
`

const tupleCode = `
// 元组类型定义
type PersonTuple = [string, number, boolean]
type CoordinateTuple = [number, number]
type VariableArgsTuple = [string, ...number[]]

// 使用元组
let person: PersonTuple = ["Alice", 25, true]
let point: CoordinateTuple = [10, 20]
let mixed: VariableArgsTuple = ["start", 1, 2, 3]

// 访问元组元素
console.log(person[0])  // string 类型
console.log(person[1])  // number 类型
console.log(person[2])  // boolean 类型
`

const readonlyArrayCode = `
// 只读数组类型
const configs: readonly string[] = ['debug', 'prod']
const numbers: ReadonlyArray<number> = [1, 2, 3]

// 编译时错误
configs.push('test')     // ❌ 只读数组不能修改
numbers[0] = 100        // ❌ 只读数组不能修改

// 可以通过非变异方法创建新数组
const newConfigs = [...configs, 'test']  // ✅ 正确
`

const advancedOperationsCode = `
// 高级数组操作和类型推断
const numbers = [1, 2, 3, 4, 5]

// map 操作 - 类型自动推断
const doubled = numbers.map(n => n * 2)  // number[]
const strings = numbers.map(n => n.toString())  // string[]

// filter 操作 - 类型缩窄
const evens = numbers.filter(n => n % 2 === 0)  // number[]

// reduce 操作 - 累加器类型
const sum = numbers.reduce((acc, n) => acc + n, 0)  // number
const obj = numbers.reduce((acc, n) => ({...acc, [n]: n}), {})  // object

// 函数式编程组合
const result = numbers
  .filter(n => n > 2)
  .map(n => n * 2)
  .reduce((acc, n) => acc + n, 0)
`
</script>

<style scoped lang="scss">
.array-tuple-exercise {
  .exercise-card {
    .el-card__header {
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      color: white;
      
      h2 {
        margin: 0;
        font-size: 1.5em;
      }
      
      p {
        margin: 10px 0 0 0;
        opacity: 0.9;
      }
    }
  }
  
  .type-card {
    height: 100%;
    
    .el-card__header {
      background: #f0f9ff;
      
      h3 {
        margin: 0;
        color: #1e40af;
        font-size: 1.2em;
      }
    }
    
    .exercise-content {
      padding: 10px 0;
    }
  }
  
  .demo-card {
    .el-card__header {
      background: #fef3c7;
      
      h3 {
        margin: 0;
        color: #92400e;
      }
    }
  }
  
  .array-display, .filtered-tags, .coordinates-display {
    min-height: 40px;
    border: 1px dashed #e5e7eb;
    border-radius: 4px;
    padding: 8px;
    background: #f9fafb;
  }
  
  .array-stats, .variable-args {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    
    .el-tag {
      margin-right: 0;
    }
  }
  
  .array-operations, .string-operations {
    .el-button {
      margin-right: 8px;
      margin-bottom: 8px;
    }
  }
  
  .code-demo {
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
    
    .current-usage {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 6px;
      padding: 12px;
      margin: 10px 0;
      
      p {
        margin: 8px 0;
        
        strong {
          color: #15803d;
        }
      }
    }
  }
  
  .functional-demo {
    margin: 15px 0;
    
    .el-button {
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
  
  .functional-result {
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

:deep(.el-table) {
  .el-table__header {
    th {
      background: #f8fafc;
      color: #374151;
    }
  }
}
</style>