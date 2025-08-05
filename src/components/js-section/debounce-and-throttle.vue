<template>
    <div class="debounce-throttle-docs">
      <!-- 页面头部 -->
      <header class="page-header">
        <h1 style="margin:0px;">JavaScript防抖和节流</h1>
      </header>
  
      <!-- 导航栏 -->
      <nav class="doc-nav">
        <ul>
          <li @click="scrollTo('debounce')">防抖(Debounce)</li>
          <li @click="scrollTo('throttle')">节流(Throttle)</li>
          <li @click="scrollTo('difference')">区别与对比</li>
          <li @click="scrollTo('scenarios')">应用场景</li>
        </ul>
      </nav>
  
      <!-- 主要内容 -->
      <main class="doc-content">
        <!-- 防抖部分 -->
        <section id="debounce" class="doc-section">
          <h2>防抖(Debounce)</h2>
          <div class="section-content">
            <p>防抖是指触发事件后，在n秒内函数只能执行一次，如果n秒内又触发了事件，则重新计算函数执行时间。</p>
            
            <h3>基本实现</h3>
            <div class="code-block">
              <pre>// 基础防抖函数实现
  function debounce(func, delay) {
    let timer = null;
    
    return function(...args) {
      // 清除之前的定时器
      if (timer) clearTimeout(timer);
      
      // 设置新的定时器
      timer = setTimeout(() => {
        func.apply(this, args);
        timer = null;
      }, delay);
    };
  }</pre>
            </div>
            
            <h3>立即执行版本</h3>
            <div class="code-block">
              <pre>// 立即执行的防抖函数
  function debounceImmediate(func, delay, immediate = true) {
    let timer = null;
    
    return function(...args) {
      if (timer) clearTimeout(timer);
      
      // 立即执行的情况
      if (immediate && !timer) {
        func.apply(this, args);
      }
      
      timer = setTimeout(() => {
        // 非立即执行的情况
        if (!immediate) {
          func.apply(this, args);
        }
        timer = null;
      }, delay);
    };
  }</pre>
            </div>
            
            <h3>Vue中使用</h3>
            <div class="code-block">
              <pre>// Vue组件中使用防抖
  export default {
    methods: {
      // 定义防抖方法
      handleSearch: debounce(function(keyword) {
        // 实际搜索逻辑
        console.log('搜索:', keyword);
      }, 500),
      
      // 或者在生命周期中绑定
      init() {
        this.handleScroll = debounce(this.handleScroll, 300);
        window.addEventListener('scroll', this.handleScroll);
      }
    },
    beforeDestroy() {
      // 移除事件监听
      window.removeEventListener('scroll', this.handleScroll);
    }
  }</pre>
            </div>
          </div>
        </section>
  
        <!-- 节流部分 -->
        <section id="throttle" class="doc-section">
          <h2>节流(Throttle)</h2>
          <div class="section-content">
            <p>节流是指连续触发事件，但在n秒内只执行一次函数，保证函数有规律地执行。</p>
            
            <h3>时间戳实现</h3>
            <div class="code-block">
              <pre>// 时间戳版节流
  function throttleTimestamp(func, interval) {
    let lastTime = 0;
    
    return function(...args) {
      const now = Date.now();
      
      // 如果当前时间与上次执行时间的差大于间隔时间
      if (now - lastTime > interval) {
        func.apply(this, args);
        lastTime = now;
      }
    };
  }</pre>
            </div>
            
            <h3>定时器实现</h3>
            <div class="code-block">
              <pre>// 定时器版节流
  function throttleTimer(func, interval) {
    let timer = null;
    
    return function(...args) {
      if (!timer) {
        timer = setTimeout(() => {
          func.apply(this, args);
          timer = null;
        }, interval);
      }
    };
  }</pre>
            </div>
            
            <h3>综合版实现</h3>
            <div class="code-block">
              <pre>// 综合版节流（支持立即执行和尾部执行）
  function throttle(func, interval, options = { leading: true, trailing: false }) {
    let lastTime = 0;
    let timer = null;
    const { leading, trailing } = options;
    
    const clear = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };
    
    return function(...args) {
      const now = Date.now();
      
      // 第一次执行时，如果不需要立即执行，则设置lastTime为当前时间
      if (!lastTime && !leading) lastTime = now;
      
      const remaining = interval - (now - lastTime);
      
      if (remaining <= 0) {
        // 时间差大于间隔，执行函数
        clear();
        func.apply(this, args);
        lastTime = now;
      } else if (trailing && !timer) {
        // 尾部执行
        timer = setTimeout(() => {
          func.apply(this, args);
          lastTime = Date.now();
          timer = null;
        }, remaining);
      }
    };
  }</pre>
            </div>
          </div>
        </section>
  
        <!-- 区别与对比部分 -->
        <section id="difference" class="doc-section">
          <h2>区别与对比</h2>
          <div class="section-content">
            <div class="comparison-table">
              <table>
                <thead>
                  <tr>
                    <th>特性</th>
                    <th>防抖(Debounce)</th>
                    <th>节流(Throttle)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>核心思想</td>
                    <td>触发后延迟执行，重新触发则重新计时</td>
                    <td>固定间隔内只执行一次</td>
                  </tr>
                  <tr>
                    <td>执行次数</td>
                    <td>事件停止触发后执行一次</td>
                    <td>间隔固定，多次执行</td>
                  </tr>
                  <tr>
                    <td>时间控制</td>
                    <td>从最后一次触发开始计算延迟</td>
                    <td>按固定间隔计算</td>
                  </tr>
                  <tr>
                    <td>适用场景</td>
                    <td>输入验证、搜索联想等</td>
                    <td>滚动加载、窗口调整等</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div class="note">
              <strong>记忆要点：</strong> 防抖是"延迟执行，重新触发则重置计时"，节流是"固定频率执行，无论触发多频繁"。
            </div>
          </div>
        </section>
  
        <!-- 应用场景部分 -->
        <section id="scenarios" class="doc-section">
          <h2>应用场景</h2>
          <div class="section-content">
            <h3>防抖适用场景</h3>
            <ul class="scenario-list">
              <li>
                <strong>搜索框输入联想</strong>
                <p>用户输入时，不需要每次按键都请求接口，而是等待用户停止输入一段时间后再请求</p>
                <div class="code-block">
                  <pre>// 搜索输入防抖示例
  const searchInput = document.getElementById('search-input');
  const handleSearch = debounce(function(value) {
    console.log('请求搜索:', value);
    // 实际接口请求逻辑...
  }, 500);
  
  searchInput.addEventListener('input', (e) => {
    handleSearch(e.target.value);
  });</pre>
                </div>
              </li>
              <li>
                <strong>表单验证</strong>
                <p>输入框内容验证，等待用户输入完成后再进行验证</p>
              </li>
              <li>
                <strong>按钮点击防重复提交</strong>
                <p>防止用户快速点击按钮导致多次提交</p>
              </li>
              <li>
                <strong>浏览器窗口大小调整</strong>
                <p>窗口大小调整完成后再执行布局调整逻辑</p>
              </li>
            </ul>
            
            <h3>节流适用场景</h3>
            <ul class="scenario-list">
              <li>
                <strong>滚动加载</strong>
                <p>监听滚动事件，固定间隔检测是否到达页面底部</p>
                <div class="code-block">
                  <pre>// 滚动加载节流示例
  const handleScroll = throttle(function() {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    
    // 判断是否到达页面底部
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      console.log('加载更多数据');
      // 加载数据逻辑...
    }
  }, 1000);
  
  window.addEventListener('scroll', handleScroll);</pre>
                </div>
              </li>
              <li>
                <strong>高频点击事件</strong>
                <p>如游戏中的射击按钮，限制每秒触发次数</p>
              </li>
              <li>
                <strong>鼠标移动/拖拽事件</strong>
                <p>如拖拽元素时更新位置，固定频率更新</p>
              </li>
              <li>
                <strong>视频/音频播放进度更新</strong>
                <p>固定间隔更新进度条，避免过于频繁</p>
              </li>
            </ul>
          </div>
        </section>
      </main>
  

    </div>
  </template>
  
  <script>
  export default {
    name: 'DebounceThrottleDocs',
    methods: {
      // 滚动到指定章节
      scrollTo(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* 基础样式 */
  .debounce-throttle-docs {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  /* 头部样式 */
  .page-header {
    text-align: center;
    padding: 2rem 0;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 1rem;
  }
  
  .page-header h1 {
    font-size: 2.2rem;
    color: #2c3e50;
  }
  
  /* 导航样式 */
  .doc-nav {
    background-color: #f8f9fa;
    padding: 1rem 0;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    margin-bottom: 2rem;
  }
  
  .doc-nav ul {
    display: flex;
    list-style: none;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1.5rem;
    padding: 0;
    margin: 0;
  }
  
  .doc-nav li {
    cursor: pointer;
    color: #3498db;
    font-weight: 500;
    padding: 0.3rem 0.5rem;
    border-radius: 4px;
    transition: all 0.3s;
  }
  
  .doc-nav li:hover {
    background-color: #e3f2fd;
    color: #2980b9;
  }
  
  /* 内容区域样式 */
  .doc-content {
    padding-bottom: 3rem;
  }
  
  .doc-section {
    margin-bottom: 3rem;
    padding: 1.5rem;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }
  
  .doc-section h2 {
    color: #2c3e50;
    margin-top: 0;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #3498db;
  }
  
  .doc-section h3 {
    color: #34495e;
    margin-top: 1.5rem;
    margin-bottom: 0.8rem;
  }
  
  .section-content p {
    margin-bottom: 1rem;
  }
  
  /* 列表样式 */
  .scenario-list {
    margin: 0 0 1rem 1.5rem;
    padding: 0;
    list-style: none;
  }
  
  .scenario-list li {
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px dashed #eee;
  }
  
  .scenario-list li:last-child {
    border-bottom: none;
  }
  
  .scenario-list strong {
    color: #2c3e50;
    font-size: 1.05rem;
  }
  
  /* 代码块样式 */
  .code-block {
    background-color: #f8f9fa;
    border-radius: 6px;
    margin: 0.8rem 0 1.2rem;
    overflow-x: auto;
  }
  
  .code-block pre {
    font-family: 'Consolas', 'Monaco', monospace;
    font-size: 0.9rem;
    padding: 1rem;
    margin: 0;
    color: #333;
    line-height: 1.5;
  }
  
  code {
    font-family: 'Consolas', 'Monaco', monospace;
    background-color: #f1f1f1;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-size: 0.9rem;
  }
  
  /* 表格样式 */
  .comparison-table {
    overflow-x: auto;
    margin: 1rem 0;
  }
  
  .comparison-table table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;
  }
  
  .comparison-table th,
  .comparison-table td {
    padding: 0.8rem 1rem;
    text-align: left;
    border-bottom: 1px solid #e0e0e0;
  }
  
  .comparison-table th {
    background-color: #f8f9fa;
    font-weight: 600;
  }
  
  .comparison-table tr:hover {
    background-color: #f8f9fa;
  }
  
  /* 提示框样式 */
  .note {
    background-color: #e3f2fd;
    border-left: 4px solid #2196f3;
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 0 4px 4px 0;
  }

  
  /* 响应式样式 */
  @media (max-width: 768px) {
    .page-header h1 {
      font-size: 1.8rem;
    }
    
    .doc-nav ul {
      gap: 0.8rem;
    }
    
    .doc-section {
      padding: 1rem;
    }
  }
  </style>
  