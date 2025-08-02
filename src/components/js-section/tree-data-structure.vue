<template>
    <Treechild></Treechild>
    <div class="tree-container" ref="containerRef">
        <div class="tree" ref="treeRef"></div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Treechild from './tree-child.vue'
import type { TreeDataType, Expanded, VisibleNodeType } from '@/types/common/treeData';

// 模拟树形数据
const treeData: TreeDataType = {
    id: 1,
    name: 'Root',
    children: Array.from({ length: 100 }, (_, i) => ({
        id: (2)*100+(i+1),
        name: `Node ${(2)*100+(i+1)}`,
        children: Array.from({ length: 10000 }, (_, j) => ({
            id: (i+3) * 10000 + j+1,
            name: `Child ${(i +3 )* 10000  + j+1}`,
            children: []
        }))
    }))
};

console.log("treeData")
console.log(treeData)

const containerRef = ref<HTMLDivElement |null>(null);
const treeRef = ref<HTMLDivElement |null>(null);
const itemHeight = 30;
let scrollTop = 0;
let expanded: Expanded = { 1: true }; // 默认展开根节点
let visibleNodes: VisibleNodeType[] = [];
let scrollAnimation: number | null = null; // 用于存储动画帧ID

// 计算所有可见节点
function getVisibleNodes(node: TreeDataType, depth = 0, parentExpanded = true): VisibleNodeType[] {
    const visible: VisibleNodeType[] = [];
    
    if (parentExpanded) {
        visible.push({ 
            node, 
            depth,
            id: node.id 
        });
        
        if (node.children && node.children.length > 0 && expanded[node.id]) {
            for (const child of node.children) {
                visible.push(...getVisibleNodes(child, depth + 1, true));
            }
        }
    }
    
    return visible;
}

// 渲染函数
function render() {
    const container = containerRef.value;
    const tree = treeRef.value;
    
    if (!container || !tree) return;
    
    visibleNodes = getVisibleNodes(treeData);
    const visibleCount = visibleNodes.length;
    const viewportHeight = container.clientHeight;
    
    // 计算可视区域内的节点范围
    const startIdx =  Math.floor(scrollTop / itemHeight);
    const endIdx = Math.min(visibleCount, startIdx + Math.ceil(viewportHeight / itemHeight) + 2);
    
    tree.innerHTML = '';
    tree.style.transform = `translateY(${startIdx * itemHeight}px)`;
    
    // 渲染可视区域内的节点
    for (let i = startIdx; i < endIdx; i++) {
        const { node, depth } = visibleNodes[i];
        const div = document.createElement('div');
        div.className = 'node';
        div.dataset.id = node.id.toString();
        div.style.paddingLeft = `${depth * 20}px`;
        div.style.height = `${itemHeight}px`;
        div.style.lineHeight = `${itemHeight}px`;
        
        // 添加展开/折叠图标
        if (node.children && node.children.length > 0) {
            const icon = document.createElement('span');
            icon.className = 'toggle-icon';
            icon.textContent = expanded[node.id] ? '−' : '+';
            div.appendChild(icon);
            
            // 点击事件
            div.addEventListener('click', (e) => {
                e.stopPropagation();
                expanded[node.id] = !expanded[node.id];
                render();
            });
        }
        
        // 添加节点文本
        const text = document.createElement('span');
        text.textContent = node.name;
        div.appendChild(text);
        
        tree.appendChild(div);
    }
    
    // 设置总高度
    tree.style.height = `${visibleCount * itemHeight}px`;
}

onMounted(() => {
    const container = containerRef.value;
    
    if (container) {
        // 初始渲染
        render();
        
        // 滚动事件处理
        container.addEventListener('scroll', () => {
            // 使用requestAnimationFrame优化性能
            if (scrollAnimation) {
                cancelAnimationFrame(scrollAnimation);
            }
            scrollAnimation = requestAnimationFrame(() => {
                scrollTop = container.scrollTop;
                render();
            });
        });
    } else {
        console.error('容器元素未找到');
    }
});
</script>
<style>
.tree-container {
    height: 300px;
    overflow: auto;
    border: 1px solid #ccc;
    position: relative;
    color:#606266;
    .tree {
        position: absolute;
        width: 100%;
        will-change: transform; 
        .node {
            padding-left: 5px;
            cursor: pointer;
            white-space: nowrap;
            user-select: none;
            height:30px;
            box-sizing: border-box;
            cursor:pointer;
            &:hover{
                background-color:#ddd;
                color:#fff;
            }
        }
        
    }
    .toggle-icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        text-align: center;
        line-height: 16px;
        margin-right: 8px;
        border: 1px solid #ccc;
        border-radius: 3px;
        font-size: 12px;
        color: #666;
    }
}






</style>
