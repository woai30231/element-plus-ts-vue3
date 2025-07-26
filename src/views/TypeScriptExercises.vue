<template>
  <div class="typescript-exercises">
    <el-container>
      <el-header class="header">
        <h1>TypeScript 全面练习项目</h1>
        <p>涵盖 TypeScript 所有基础数据类型和高级特性</p>
      </el-header>
      
      <el-main>
        <el-tabs v-model="activeTab" type="card" class="exercise-tabs">
          <!-- 基础数据类型练习 -->
          <el-tab-pane label="基础数据类型" name="basic-types">
            <BasicTypesExercise />
          </el-tab-pane>
          
          <!-- 数组和元组练习 -->
          <el-tab-pane label="数组与元组" name="arrays-tuples">
            <ArrayTupleExercise />
          </el-tab-pane>
          
          <!-- 接口和对象练习 -->
          <el-tab-pane label="接口与对象" name="interfaces-objects">
            <InterfaceObjectExercise />
          </el-tab-pane>
          
          <!-- 联合和交叉类型 -->
          <el-tab-pane label="联合与交叉类型" name="union-intersection">
            <UnionIntersectionExercise />
          </el-tab-pane>
          
          <!-- 枚举练习 -->
          <el-tab-pane label="枚举类型" name="enums">
            <EnumExercise />
          </el-tab-pane>
          
          <!-- 函数类型 -->
          <el-tab-pane label="函数类型" name="functions">
            <FunctionExercise />
          </el-tab-pane>
          
          <!-- 泛型练习 -->
          <el-tab-pane label="泛型编程" name="generics">
            <GenericExercise />
          </el-tab-pane>
          
          <!-- 工具类型 -->
          <el-tab-pane label="工具类型" name="utility-types">
            <UtilityTypesExercise />
          </el-tab-pane>
          
          <!-- 类和装饰器 -->
          <el-tab-pane label="类与装饰器" name="classes-decorators">
            <ClassDecoratorExercise />
          </el-tab-pane>
          
          <!-- Vue3 + TS -->
          <el-tab-pane label="Vue3 + TypeScript" name="vue-typescript">
            <VueTypeScriptExercise />
          </el-tab-pane>
          
          <!-- 实战项目 -->
          <el-tab-pane label="实战项目" name="practical-project">
            <PracticalProjectExercise />
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BasicTypesExercise from '../components/exercises/BasicTypesExercise.vue'
import ArrayTupleExercise from '../components/exercises/ArrayTupleExercise.vue'
import InterfaceObjectExercise from '../components/exercises/InterfaceObjectExercise.vue'
import UnionIntersectionExercise from '../components/exercises/UnionIntersectionExercise.vue'
import EnumExercise from '../components/exercises/EnumExercise.vue'
import FunctionExercise from '../components/exercises/FunctionExercise.vue'
import GenericExercise from '../components/exercises/GenericExercise.vue'
import UtilityTypesExercise from '../components/exercises/UtilityTypesExercise.vue'
import ClassDecoratorExercise from '../components/exercises/ClassDecoratorExercise.vue'
import VueTypeScriptExercise from '../components/exercises/VueTypeScriptExercise.vue'
import PracticalProjectExercise from '../components/exercises/PracticalProjectExercise.vue'

// TypeScript 练习：基础数据类型声明
const activeTab = ref<string>('basic-types')

// TypeScript 练习：字面量类型
type TabName = 'basic-types' | 'arrays-tuples' | 'interfaces-objects' | 
              'union-intersection' | 'enums' | 'functions' | 'generics' | 
              'utility-types' | 'classes-decorators' | 'vue-typescript' | 'practical-project'

// TypeScript 练习：泛型约束
interface TabItem<T extends string> {
  name: T
  label: string
  component: any
}

// TypeScript 练习：映射类型应用
const tabs: Record<TabName, TabItem<TabName>> = {
  'basic-types': {
    name: 'basic-types',
    label: '基础数据类型',
    component: BasicTypesExercise
  },
  'arrays-tuples': {
    name: 'arrays-tuples',
    label: '数组与元组',
    component: ArrayTupleExercise
  },
  'interfaces-objects': {
    name: 'interfaces-objects',
    label: '接口与对象',
    component: InterfaceObjectExercise
  },
  'union-intersection': {
    name: 'union-intersection',
    label: '联合与交叉类型',
    component: UnionIntersectionExercise
  },
  'enums': {
    name: 'enums',
    label: '枚举类型',
    component: EnumExercise
  },
  'functions': {
    name: 'functions',
    label: '函数类型',
    component: FunctionExercise
  },
  'generics': {
    name: 'generics',
    label: '泛型编程',
    component: GenericExercise
  },
  'utility-types': {
    name: 'utility-types',
    label: '工具类型',
    component: UtilityTypesExercise
  },
  'classes-decorators': {
    name: 'classes-decorators',
    label: '类与装饰器',
    component: ClassDecoratorExercise
  },
  'vue-typescript': {
    name: 'vue-typescript',
    label: 'Vue3 + TypeScript',
    component: VueTypeScriptExercise
  },
  'practical-project': {
    name: 'practical-project',
    label: '实战项目',
    component: PracticalProjectExercise
  }
}
</script>

<style scoped lang="scss">
.typescript-exercises {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  
  .header {
    background: rgba(255, 255, 255, 0.95);
    text-align: center;
    padding: 20px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    
    h1 {
      margin: 0 0 10px 0;
      color: #2c3e50;
      font-size: 2.5em;
      font-weight: 600;
    }
    
    p {
      margin: 0;
      color: #7f8c8d;
      font-size: 1.2em;
    }
  }
  
  .exercise-tabs {
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    margin: 20px;
  }
}

:deep(.el-tabs__header) {
  margin-bottom: 20px;
}

:deep(.el-tabs__nav) {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

:deep(.el-tabs__item) {
  border-radius: 6px;
  margin-right: 5px;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f0f9ff;
    color: #2563eb;
  }
  
  &.is-active {
    background: #3b82f6;
    color: white;
    border-color: #3b82f6;
  }
}

:deep(.el-tabs__content) {
  padding: 20px 0;
}
</style>