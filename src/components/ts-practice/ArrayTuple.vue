<template>
    <div>
        <h1>Arrays and Tuples</h1>
        <p>Numbers : {{numbers.join(', ')}}</p>
        <p>
            Names : {{names.join(', ')}}
        </p>
        <p>Person : {{lastPerson?.[0] }} - {{lastPerson?.[1]}}</p>
        <el-form @submit.prevent="addPerson">
            <el-form-item label="Name">
                <el-input v-model="newPersonName" />
            </el-form-item>
            <el-form-item label="Age">
                <el-input v-model.number="newPersonAge" />
            </el-form-item>
            <el-button type="primary" native-type="submit">Add Person</el-button>
        </el-form>
    </div>
</template>
<script lang="ts">
import {defineComponent,ref,computed} from 'vue';
export default defineComponent({
    name:"ArrayTuple",
    components:{
        
    },
    setup(){
        const numbers :number[] = [1,2,3];
        const names:string[] = ["Alice",'Blob'];
        const person:[string,number] = ['Charlie',30];
        const lastPerson = computed(()=>{
            return [newPersonName.value,newPersonAge]
        });
        const newPersonName = ref('');
        const newPersonAge = ref<number>(0);
        const addPerson = ()=>{
            if(newPersonName.value && newPersonAge.value){
                person.push(newPersonName.value,newPersonAge.value)
                newPersonName.value = '';
                newPersonAge.value = 0;
                console.log(person)
            };
        }
        return {
            numbers,
            names,
            person,
            newPersonName,
            newPersonAge,
            addPerson,
            lastPerson
        }
    }
})
</script>