<template>
    <div><el-row><h4>ts基础类型</h4></el-row></div>

    <BasicTypes />

    <ArrayTuple />

    <InterfaceTypeAlias />

    <Enum />
    <Generic />
    <Decorator />
    <UnionIntersection />
    <TypeAssertion />
    <TypeGuard />
    <Composition />
    <ElementPlus />

</template>
<script setup lang="ts">
import Generic from '@/components/ts-practice/Generic.vue';
import ArrayTuple from '@/components/ts-practice/ArrayTuple.vue';
import BasicTypes from '@/components/ts-practice/BasicTypes.vue';
import Enum from '@/components/ts-practice/Enum.vue'
import Composition from '@/components/ts-practice/Composition.vue';
import TypeAssertion from '@/components/ts-practice/TypeAssertion.vue';
import Decorator from '@/components/ts-practice/Decorator.vue';
import TypeGuard from '@/components/ts-practice/TypeGuard.vue';
import ElementPlus from '@/components/ts-practice/ElementPlus.vue';
import InterfaceTypeAlias from  "@/components/ts-practice/InterfaceTypeAlias.vue"
import UnionIntersection from '@/components/ts-practice/UnionIntersection.vue';

</script> 