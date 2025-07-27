<template>
    <div>
        <h1>Basic Types</h1>
        <p>Name : {{name}}</p>
        <p>Age : {{age}}</p>
        <p>Is Student: {{isStudent?'yes':'no'}}</p>
        <p>Optional Value: {{optionalValue || 'N/A'}}</p>
        <p>Greeting : {{greet('Alice')}}</p>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name:'BasicTypes',
    setup(){
        const name : string = 'Alice';
        const age :number = 25;
        const isStudent :boolean = true;
        const optionalValue:string | null = null;
        const greet = (name:string):string=>{
            return `Hello, ${name}`;
        }
        return {
            name,
            age,
            isStudent,
            optionalValue,
            greet
        }
    }
})
</script>