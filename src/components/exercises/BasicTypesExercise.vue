<template>
  <div class="basic-types-exercise">
    <el-card class="exercise-card">
      <template #header>
        <h2>🎯 TypeScript 基础数据类型练习</h2>
        <p>练习所有基础数据类型：boolean, number, string, bigint, symbol, null, undefined</p>
      </template>
      
      <el-row :gutter="20">
        <!-- 布尔类型练习 -->
        <el-col :span="12">
          <el-card shadow="hover" class="type-card">
            <template #header>
              <h3>🔵 Boolean 类型</h3>
            </template>
            
            <div class="exercise-content">
              <el-form label-width="120px">
                <el-form-item label="用户在线状态:">
                  <el-switch 
                    v-model="userOnline" 
                    active-text="在线" 
                    inactive-text="离线"
                    @change="handleUserStatusChange"
                  />
                </el-form-item>
                
                <el-form-item label="启用通知:">
                  <el-checkbox v-model="notificationsEnabled">
                    接收推送通知
                  </el-checkbox>
                </el-form-item>
                
                <el-form-item label="同意条款:">
                  <el-checkbox v-model="agreedToTerms" :disabled="!userOnline">
                    我同意用户协议
                  </el-checkbox>
                </el-form-item>
              </el-form>
              
              <el-alert 
                :title="`状态: ${getUserStatusMessage()}`"
                :type="userOnline ? 'success' : 'info'"
                show-icon
                :closable="false"
              />
            </div>
          </el-card>
        </el-col>
        
        <!-- 数字类型练习 -->
        <el-col :span="12">
          <el-card shadow="hover" class="type-card">
            <template #header>
              <h3>🔢 Number 类型</h3>
            </template>
            
            <div class="exercise-content">
              <el-form label-width="120px">
                <el-form-item label="整数:">
                  <el-input-number 
                    v-model="integerValue" 
                    :min="0" 
                    :max="1000"
                    @change="calculateResults"
                  />
                </el-form-item>
                
                <el-form-item label="小数:">
                  <el-input-number 
                    v-model="floatValue" 
                    :precision="2" 
                    :step="0.1"
                    @change="calculateResults"
                  />
                </el-form-item>
                
                <el-form-item label="十六进制:">
                  <el-tag>{{ hexValue }}</el-tag>
                </el-form-item>
                
                <el-form-item label="二进制:">
                  <el-tag type="success">{{ binaryValue }}</el-tag>
                </el-form-item>
                
                <el-form-item label="八进制:">
                  <el-tag type="warning">{{ octalValue }}</el-tag>
                </el-form-item>
              </el-form>
              
              <el-divider>计算结果</el-divider>
              <p>总和: <strong>{{ calculationResult.sum }}</strong></p>
              <p>乘积: <strong>{{ calculationResult.product }}</strong></p>
              <p>平均值: <strong>{{ calculationResult.average }}</strong></p>
            </div>
          </el-card>
        </el-col>
      </el-row>
      
      <el-row :gutter="20" style="margin-top: 20px;">
        <!-- 字符串类型练习 -->
        <el-col :span="12">
          <el-card shadow="hover" class="type-card">
            <template #header>
              <h3>📝 String 类型</h3>
            </template>
            
            <div class="exercise-content">
              <el-form label-width="120px">
                <el-form-item label="用户名:">
                  <el-input 
                    v-model="username" 
                    placeholder="请输入用户名"
                    @input="handleStringOperations"
                  />
                </el-form-item>
                
                <el-form-item label="模板字符串:">
                  <el-input 
                    v-model="templateString" 
                    readonly
                    type="textarea"
                  />
                </el-form-item>
                
                <el-form-item label="字符串长度:">
                  <el-tag>{{ stringLength }}</el-tag>
                </el-form-item>
                
                <el-form-item label="大写转换:">
                  <el-tag type="success">{{ uppercaseString }}</el-tag>
                </el-form-item>
                
                <el-form-item label="包含检查:">
                  <el-tag :type="containsAt ? 'success' : 'danger'">
                    包含 '@': {{ containsAt ? '是' : '否' }}
                  </el-tag>
                </el-form-item>
              </el-form>
            </div>
          </el-card>
        </el-col>
        
        <!-- BigInt 和 Symbol 类型练习 -->
        <el-col :span="12">
          <el-card shadow="hover" class="type-card">
            <template #header>
              <h3>🔄 BigInt & Symbol 类型</h3>
            </template>
            
            <div class="exercise-content">
              <el-form label-width="120px">
                <el-form-item label="BigInt 值:">
                  <el-input 
                    v-model="bigIntInput" 
                    placeholder="输入大整数"
                    @input="handleBigIntOperation"
                  />
                </el-form-item>
                
                <el-form-item label="BigInt 计算:">
                  <el-tag>{{ bigIntResult }}</el-tag>
                </el-form-item>
                
                <el-form-item label="Symbol 描述:">
                  <el-input 
                    v-model="symbolDescription" 
                    placeholder="Symbol 描述"
                    @input="handleSymbolOperation"
                  />
                </el-form-item>
                
                <el-form-item label="Symbol 字符串:">
                  <el-tag type="warning">{{ symbolString }}</el-tag>
                </el-form-item>
                
                <el-form-item label="唯一性测试:">
                  <el-button @click="testSymbolUniqueness" size="small">
                    测试 Symbol 唯一性
                  </el-button>
                </el-form-item>
              </el-form>
              
              <el-alert 
                v-if="symbolTest"
                :title="symbolTest"
                type="info"
                show-icon
                :closable="false"
              />
            </div>
          </el-card>
        </el-col>
      </el-row>
      
      <el-row :gutter="20" style="margin-top: 20px;">
        <!-- Null 和 Undefined 练习 -->
        <el-col :span="24">
          <el-card shadow="hover" class="type-card">
            <template #header>
              <h3>❓ Null & Undefined 类型</h3>
            </template>
            
            <div class="exercise-content">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form label-width="120px">
                    <el-form-item label="可选值:">
                      <el-select v-model="optionalValue" clearable placeholder="选择一个值">
                        <el-option label="字符串值" value="string" />
                        <el-option label="数字值" value="number" />
                        <el-option label="布尔值" value="boolean" />
                      </el-select>
                    </el-form-item>
                    
                    <el-form-item label="当前状态:">
                      <el-tag :type="getOptionalValueType()">
                        {{ getOptionalValueDescription() }}
                      </el-tag>
                    </el-form-item>
                    
                    <el-form-item label="类型检查:">
                      <div class="type-checks">
                        <el-tag size="small">is null: {{ optionalValue === null }}</el-tag>
                        <el-tag size="small" type="success">is undefined: {{ optionalValue === undefined }}</el-tag>
                        <el-tag size="small" type="warning">is falsy: {{ !optionalValue }}</el-tag>
                        <el-tag size="small" type="danger">typeof: {{ typeof optionalValue }}</el-tag>
                      </div>
                    </el-form-item>
                  </el-form>
                </el-col>
                
                <el-col :span="12">
                  <div class="null-undefined-demo">
                    <h4>空值处理演示</h4>
                    <pre><code>{{ nullUndefinedCode }}</code></pre>
                    
                    <el-button @click="demonstrateNullishCoalescing" type="primary" size="small">
                      演示空值合并操作符 (??)
                    </el-button>
                    
                    <el-button @click="demonstrateOptionalChaining" type="success" size="small">
                      演示可选链操作符 (?.)
                    </el-button>
                    
                    <div v-if="demoResult" class="demo-result">
                      <h5>演示结果:</h5>
                      <pre>{{ demoResult }}</pre>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
      
      <!-- 类型总结 -->
      <el-row style="margin-top: 20px;">
        <el-col :span="24">
          <el-card shadow="hover" class="summary-card">
            <template #header>
              <h3>📊 类型使用总结</h3>
            </template>
            
            <el-table :data="typeSummary" stripe>
              <el-table-column prop="type" label="数据类型" width="120" />
              <el-table-column prop="example" label="示例值" />
              <el-table-column prop="usage" label="当前使用" />
              <el-table-column prop="description" label="用途说明" />
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, type Ref, type ComputedRef } from 'vue'
import { ElMessage } from 'element-plus'

// TypeScript 练习：基础数据类型声明

// Boolean 类型练习
const userOnline: Ref<boolean> = ref(false)
const notificationsEnabled: Ref<boolean> = ref(true)
const agreedToTerms: Ref<boolean> = ref(false)

// Number 类型练习 (包括各种进制)
const integerValue: Ref<number> = ref(42)
const floatValue: Ref<number> = ref(3.14)

// 不同进制的数字表示
const hexValue: ComputedRef<string> = computed(() => `0x${integerValue.value.toString(16).toUpperCase()}`)
const binaryValue: ComputedRef<string> = computed(() => `0b${integerValue.value.toString(2)}`)
const octalValue: ComputedRef<string> = computed(() => `0o${integerValue.value.toString(8)}`)

// String 类型练习
const username: Ref<string> = ref('')
const templateString: ComputedRef<string> = computed(() => 
  `Hello, ${username.value || '用户'}! 今天是 ${new Date().toLocaleDateString()}`
)

// BigInt 类型练习
const bigIntInput: Ref<string> = ref('123456789012345678901234567890')
const bigIntValue: ComputedRef<bigint | null> = computed(() => {
  try {
    return BigInt(bigIntInput.value)
  } catch {
    return null
  }
})

// Symbol 类型练习
const symbolDescription: Ref<string> = ref('userSession')
const userSymbol: ComputedRef<symbol> = computed(() => Symbol(symbolDescription.value))

// Null 和 Undefined 类型练习
const optionalValue: Ref<string | null | undefined> = ref(undefined)

// 复杂类型定义练习
interface CalculationResult {
  sum: number
  product: number
  average: number
}

const calculationResult: Ref<CalculationResult> = ref({
  sum: 0,
  product: 0,
  average: 0
})

// 计算属性练习
const stringLength: ComputedRef<number> = computed(() => username.value.length)
const uppercaseString: ComputedRef<string> = computed(() => username.value.toUpperCase())
const containsAt: ComputedRef<boolean> = computed(() => username.value.includes('@'))

const bigIntResult: ComputedRef<string> = computed(() => {
  if (bigIntValue.value === null) return '无效的 BigInt'
  return `${bigIntValue.value} * 2 = ${bigIntValue.value * 2n}`
})

const symbolString: ComputedRef<string> = computed(() => userSymbol.value.toString())

// 响应式数据
const symbolTest = ref<string>('')
const demoResult = ref<string>('')

// 类型总结数据
const typeSummary = computed(() => [
  {
    type: 'boolean',
    example: `${userOnline.value}`,
    usage: `用户在线: ${userOnline.value}, 通知: ${notificationsEnabled.value}`,
    description: '表示真/假值，用于开关状态、条件判断'
  },
  {
    type: 'number',
    example: `${integerValue.value}, ${floatValue.value}`,
    usage: `整数: ${integerValue.value}, 浮点数: ${floatValue.value}`,
    description: '表示数值，包括整数、浮点数、特殊值(NaN, Infinity)'
  },
  {
    type: 'string',
    example: `"${username.value || 'example'}"`,
    usage: `用户名: "${username.value}", 长度: ${stringLength.value}`,
    description: '表示文本数据，支持模板字符串、转义字符'
  },
  {
    type: 'bigint',
    example: `${bigIntInput.value}n`,
    usage: `大整数: ${bigIntValue.value?.toString() || '无效'}`,
    description: '表示任意精度的整数，用于超大数值计算'
  },
  {
    type: 'symbol',
    example: `Symbol("${symbolDescription.value}")`,
    usage: `符号: ${symbolString.value}`,
    description: '表示唯一标识符，常用于对象属性键'
  },
  {
    type: 'null/undefined',
    example: 'null, undefined',
    usage: `当前值: ${optionalValue.value}`,
    description: 'null表示空值，undefined表示未定义'
  }
])

// TypeScript 练习：函数类型定义
type UserStatusHandler = (status: boolean) => void
type StringOperationHandler = () => void
type SymbolOperationHandler = () => void

// 方法实现
const handleUserStatusChange: UserStatusHandler = (status: boolean): void => {
  ElMessage({
    message: `用户状态已更改为: ${status ? '在线' : '离线'}`,
    type: status ? 'success' : 'info'
  })
  
  if (!status) {
    agreedToTerms.value = false
  }
}

const calculateResults = (): void => {
  calculationResult.value = {
    sum: integerValue.value + floatValue.value,
    product: integerValue.value * floatValue.value,
    average: (integerValue.value + floatValue.value) / 2
  }
}

const handleStringOperations: StringOperationHandler = (): void => {
  // 字符串操作在计算属性中自动处理
}

const handleBigIntOperation = (): void => {
  // BigInt 操作在计算属性中自动处理
}

const handleSymbolOperation: SymbolOperationHandler = (): void => {
  // Symbol 操作在计算属性中自动处理
}

const getUserStatusMessage = (): string => {
  if (!userOnline.value) return '用户离线'
  if (!agreedToTerms.value) return '在线但未同意条款'
  return '用户在线且已同意条款'
}

const getOptionalValueType = (): string => {
  if (optionalValue.value === null) return 'danger'
  if (optionalValue.value === undefined) return 'warning'
  return 'success'
}

const getOptionalValueDescription = (): string => {
  if (optionalValue.value === null) return 'null - 明确的空值'
  if (optionalValue.value === undefined) return 'undefined - 未定义'
  return `"${optionalValue.value}" - 有效值`
}

const testSymbolUniqueness = (): void => {
  const symbol1 = Symbol('test')
  const symbol2 = Symbol('test')
  const symbol3 = Symbol.for('global')
  const symbol4 = Symbol.for('global')
  
  symbolTest.value = `
    Symbol('test') === Symbol('test'): ${symbol1 === symbol2}
    Symbol.for('global') === Symbol.for('global'): ${symbol3 === symbol4}
    每个 Symbol() 都是唯一的，Symbol.for() 会返回全局注册的 Symbol
  `
}

// TypeScript 练习：空值合并和可选链
interface UserData {
  profile?: {
    name?: string
    contact?: {
      email?: string
    }
  }
}

const demonstrateNullishCoalescing = (): void => {
  const value1: string | null = null
  const value2: string | undefined = undefined
  const value3: string = 'default'
  
  demoResult.value = `
空值合并操作符 (??) 演示:
null ?? 'default' = ${value1 ?? 'default'}
undefined ?? 'default' = ${value2 ?? 'default'}
'value' ?? 'default' = ${value3 ?? 'default'}
0 ?? 'default' = ${0 ?? 'default'}
'' ?? 'default' = ${'' ?? 'default'}
false ?? 'default' = ${false ?? 'default'}
  `
}

const demonstrateOptionalChaining = (): void => {
  const userData: UserData = {
    profile: {
      name: 'Alice'
      // contact 属性未定义
    }
  }
  
  const emptyUser: UserData = {}
  
  demoResult.value = `
可选链操作符 (?.) 演示:
userData.profile?.name = ${userData.profile?.name}
userData.profile?.contact?.email = ${userData.profile?.contact?.email}
emptyUser.profile?.name = ${emptyUser.profile?.name}
  `
}

const nullUndefinedCode = `
// TypeScript 空值处理
let value: string | null | undefined

// 类型守卫
if (value !== null && value !== undefined) {
  console.log(value.toUpperCase())
}

// 空值合并
const result = value ?? 'default'

// 可选链
const length = value?.length
`

// 初始化计算
calculateResults()
</script>

<style scoped lang="scss">
.basic-types-exercise {
  .exercise-card {
    .el-card__header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
      background: #f8f9fa;
      
      h3 {
        margin: 0;
        color: #2c3e50;
        font-size: 1.2em;
      }
    }
    
    .exercise-content {
      padding: 10px 0;
    }
  }
  
  .summary-card {
    .el-card__header {
      background: #e8f5e8;
      
      h3 {
        margin: 0;
        color: #27ae60;
      }
    }
  }
  
  .type-checks {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    
    .el-tag {
      margin-right: 0;
    }
  }
  
  .null-undefined-demo {
    h4 {
      margin-top: 0;
      color: #2c3e50;
    }
    
    pre {
      background: #f8f9fa;
      padding: 10px;
      border-radius: 4px;
      font-size: 12px;
      line-height: 1.4;
      margin: 10px 0;
    }
    
    .el-button {
      margin: 5px 5px 5px 0;
    }
    
    .demo-result {
      margin-top: 15px;
      
      h5 {
        margin: 0 0 10px 0;
        color: #2c3e50;
      }
      
      pre {
        background: #fff3cd;
        border: 1px solid #ffeaa7;
        white-space: pre-wrap;
        word-wrap: break-word;
      }
    }
  }
}
</style>