<template>
    <div class="vueuseContainer">
        <h2>Vueuse展示</h2>

        <div>
            <h2>用户信息</h2>
            <p>解构访问</p>
            <p>name:{{name}}</p>
            <p>age:{{age}}</p>
            <p>原始访问</p>
            <p>name:{{userMsg.name}}</p>
            <p>age:{{userMsg.age}}</p>
            <el-button type="primary" @click="changeMsg">改变用户信息</el-button>
        </div>
        <el-space wrap>
            <el-card style="min-width:200px;" class="" v-for="(com,index) in Coms" :key="index">
                <component :is="com"/>
            </el-card>
        </el-space>
    </div>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import {toRefs,reactive,onErrorCaptured} from 'vue';
import C001 from '@/components/vueuse/c001.vue';
import C002 from '@/components/vueuse/c002.vue';
import C003 from '@/components/vueuse/c003.vue';
import C004 from '@/components/vueuse/c004.vue';
import C005 from '@/components/vueuse/c005.vue';
import C006 from '@/components/vueuse/c006.vue';
import C007 from '@/components/vueuse/c007.vue';
import C008 from '@/components/vueuse/c008.vue';
import C009 from '@/components/vueuse/c009.vue';

const Coms = {C001,C002,C003,C004,C005,C006,C007,C008,C009}
const userMsg = reactive({name:'xiaoming',age:16})
const {name,age} = toRefs(userMsg);
const changeMsg = ()=>{
    userMsg.name = '小红';
    userMsg.age = 99
}

const errorMessage = ref('');
// 注册错误捕获钩子
onErrorCaptured((error, instance, info) => {
  // error：捕获到的错误对象（Error实例）
  // instance：出错的组件实例（可能是子组件）
  // info：错误信息字符串（如"render"表示渲染错误，"setup"表示setup阶段错误）

  // 1. 自定义错误处理（如显示提示、记录日志）
  errorMessage.value = `捕获到错误：${error.message}`;
  console.log('错误详情：', error);
  console.log('出错组件：', instance);
  console.log('错误场景：', info);

  // 2. 返回值决定是否阻止错误继续向上传播
  // true：阻止传播（父组件和全局错误处理器不会收到这个错误）
  // false：不阻止（错误会继续冒泡）
  return true;
});

</script>
<style scoped>
.vueuseContainer{
    padding:20px;
}
</style>