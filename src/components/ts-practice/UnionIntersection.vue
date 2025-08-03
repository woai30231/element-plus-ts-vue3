<template>
    <div>
        <h1>Union and Intersection</h1>
        <p>User ID:{{userId}}</p>
        <p>User Profile:{{userProfile.name}} - {{userProfile.email}} - {{userProfile.age}}</p>
        <p>User Info:{{getUserInfo(userId).name}}-{{getUserInfo(userId).email}} - {{getUserInfo(userId).age}}</p>

    </div>
</template>

<script setup lang="ts">
type UserId = string | number;
type UserProfile = {
    name:string;
    email:string;
} & {
    age:number;
}

const userId:UserId = '12345';
const userProfile:UserProfile = {
    name:'Alice',
    email:"alice@example.com",
    age:25
}
const getUserInfo = (_id:UserId):UserProfile=>{
    return userProfile;
}
</script>