<template>
    <div class="page-container">
        <!-- 文档头部 -->
        <header class="header">
            <div class="header-content">
                <h1>树形数据的虚拟列表与虚拟滚动优化</h1>
                <p>高性能渲染大量层级数据的解决方案</p>
            </div>
        </header>

        <!-- 主要内容 -->
        <main class="main-content">
            <!-- 概述 -->
            <section class="section">
                <h2>概述</h2>
                <p>
                    当需要渲染包含成千上万个节点的树形结构时，传统的全量渲染方式会导致严重的性能问题，包括：
                </p>
                <ul class="list-disc">
                    <li>DOM节点数量过多导致的内存占用激增</li>
                    <li>渲染和重绘性能下降，页面卡顿</li>
                    <li>用户交互响应迟缓</li>
                    <li>初始加载时间过长</li>
                </ul>
                <p>
                    虚拟列表（Virtual List）和虚拟滚动（Virtual Scrolling）技术通过只渲染可视区域内的节点，
                    显著减少DOM节点数量，从而解决上述性能问题。
                </p>
            </section>

            <!-- 原理介绍 -->
            <section class="section">
                <h2>核心原理</h2>
                
                <div class="subsection">
                    <h3>1. 虚拟列表工作原理</h3>
                    <p>
                        虚拟列表的核心思想是只渲染用户当前可见区域内的项目，而非所有数据。主要通过以下步骤实现：
                    </p>
                    <ol class="list-decimal">
                        <li>计算容器可视区域的高度</li>
                        <li>根据滚动位置确定当前可见的节点范围</li>
                        <li>只渲染可见范围内的节点</li>
                        <li>通过设置容器的总高度和偏移量来模拟完整列表的滚动效果</li>
                    </ol>
                </div>
                
                <div class="subsection">
                    <h3>2. 树形结构的特殊处理</h3>
                    <p>
                        树形数据相比普通列表增加了层级关系和展开/折叠状态，需要额外处理：
                    </p>
                    <ol class="list-decimal">
                        <li>维护节点的展开/折叠状态</li>
                        <li>计算每个节点的深度以实现缩进效果</li>
                        <li>递归计算可见节点，仅包含展开路径上的节点</li>
                        <li>动态更新可见节点列表当展开/折叠状态改变时</li>
                    </ol>
                </div>
                
                <div class="subsection">
                    <h3>3. 虚拟滚动关键计算</h3>
                    <p>
                        实现虚拟滚动的核心计算公式：
                    </p>
                    <div class="code-block">
                        <p>// 计算可见区域起始索引</p>
                        <p>const startIndex = Math.floor(scrollTop / itemHeight)</p>
                        <br>
                        <p>// 计算可见区域结束索引</p>
                        <p>const endIndex = startIndex + Math.ceil(viewportHeight / itemHeight) + buffer</p>
                        <br>
                        <p>// 计算偏移量</p>
                        <p>const offsetY = startIndex * itemHeight</p>
                    </div>
                    <p>
                        其中buffer是额外渲染的节点数量，用于避免滚动时出现空白。
                    </p>
                </div>
            </section>

            <!-- 适用场景 -->
            <section class="section">
                <h2>适用场景</h2>
                
                <div class="two-columns">
                    <div class="column box-primary">
                        <h3>推荐使用场景</h3>
                        <ul class="list-disc">
                            <li>包含1000+节点的树形结构</li>
                            <li>节点层级深且结构复杂的数据</li>
                            <li>需要频繁展开/折叠操作的树</li>
                            <li>对性能要求高的交互式树组件</li>
                            <li>移动端或低性能设备上的树形展示</li>
                        </ul>
                    </div>
                    
                    <div class="column box-secondary">
                        <h3>不适用场景</h3>
                        <ul class="list-disc">
                            <li>节点数量较少（少于100个）</li>
                            <li>简单的、层级不深的树形结构</li>
                            <li>需要同时显示大部分节点的场景</li>
                            <li>对初始加载速度要求极高，可接受后续操作略卡顿</li>
                        </ul>
                    </div>
                </div>
            </section>

            <!-- 关键原理代码 -->
            <section class="section">
                <h2>关键原理性代码</h2>
                
                <div class="subsection">
                    <h3>1. 可见节点计算逻辑</h3>
                    <p>递归计算所有可见节点，只包含展开路径上的节点：</p>
                    <div class="code-block">
                        <pre>// 计算可见节点的核心函数
function getVisibleNodes(node, depth = 0, parentExpanded = true) {
  const visible = [];
  
  // 只有父节点展开时，当前节点才可见
  if (parentExpanded) {
    // 添加当前节点
    visible.push({ node, depth });
    
    // 如果当前节点展开且有子节点，递归处理子节点
    if (expanded[node.id] && node.children?.length) {
      for (const child of node.children) {
        visible.push(...getVisibleNodes(child, depth + 1, true));
      }
    }
  }
  
  return visible;
}</pre>
                    </div>
                </div>
                
                <div class="subsection">
                    <h3>2. 虚拟滚动计算逻辑</h3>
                    <p>计算可视区域节点范围和偏移量：</p>
                    <div class="code-block">
                        <pre>// 计算需要渲染的节点范围
function calculateVisibleRange(scrollTop, viewportHeight, itemHeight, totalItems) {
  // 可视区域第一个可见节点的索引
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight));
  
  // 可视区域最后一个可见节点的索引（额外加2个缓冲节点）
  const visibleCount = Math.ceil(viewportHeight / itemHeight);
  const endIndex = Math.min(
    totalItems, 
    startIndex + visibleCount + 2
  );
  
  // 计算偏移量，用于定位可见节点
  const offsetY = startIndex * itemHeight;
  
  return { startIndex, endIndex, offsetY };
}</pre>
                    </div>
                </div>
                
                <div class="subsection">
                    <h3>3. 渲染优化逻辑</h3>
                    <p>只渲染可视区域内的节点：</p>
                    <div class="code-block">
                        <pre>// 渲染可视区域内的节点
function renderVisibleNodes() {
  // 获取所有可见节点
  const allVisibleNodes = getVisibleNodes(rootNode);
  const totalNodes = allVisibleNodes.length;
  
  // 计算容器和可视区域信息
  const { clientHeight, scrollTop } = container;
  
  // 计算需要渲染的节点范围
  const { startIndex, endIndex, offsetY } = calculateVisibleRange(
    scrollTop, 
    clientHeight, 
    itemHeight, 
    totalNodes
  );
  
  // 清空现有内容
  treeContainer.innerHTML = '';
  
  // 设置总高度，确保滚动条正常工作
  treeContainer.style.height = `${totalNodes * itemHeight}px`;
  
  // 设置偏移量，让节点显示在正确位置
  treeContainer.style.transform = `translateY(${offsetY}px)`;
  
  // 只渲染可见范围内的节点
  for (let i = startIndex; i < endIndex; i++) {
    const { node, depth } = allVisibleNodes[i];
    const nodeElement = createNodeElement(node, depth);
    treeContainer.appendChild(nodeElement);
  }
}</pre>
                    </div>
                </div>
            </section>

            <!-- 优势总结 -->
            <section class="section">
                <h2>优势总结</h2>
                
                <div class="three-columns">
                    <div class="column box">
                        <h3>性能提升</h3>
                        <p>
                            DOM节点数量从数千减少到数十，显著提高渲染和交互性能
                        </p>
                    </div>
                    
                    <div class="column box">
                        <h3>内存优化</h3>
                        <p>
                            减少DOM节点带来的内存占用，降低浏览器崩溃风险
                        </p>
                    </div>
                    
                    <div class="column box">
                        <h3>体验改善</h3>
                        <p>
                            滚动流畅度提升，操作响应更快，提供接近原生应用的体验
                        </p>
                    </div>
                </div>
            </section>
        </main>

        <!-- 页脚 -->
        <footer class="footer">
            <p>大量树形数据展示示例</p>
        </footer>
    </div>
</template>

<script setup lang="ts">
// 此组件为文档展示，无实际功能逻辑
import { onMounted } from 'vue';

onMounted(() => {
    // 仅用于演示，无实际功能
    console.log('树形数据虚拟滚动文档加载完成');
});
</script>

<style scoped>
/* 基础样式 */


.page-container {
    min-height: 100vh;
    background-color: #f9f9f9;
    color: #333;
    line-height: 1.6;
}

/* 头部样式 */
.header {
    background-color: #2c3e50;
    color: white;
    padding: 2rem 0;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.header-content {
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 2rem;
}

.header h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
}

.header p {
    font-size: 1.1rem;
    opacity: 0.9;
}

/* 主要内容样式 */
.main-content {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
}

/* 章节样式 */
.section {
    background-color: white;
    padding: 2rem;
    margin-bottom: 2rem;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.section h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #2c3e50;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #eee;
}

.subsection {
    margin-bottom: 1.5rem;
}

.subsection h3 {
    font-size: 1.2rem;
    margin: 1rem 0;
    color: #34495e;
}

/* 列表样式 */
.list-disc {
    margin: 1rem 0;
    padding-left: 2rem;
    list-style-type: disc;
}

.list-decimal {
    margin: 1rem 0;
    padding-left: 2rem;
    list-style-type: decimal;
}

.list-disc li, .list-decimal li {
    margin-bottom: 0.5rem;
}

/* 代码块样式 */
.code-block {
    background-color: #2d2d2d;
    color: #f8f8f2;
    padding: 1rem;
    border-radius: 4px;
    margin: 1rem 0;
    overflow-x: auto;
    font-family: monospace;
    font-size: 0.9rem;
}

pre {
    margin: 0;
    white-space: pre-wrap;
    word-wrap: break-word;
}

/* 列布局 */
.two-columns {
    display: flex;
    gap: 1rem;
    margin: 1rem 0;
}

.three-columns {
    display: flex;
    gap: 1rem;
    margin: 1rem 0;
}

.column {
    flex: 1;
}

/* 盒子样式 */
.box {
    border: 1px solid #ddd;
    padding: 1rem;
    border-radius: 4px;
}

.box-primary {
    border: 1px solid #3498db;
    padding: 1rem;
    border-radius: 4px;
    background-color: #ebf5fb;
}

.box-secondary {
    border: 1px solid #95a5a6;
    padding: 1rem;
    border-radius: 4px;
    background-color: #f5f5f5;
}

.box h3, .box-primary h3, .box-secondary h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
}

/* 页脚样式 */
.footer {
    background-color: #2c3e50;
    color: white;
    text-align: center;
    padding: 1.5rem 0;
    margin-top: 2rem;
}

/* 响应式调整 */
@media (max-width: 768px) {
    .two-columns, .three-columns {
        flex-direction: column;
    }
    
    .header h1 {
        font-size: 1.8rem;
    }
    
    .main-content {
        padding: 1rem;
    }
    
    .section {
        padding: 1.5rem;
    }
}
</style>