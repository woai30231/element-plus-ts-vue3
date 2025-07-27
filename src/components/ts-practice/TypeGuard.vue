<template>
    <div>
        <h1>Type Guards</h1>
        <p>Data:{{data.name}} - {{data.age}}</p>
        <p>Processed Data:{{handleData(data)}}</p>
    </div>
</template>
<script setup lang="ts">
type UserProfile = {
    name:string;
    email:string;
    age:number;
}
function isUserProfile(obj:any):obj is UserProfile{
    return 'name' in obj && 'email' in obj && 'age' in obj;
}
const data :any = {name:'Alice',age:25};
const handleData = (data:any):string=>{
    if(isUserProfile(data)){
        return `User : ${data.name},${data.email},${data.age}`;
    }else{
        return "Invalid data";
    };
}

</script>