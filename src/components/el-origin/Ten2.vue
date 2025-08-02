<template>
    <el-row>
        <el-col>
            <el-avatar :size="50" :src="testUrl"></el-avatar>
        </el-col>
        <el-col>
            <el-badge :value="1000" :max="99">
                <el-button type="success">comments</el-button>
            </el-badge>
            <el-badge :value="100" :max="10" >
                <el-button type="success">comments</el-button>
            </el-badge>
        </el-col>
    </el-row>
    <el-row>
        <el-calendar v-model="value" />
    </el-row>

    <div>
        <el-carousel @change="selChange" type="card"  height="auto" arrow="always">
            <el-carousel-item :style="{height:n%2==0?'200px':'150px'}"  v-for="n in 6" :key="n">
                <div  class="carousel-div" >
                    {{n}}
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>

    <div>
        <el-collapse accordion v-model="activeNames">
            <el-collapse-item :title="item.title" v-for="item in testArr" :key="item.title">
                <div>{{item.text}}</div>
            </el-collapse-item>
        </el-collapse>
    </div>

    <div>
        <el-descriptions direction="vertical" border>
            <el-descriptions-item label="Name">小明</el-descriptions-item>
            <el-descriptions-item label="Email">xx@xx.com</el-descriptions-item>
            <el-descriptions-item label="Address">城南</el-descriptions-item>
        </el-descriptions>
    </div>

    <el-card>
        <el-empty :image-size="200" :image="testUrl" description="No data!">
            <el-button type="success">更新？</el-button>
        </el-empty>
    </el-card>

    <el-card >
        <div style="display:flex;flex-direction:row;">
            <div v-for="fit in fits" :key="fit">
                <p>{{fit}}</p>
                <el-image style="width:100px;height:100px;" :src="testUrl" :fit="fit" >
                    <template #placeholder>
                        loading...
                    </template>
                </el-image>
            </div>
        </div>
    </el-card>


        <ul v-infinite-scroll="listLoad" style="height:200px;overflow:auto;">
            <li  v-for="m in vlist" :key="m">{{m}}</li>
        </ul>

        <div>
            <el-pagination size="small" background :pager-count="15" layout="prev,pager,next" :total="1000"/>
        </div>

        <div>
            <el-slider v-model="percentage"></el-slider>
            <el-progress type="circle" :stroke-width="26" :text-inside="true" :percentage="percentage"></el-progress>
            <el-result icon="success" title="Success Tip" sub-title="Please follow the instructions">
                <template #extra>
                    <el-button type="info">Back</el-button>
                </template>
            </el-result>
        </div>
        <div>
            <el-switch v-model="switchValue" />
           <div>
                <el-skeleton :count="3" :loading="switchValue" animated style="text-align:left;">
                    <template #default>
                        骨架屏之后的真是内容
                    </template>
                </el-skeleton>
           </div>
        </div>

        <div>
            <el-table height="200px" sum-text="合计" show-summary stripe :border="true" :data="table">
                <el-table-column v-for="item in tableCol" :prop="item.key" :label="item.label"></el-table-column>
            </el-table>
        </div>
</template>
<script setup lang="ts">
import {reactive,toRefs,ref,watch} from 'vue';
const vlist = ref<number>(6);
import {tableCol} from '@/common/el-origin/Ten2'
const listLoad = ()=>{
    vlist.value = vlist.value+2;
}
interface Table {
    name:string;
    age:number;
    address:string;
}

const table = ref<Table[]>([
    {name:'小明',age:26,address:'城南'},
    {name:'小王',age:19,address:'城北'},
    {name:'小军',age:18,address:'城西'},
    {name:'小军',age:18,address:'城西'},
    {name:'小军',age:18,address:'城西'},
    {name:'小军',age:18,address:'城西'},
    {name:'小军',age:18,address:'城西'},
])

const state = reactive({
    testUrl:'/src/assets/2.jpeg'
})
import imgUrl from '/2.jpeg';
// const {testUrl} = toRefs(state)
const testUrl = ref<string>(imgUrl);
const value = ref<Date>(new Date("2025/08/02"))
watch(value,()=>{
    console.log(value.value)
})
const selChange = ()=>{
    console.log("幻灯片切换了")
}
const activeNames = ref('1')

const switchValue = ref<boolean>(false);
interface Testarr{
    title:string;
    text:string
}
const percentage = ref<number>(10);
const testArr = ref<Testarr[]>([
    {
        title:'Title1',
        text:'kjfajfjlaj jfjaj fjsafjlj jjf fajfajfjlj f'
    },
    {
        title:'Title2',
        text:'fjlafjlaj fj jfljafjj lfjlaj fjlj ljjjffj jjfjfjl '
    },
    {
        title:'Title3',
        text:'fjaj fjal jjfjalj fjfie jfjajfljal jfljalj flajlfjlfjls'
    }
])
const fits = ['fill','contain','cover','none','scale-down'];
</script>
<style scoped lang="scss">
.carousel-div{
    height:160px;
    background-color:rgb(235, 153, 191);
    justify-content:center;
    align-items:center;
    display:flex;
}
</style>