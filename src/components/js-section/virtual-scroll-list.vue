<template>
    <div class="cContainer">
        <virtualChild />
        <div class="__virtual-con">
            <div class="__virtual-list"></div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {ref,onMounted} from 'vue';
import virtualChild from './virtual-child.vue';
const data = Array.from({length:10000},(_,i)=>`Item ${i+1}`);
let container:HTMLDivElement|null = null ;//document.querySelector(".con");
let virtualList:HTMLDivElement | null =  null;//document.querySelector(".virtual-list");
const itemHeight = 50;
let scrollTop = 0;
const isSetHeight = ref<boolean>(false);
//渲染函数
function render(){
    if(!container || !virtualList)return;
    const startIdx = Math.floor(scrollTop/itemHeight);
    const endIndex = startIdx + Math.ceil(container!.clientHeight /itemHeight)+2;
    //拿到需要渲染的数据
    const virtualData = data.slice(startIdx,endIndex);
    console.log(virtualData);
    //清空现有内容
    virtualList.innerHTML = '';

    const temContainer = document.createDocumentFragment()
    //渲染可见元素
    // virtualData.forEach((item,i)=>{
       
    // })
    for(let i = startIdx;i<endIndex && i<data.length;i++){
        console.log(i)
        const div = document.createElement('div');
        div.className = 'item';
        div.textContent = data[i];
        // 设置每个项的绝对位置（相对于virtual-list）
        div.style.position = 'absolute';
        div.style.top = `${i * itemHeight}px`;
        div.style.width = '100%';
        temContainer.appendChild(div);
    }
    virtualList.appendChild(temContainer);

    // 3. 关键：设置列表偏移，让可见项对齐视口
    // virtualList.style.transform = `translateY(${startIdx * itemHeight}px)`;
    //设置容器高度（关键！）
    if(isSetHeight.value)return;
    virtualList.style.height = `${data.length * itemHeight}px`;
}
// 
const isRendering = ref<boolean>(false);
onMounted(()=>{
    container = document.querySelector(".__virtual-con");
    virtualList =  document.querySelector(".__virtual-list");
    container?.addEventListener("scroll",()=>{
        if(!isRendering.value){
            isRendering.value = true;
            requestAnimationFrame(()=>{
                scrollTop = container!.scrollTop;
                render();
                isRendering.value = false;
            })
        }
    })
    render();
})
</script>
<style lang="scss">
.cContainer{
    text-align:left;
    ._title{
        text-align:center;
        display:block;
        margin:10px auto;
        font-weight:bold;
    }
}

.__virtual-con{
    height:300px;
    overflow:auto;
    border:1px solid #ccc;
    position:relative;
}
.__virtual-list{
    position:absolute;
    width:100%;
    .item{
        height:50px;
        line-height:50px;
        border-bottom:1px solid #eee;
        padding-left:10px;
        box-sizing:border-box;
        cursor:pointer;
        &:hover{
            background-color:#aaa;
            color:#fff;
        }
    }
}

</style>