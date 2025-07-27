<template>
    <div>
        <h1>Classes and Inheritance</h1>
        <p>Student : {{student.name}} - {{student.studentId}}</p>
        <p>Greet:{{student.greet()}}</p>
        <p>Study:{{student.study()}}</p>
        <p>Created Person : {{createdPerson.name}} - {{createdPerson.greet()}}</p>
    </div>
</template>
<script setup lang="ts">
import {ref} from 'vue'
class Person {
    constructor(public name:string){

    }
    greet(){
        return `Hello, my name is ${this.name}`
    };
}
class Student extends Person{
    constructor(name:string,public studentId:number){
        super(name);
    }
    study(){
        return `${this.name} is studying`;
    }
}

const student = ref<Student>(new Student("Alice",12345))
const createPerson = (name:string):Person=>{
    return new Person(name);
}
const createdPerson = ref(createPerson('Bob'));
</script>