<template>

    <div> 
        <h2>TS表单</h2>

        <el-card>
            <practice1 />
        </el-card>
        <el-card>
            <practice2 :user="user" />
        </el-card>
        <el-card>
            <practice3 />
        </el-card>
        <el-card>
            <practice4 />
        </el-card>
        <el-card>
            <practive5 />
        </el-card>
    </div>
    
</template>
<script lang="ts" setup>
import practice1 from '@/components/ts-practice4/practice1.vue';
import practice2 from '@/components/ts-practice4/practice2.vue';
import practice3 from '@/components/ts-practice4/practice3.vue';
import practice4 from '@/components/ts-practice4/practice4.vue';
import practive5 from '@/components/ts-practice4/practive5.vue';
const user = {
    name:'testname',
    id:242424,
    age:22
}
</script>