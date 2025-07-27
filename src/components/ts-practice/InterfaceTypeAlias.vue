<template>
    <div>
        <h1>Interfaces and Type Aliases</h1>
        <p>User: {{user.name}} - {{user.email}}</p>
        <p>
            Profile:{{profile.username}} - {{profile.bio}}
        </p>
        <p>User Profile:{{ userProfile.name }} - {{userProfile.email}} - {{userProfile.bio}}</p>
    </div>
</template>
<script setup lang="ts">
interface User{
    id:number;
    name:string;
    email:string;
}
type Profile = {
    username:string;
    bio:string;
}
const user:User = {
    id:1,
    name:'Alice',
    email:'alice@example.com'
}
const profile:Profile = {
    username:'alice123',
    bio:"Software Developer"
};
const getUserProfile = (userId:number):User & Profile=>{
    return {
        ...user,
        ...profile,
        id:userId
    }
}
const userProfile = getUserProfile(user.id);
</script>