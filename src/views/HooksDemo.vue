<template>
    <div>
        <h2>vue hooks使用</h2>

        <el-card>
            <h4>pinia 用户购物车数据</h4>
            <el-table :data="cartStore.items">
                <el-table-column label="id" prop="id"></el-table-column>
                <el-table-column label="name" prop="name"></el-table-column>
                <el-table-column label="price" prop="price"></el-table-column>
            </el-table>
        </el-card>
        <el-card>
            <One />
        </el-card>
        <el-card>
            <Two />
        </el-card>
        <el-card>
            <Three />
        </el-card>
        <el-card>
            <Four />
        </el-card>
        <el-card>
            <Five />
        </el-card>
        <el-card>
            <Six />
        </el-card>
        <el-card>
            <Seven />
        </el-card>
        <el-card>
            <Eight />
        </el-card>
        <el-card>
            <Nine />
        </el-card>
        <el-card>
            <Ten />
        </el-card>
        <el-card>
            <Hook11 />
        </el-card>
    </div>
</template>
<script setup lang="ts">
import One from '@/components/hooksOne/One.vue';
import Three from '@/components/hooksOne/Three.vue';
import Two from "@/components/hooksOne/Two.vue"
import Four from '@/components/hooksOne/Four.vue'
import Five from '@/components/hooksOne/Five.vue';
import Six from '@/components/hooksOne/Six.vue';
import Seven from '@/components/hooksOne/Seven.vue'
import Eight from '@/components/hooksOne/Eight.vue';
import Nine from '@/components/hooksOne/Nine.vue';
import Ten from '@/components/hooksOne/Ten.vue';
import Hook11 from '@/components/hooksOne/Hook11.vue';
import {useCartStore} from '@/stores/one/cartStore'
const cartStore = useCartStore();
</script>