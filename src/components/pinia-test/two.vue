<script setup lang="ts">
import {useCartStore} from "@/stores/one/cartStore"
const cartStore = useCartStore();
const products = [
    {id:1,name:'手机',price:2999},
    {id:2,name:'耳机',price:199},
    {id:3,name:'键盘',price:89}
]
</script>
<template>
    <div>
        <h3>商品列表</h3>
        <div v-for="product in products" :key="product.id">
            <el-card>

                <h4>{{product.name}}</h4>
                <p>价格：{{product.price}}</p>
                <el-button @click="cartStore.addToCart(product)">
                    加入购物车
                </el-button>
            </el-card>    
        </div>


        <h3>购物车</h3>
        <ul>
            <li v-for="item in cartStore.items" :key="item.id">
                {{item.name}} x {{item.quantity}}
                <el-input-number v-model="item.quantity" :min="1">
                    <el-button @click="cartStore.removeFromCart(item.id)">删除</el-button>
                </el-input-number>
            </li>
        </ul>
        <p><strong>总价：{{cartStore.total}}</strong></p>
    </div>
</template>