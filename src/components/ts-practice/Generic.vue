<template>

    <div>
        <h1>Gererics</h1>
        <p>Identify (String):{{identify('Hello')}}</p>
        <p>Identify (Number):{{identify(42)}}</p>
        <p>Box (String):{{boxString.value}}</p>
        <p>Box (Number):{{boxNumber.value}}</p>
    </div>
</template>
<script setup lang="ts">
function identify<T>(arg:T):T{
    return arg;
}

interface Box<T>{
    value:T
}

const boxString:Box<string> = {value:'hello'}
const boxNumber:Box<number> = {value:42}

</script>