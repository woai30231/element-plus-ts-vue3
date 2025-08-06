<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="3"><el-button @click="$router.replace({name:'router-switch1'})" type="primary">切换路由1</el-button></el-col>
            <el-col :span="3"><el-button @click="$router.replace({name:'router-switch2'})" type="primary">切换路由2</el-button></el-col>
        </el-row>
        <div style="height:250px;transform:translate(0,0);">
            <router-view v-slot="{Component}">
                <transition :name="transitionName">
                    <keep-alive>
                        <component :is="Component"/>
                    </keep-alive>
                </transition>
            </router-view>
        </div>

        <routerSwitchDescr></routerSwitchDescr>
    </div>
</template>
<script setup lang="ts">
import routerSwitchDescr from './router-switch-descr.vue';
import {ref,watch} from 'vue';
import {useRoute} from 'vue-router';
const transitionName = ref('fade');
const route = useRoute();
watch(()=>route.path,(_toPath,fromPath)=>{
    const fromDepth = fromPath.includes("switch2")
    transitionName.value = fromDepth?"slide-left":"slide-right";
})
</script>
<style scoped>
/* 基础淡入淡出效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 左右滑动效果 */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  position: absolute;
  width: 100%;
  transition: transform 0.3s ease;
}

/* 向左滑动 */
.slide-left-enter-from {
  transform: translateX(100%);
}
.slide-left-leave-to {
  transform: translateX(-100%);
}

/* 向右滑动 */
.slide-right-enter-from {
  transform: translateX(-100%);
}
.slide-right-leave-to {
  transform: translateX(100%);
}
</style>