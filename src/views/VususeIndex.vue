<template>
    <div class="vueuseContainer">
        <h2>Vueuse展示</h2>
        <el-space wrap>
            <el-card style="min-width:200px;" class="" v-for="(com,index) in Coms" :key="index">
                <component :is="com"/>
            </el-card>
        </el-space>
    </div>
</template>
<script setup lang="ts">
// import {ref} from 'vue';
import C001 from '@/components/vueuse/c001.vue';
import C002 from '@/components/vueuse/c002.vue';
import C003 from '@/components/vueuse/c003.vue';
import C004 from '@/components/vueuse/c004.vue';
import C005 from '@/components/vueuse/c005.vue';
import C006 from '@/components/vueuse/C006.vue';
import C007 from '@/components/vueuse/c007.vue';
import C008 from '@/components/vueuse/c008.vue';
import C009 from '@/components/vueuse/c009.vue';

const Coms = {C001,C002,C003,C004,C005,C006,C007,C008,C009}

</script>
<style scoped>
.vueuseContainer{
    padding:20px;
}
</style>