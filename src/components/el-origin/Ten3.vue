<template>
    <div>
        <el-tag closable round>Tag 1</el-tag>
        <el-tag class="ml-2" type="success">Tag 2</el-tag>
        <el-tag class="ml-2" type="info">Tag 3</el-tag>
        <el-tag class="ml-2" type="warning">Tag 4</el-tag>
        <el-tag class="ml-2" type="danger">Tag 5</el-tag>
    </div>

    <div>
        <el-timeline style="text-align:left;">
            <el-timeline-item :key="index" type="success" :timestamp="activity.timestamp" v-for="(activity,index) in activities">
                {{activity.content}}
            </el-timeline-item>
        </el-timeline>
    </div>

    <div>
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
    </div>
</template>
<script setup lang="ts">
import {ref} from 'vue';
interface Tree{
    label:string;
    children?:Tree[]
}
const handleNodeClick = (data:Tree)=>{
    console.log(data);
}
const data:Tree[] = [
    {
        label:'Level one 1',
        children:[
            {
                label:'lEvel two 1-1',
                children:[
                    {
                        label:'level three 1-1-1'
                    }
                ]

            }
        ]
    },
    {
        label:'Level one 2',
        children:[
            {
                label:'level two 2-1',
                children:[
                    {
                        label:'level three 2-1-1'
                    }
                ]
            },
            {
                label:'level two 2-2',
                children:[
                    {
                        label:'level three 2-2-1'
                    }
                ]
            }
        ]
    },
    {
        label:'Level one 3',
        children:[
            {
                label:'level two 3-1',
                children:[
                    {
                        label:'level three 3-1-1'
                    }
                ]
            },{
                label:'level two 3-1',
                children:[
                    {
                        label:'level three 3-2-1'
                    }
                ]
            }
        ]
    }
]
const defaultProps = {
    children:'children',
    label:'label'
}
const activities = [
    {
        content:'Event start',
        timestamp:'时间1'
    },
    {
        content:'Approved',
        timestamp:'时间2'
    },
    {
        content:'Success',
        timestamp:'时间3'
    },

]



</script>
<style scoped lang="scss">
.ml-2{
    margin:0px 2px;
}
</style>