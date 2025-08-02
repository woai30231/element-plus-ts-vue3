<template>
    <div class="virtual-scroll-docs">
      <header class="docs-header">
        <h1>虚拟滚动列表（Virtual Scrolling List）</h1>
        <p>高效处理大规模数据列表的前端优化方案</p>
      </header>
  
      <main class="docs-content">
        <!-- 适用场景部分 -->
        <section class="docs-section">
          <h2 class="section-title">一、适用场景</h2>
          <div class="section-content">
            <p>虚拟滚动列表通过「只渲染可视区域内容」的核心思想，解决大量数据渲染导致的性能问题，主要适用于以下场景：</p>
            
            <div class="scene-card">
              <h3>1. 超大数据量列表</h3>
              <p>当需要展示<span class="highlight">1000+条数据</span>时（如订单记录、用户列表、日志详情等），直接渲染全部DOM会导致：</p>
              <ul class="scene-list">
                <li>页面初始化缓慢（DOM节点过多导致解析耗时）</li>
                <li>滚动卡顿（浏览器重排重绘成本过高）</li>
                <li>内存占用激增（大量DOM节点常驻内存）</li>
              </ul>
            </div>
  
            <div class="scene-card">
              <h3>2. 固定高度列表项场景</h3>
              <p>最适合列表项高度固定的场景（如表格行、商品卡片等），此时可通过简单计算精准定位可视区域内容。</p>
              <p class="note">注：动态高度列表项也可实现，但需额外处理高度测量逻辑，复杂度更高。</p>
            </div>
  
            <div class="scene-card">
              <h3>3. 交互频繁的长列表</h3>
              <p>需要支持滚动、点击、悬停等交互的长列表（如聊天记录、评论区），虚拟滚动可保持交互响应速度。</p>
            </div>
  
            <div class="scene-card">
              <h3>4. 移动端性能优化</h3>
              <p>移动端设备硬件性能有限，大量DOM渲染易导致页面崩溃或ANR（应用无响应），虚拟滚动可显著提升兼容性。</p>
            </div>
  
            <div class="scene-card warning">
              <h3>不适用场景</h3>
              <ul class="scene-list">
                <li>数据量较少（如少于200条）：优化收益低于实现成本</li>
                <li>列表项高度动态且不可预测：计算逻辑复杂，易出现空白或错位</li>
                <li>需要频繁操作整体DOM结构（如批量拖拽排序）：虚拟滚动的局部渲染会增加逻辑复杂度</li>
              </ul>
            </div>
          </div>
        </section>
  
        <!-- 实现原理部分 -->
        <section class="docs-section">
          <h2 class="section-title">二、实现原理</h2>
          <div class="section-content">
            <p>虚拟滚动的核心是「用局部渲染模拟整体列表」，通过以下四个关键步骤实现：</p>
            
            <div class="principle-step">
              <h3>1. 界定可视区域范围</h3>
              <p>根据容器的滚动距离和可视高度，计算当前需要显示的列表项索引范围：</p>
              <div class="code-snippet">
                <pre>// 滚动距离 / 单项高度 = 起始索引
  const startIndex = Math.floor(scrollTop / itemHeight);
  // 起始索引 + 可视区域可容纳项数 = 结束索引（+2为缓冲项）
  const endIndex = startIndex + Math.ceil(containerHeight / itemHeight) + 2;</pre>
              </div>
              <p>通过上述计算，可从海量数据中筛选出「当前需要渲染的小部分数据」。</p>
            </div>
  
            <div class="principle-step">
              <h3>2. 局部渲染可视内容</h3>
              <p>仅渲染startIndex到endIndex范围内的列表项，而非全部数据，大幅减少DOM节点数量：</p>
              <div class="code-snippet">
                <pre>// 从完整数据中截取可视部分
  const visibleData = fullData.slice(startIndex, endIndex);
  // 只渲染这部分数据（示例伪代码）
  visibleData.forEach(item => {
    renderItem(item); // 渲染单个列表项
  });</pre>
              </div>
              <p>通常会配合文档片段（DocumentFragment）减少DOM操作次数，进一步优化性能。</p>
            </div>
  
            <div class="principle-step">
              <h3>3. 偏移定位可视内容</h3>
              <p>通过CSS定位（transform或top）将渲染的可视项「偏移」到容器的可视区域内，模拟整体滚动效果：</p>
              <div class="code-snippet">
                <pre>// 通过transform将列表向上偏移，使可视项对齐容器顶部
  virtualList.style.transform = `translateY(${startIndex * itemHeight}px)`;</pre>
              </div>
              <p>原理示意图：</p>
              <div class="principle-diagram">
                <div class="diagram-illustration">
                  <!-- 示意图说明 -->
                  <div class="diagram-container">
                    <div class="diagram-scrollbar">滚动条</div>
                    <div class="diagram-visible-area">可视区域</div>
                    <div class="diagram-rendered">已渲染项</div>
                    <div class="diagram-hidden">未渲染项（省略）</div>
                  </div>
                  <p>通过偏移，使已渲染的局部内容始终显示在可视区域内，用户感知与完整列表一致。</p>
                </div>
              </div>
            </div>
  
            <div class="principle-step">
              <h3>4. 撑开容器高度</h3>
              <p>设置虚拟列表的总高度为「完整数据量 × 单项高度」，确保滚动条长度与完整渲染时一致，保证滚动体验：</p>
              <div class="code-snippet">
                <pre>// 总高度 = 数据总量 × 单项高度
  virtualList.style.height = `${fullData.length * itemHeight}px`;</pre>
              </div>
              <p>这一步是模拟「完整列表存在」的关键，否则滚动条会因实际DOM高度不足而无法正常滚动。</p>
            </div>
  
            <div class="principle-summary">
              <h3>总结</h3>
              <p>虚拟滚动通过「范围计算→局部渲染→偏移定位→高度模拟」四步，在用户无感知的情况下，用少量DOM节点实现海量数据的滚动效果，核心是「以计算换性能」。</p>
            </div>
          </div>
        </section>
      </main>
  
    </div>
  </template>
  
  <script setup lang="ts">
  // 文档仅作介绍用，无实际逻辑
  </script>
  
  <style scoped lang="scss">
  .virtual-scroll-docs {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    color: #333;
    line-height: 1.6;
  }
  
  .docs-header {
    text-align: center;
    margin-bottom: 40px;
    padding-bottom: 20px;
    border-bottom: 2px solid #f0f0f0;
  
    h1 {
      font-size: 2.2rem;
      margin-bottom: 10px;
      color: #2c3e50;
    }
  
    p {
      font-size: 1.1rem;
      color: #666;
    }
  }
  
  .docs-section {
    margin-bottom: 50px;
  
    .section-title {
      font-size: 1.8rem;
      color: #2c3e50;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
    }
  
    .section-content {
      padding-left: 10px;
    }
  }
  
  .scene-card {
    background: #f9f9f9;
    border-radius: 8px;
    padding: 15px 20px;
    margin-bottom: 20px;
    border-left: 4px solid #3498db;
  
    &.warning {
      background: #fff8f8;
      border-left-color: #e74c3c;
    }
  
    h3 {
      margin-top: 0;
      color: #2c3e50;
      font-size: 1.2rem;
    }
  }
  
  .scene-list {
    margin: 10px 0;
    padding-left: 20px;
  
    li {
      margin-bottom: 8px;
    }
  }
  
  .highlight {
    color: #e74c3c;
    font-weight: bold;
  }
  
  .note {
    color: #7f8c8d;
    font-style: italic;
    margin-top: 8px;
    font-size: 0.95rem;
  }
  
  .principle-step {
    margin-bottom: 30px;
  
    h3 {
      font-size: 1.3rem;
      color: #2c3e50;
      margin-bottom: 10px;
    }
  }
  
  .code-snippet {
    background: #2d2d2d;
    color: #f8f8f2;
    border-radius: 6px;
    padding: 15px;
    margin: 10px 0 15px;
    overflow-x: auto;
  
    pre {
      margin: 0;
      font-family: "Fira Code", monospace;
      font-size: 0.9rem;
    }
  }
  
  .principle-diagram {
    margin: 20px 0;
    padding: 15px;
    background: #f9f9f9;
    border-radius: 8px;
  
    .diagram-illustration {
      text-align: center;
  
      .diagram-container {
        height: 120px;
        border: 1px solid #ccc;
        border-radius: 4px;
        position: relative;
        margin: 10px auto;
        max-width: 600px;
  
        .diagram-scrollbar {
          position: absolute;
          right: 0;
          top: 0;
          width: 8px;
          height: 100%;
          background: #eee;
  
          &::after {
            content: "";
            position: absolute;
            right: 1px;
            top: 30%;
            width: 6px;
            height: 40%;
            background: #999;
            border-radius: 3px;
          }
        }
  
        .diagram-visible-area {
          position: absolute;
          left: 0;
          top: 0;
          width: calc(100% - 8px);
          height: 100%;
          border: 2px dashed #3498db;
          box-sizing: border-box;
          pointer-events: none;
        }
  
        .diagram-rendered {
          position: absolute;
          left: 10px;
          top: 30%;
          width: calc(100% - 30px);
          height: 40%;
          background: rgba(52, 152, 219, 0.2);
          border: 1px solid #3498db;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
        }
  
        .diagram-hidden {
          position: absolute;
          left: 10px;
          width: calc(100% - 30px);
          height: 20%;
          color: #999;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
  
          &:first-of-type {
            top: 5px;
          }
  
          &:last-of-type {
            bottom: 5px;
          }
        }
      }
    }
  }
  
  .principle-summary {
    background: #f0f7ff;
    padding: 15px;
    border-radius: 6px;
    margin-top: 20px;
  
    h3 {
      margin-top: 0;
      color: #2980b9;
    }
  }
  

  </style>