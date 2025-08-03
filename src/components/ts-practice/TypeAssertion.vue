<template>
    <div>
        <h1>Type Assertions</h1>
        <p>Data:{{data.name}} - {{data.age}}</p>
        <p>Processed Data:{{processData(data).name}} - {{processData(data).email}} - {{processData(data).age}}</p>
    </div>
</template>
<script setup lang="ts">
type UserProfile = {
    name:string;
    email:string;
    age:number
}
const data :any = {name:'Alice',age:25};
// const processedData = (data as UserProfile);
// const test : typeof processedData = {name:'testname'} as UserProfile;
const processData = (data:any):UserProfile=>{
    return data as UserProfile;
}

</script>