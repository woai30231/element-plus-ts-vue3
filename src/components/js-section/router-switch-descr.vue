<template>
    <div class="doc-container">
  
      <main class="doc-content">
        <!-- 简介 -->
        <section class="doc-section">
          <h2>什么是路由切换动画？</h2>
          <p>
            路由切换动画是指在 Vue 应用中切换页面（路由）时，通过平滑的过渡效果增强用户体验的方式。
            结合 <code>&lt;transition&gt;</code>、<code>&lt;keep-alive&gt;</code> 和 <code>&lt;router-view&gt;</code> 
            三个组件，我们可以实现既美观又高效的路由切换效果。
          </p>
          <p>本文档将基于一个完整示例，详细讲解实现方法。</p>
        </section>
  
        <!-- 完整示例 -->
        <section class="doc-section">
          <h2>完整实现示例</h2>
          <p>下面是一个可以直接使用的完整实现，包含了路由过渡动画和组件缓存功能：</p>
          
          <div class="code-block">
            <pre><code>&lt;template&gt;
    &lt;!-- 路由视图通过插槽传递当前组件和路由信息 --&gt;
    &lt;router-view v-slot="{ Component, route }"&gt;
      &lt;!-- 过渡动画容器 --&gt;
      &lt;transition :name="transitionName"&gt;
        &lt;!-- 组件缓存容器 --&gt;
        &lt;keep-alive :include="keepAliveRoutes"&gt;
          &lt;!-- 动态渲染当前路由组件 --&gt;
          &lt;component 
            :is="Component" 
            :key="route.fullPath" 
          /&gt;
        &lt;/keep-alive&gt;
      &lt;/transition&gt;
    &lt;/router-view&gt;
  &lt;/template&gt;
  
  &lt;script setup&gt;
  import { ref, watch } from 'vue'
  import { useRoute } from 'vue-router'
  
  // 定义需要缓存的路由名称（对应路由配置中的name属性）
  const keepAliveRoutes = ['Home', 'About']
  
  // 过渡动画名称
  const transitionName = ref('fade')
  const route = useRoute()
  
  // 根据路由切换方向动态改变过渡效果
  watch(
    () =&gt; route.path,
    (_toPath, fromPath) =&gt; {
      // 根据路由来自哪里判断方向
      const fromDepth = fromPath.includes("switch2");
      
      transitionName.value = fromDepth ? 'slide-left' : 'slide-right'
    }
  )
  &lt;/script&gt;
  
  &lt;style&gt;
  /* 基础淡入淡出效果 */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  
  /* 左右滑动效果 */
  .slide-left-enter-active,
  .slide-left-leave-active,
  .slide-right-enter-active,
  .slide-right-leave-active {
    position: absolute;
    width: 100%;
    transition: transform 0.3s ease;
  }
  
  /* 向左滑动 */
  .slide-left-enter-from {
    transform: translateX(100%);
  }
  .slide-left-leave-to {
    transform: translateX(-100%);
  }
  
  /* 向右滑动 */
  .slide-right-enter-from {
    transform: translateX(-100%);
  }
  .slide-right-leave-to {
    transform: translateX(100%);
  }
  &lt;/style&gt;</code></pre>
          </div>
        </section>
  
        <!-- 核心部分解析 -->
        <section class="doc-section">
          <h2>核心部分解析</h2>
          
          <div class="section-item">
            <h3>1. 模板结构</h3>
            <p>模板部分是实现功能的核心，包含三个关键组件的嵌套关系：</p>
            
            <div class="code-block small">
              <pre><code>&lt;!-- 路由视图通过插槽传递组件和路由信息 --&gt;
  &lt;router-view v-slot="{ Component, route }"&gt;
    &lt;!-- 过渡动画容器 --&gt;
    &lt;transition :name="transitionName"&gt;
      &lt;!-- 组件缓存容器 --&gt;
      &lt;keep-alive :include="keepAliveRoutes"&gt;
        &lt;!-- 动态渲染当前路由组件 --&gt;
        &lt;component 
          :is="Component" 
          :key="route.fullPath" 
        /&gt;
      &lt;/keep-alive&gt;
    &lt;/transition&gt;
  &lt;/router-view&gt;</code></pre>
            </div>
            
            <p>各部分作用：</p>
            <ul>
              <li><code>&lt;router-view&gt;</code>：提供路由匹配的组件（Component）和路由信息（route）</li>
              <li><code>&lt;transition&gt;</code>：提供动画效果，通过 <code>:name</code> 动态切换动画类型</li>
              <li><code>&lt;keep-alive&gt;</code>：缓存指定组件，通过 <code>:include</code> 控制需要缓存的组件</li>
              <li><code>&lt;component&gt;</code>：动态渲染当前路由对应的组件</li>
            </ul>
          </div>
          
          <div class="section-item">
            <h3>2. 脚本逻辑</h3>
            <p>脚本部分主要处理动画类型的动态切换和缓存配置：</p>
            
            <div class="code-block small">
              <pre><code>import { ref, watch } from 'vue'
  import { useRoute } from 'vue-router'
  
  // 定义需要缓存的路由名称
  const keepAliveRoutes = ['Home', 'About']
  
  // 过渡动画名称
  const transitionName = ref('fade')
  const route = useRoute()
  
  // 根据路由切换方向动态改变过渡效果
  watch(
    () =&gt; route.path,
    (toPath, fromPath) =&gt; {
      // 根据路由层级判断方向
      const toDepth = toPath.split('/').length
      const fromDepth = fromPath.split('/').length
      
      transitionName.value = toDepth &gt; fromDepth ? 'slide-left' : 'slide-right'
    }
  )</code></pre>
            </div>
            
            <p>核心逻辑：</p>
            <ul>
              <li><code>keepAliveRoutes</code>：数组中定义需要缓存的组件名称（对应路由配置的 name 属性）</li>
              <li><code>transitionName</code>：用于动态切换动画类型的响应式变量</li>
              <li>watch 监听器：根据路由路径的层级变化（深度）判断导航方向，动态改变动画类型</li>
            </ul>
          </div>
          
          <div class="section-item">
            <h3>3. 样式定义</h3>
            <p>样式部分定义了两种动画效果：淡入淡出和左右滑动：</p>
            
            <div class="code-block small">
              <pre><code>/* 基础淡入淡出效果 */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  
  /* 左右滑动效果 */
  .slide-left-enter-active,
  .slide-left-leave-active,
  .slide-right-enter-active,
  .slide-right-leave-active {
    position: absolute;
    width: 100%;
    transition: transform 0.3s ease;
  }</code></pre>
            </div>
            
            <p>Vue 过渡类名说明：</p>
            <ul>
              <li><code>xxx-enter-from</code>：进入动画的起始状态</li>
              <li><code>xxx-enter-active</code>：进入动画的过程状态</li>
              <li><code>xxx-leave-to</code>：离开动画的结束状态</li>
              <li><code>xxx-leave-active</code>：离开动画的过程状态</li>
            </ul>
          </div>
        </section>
  
        <!-- 路由配置 -->
        <section class="doc-section">
          <h2>配套路由配置</h2>
          <p>为了使上述代码正常工作，需要配合正确的路由配置（router/index.js）：</p>
          
          <div class="code-block">
            <pre><code>// router/index.js
  import { createRouter, createWebHistory } from 'vue-router'
  import Home from '../views/Home.vue'
  import About from '../views/About.vue'
  
  const routes = [
    {
      path: '/',
      name: 'Home', // 需与keepAliveRoutes中的名称一致
      component: Home
    },
    {
      path: '/about',
      name: 'About', // 需与keepAliveRoutes中的名称一致
      component: About
    },
    {
      path: '/detail/:id',
      name: 'Detail', // 这个组件不会被缓存（未在keepAliveRoutes中）
      component: () =&gt; import('../views/Detail.vue')
    }
  ]
  
  const router = createRouter({
    history: createWebHistory(),
    routes
  })
  
  export default router</code></pre>
          </div>
          
          <p>注意事项：</p>
          <ul>
            <li>路由配置中的 <code>name</code> 属性需要与 <code>keepAliveRoutes</code> 中的名称对应才能被缓存</li>
            <li>可以通过动态导入（<code>() => import()</code>）实现组件的懒加载</li>
          </ul>
        </section>
  
        <!-- 实现效果说明 -->
        <section class="doc-section">
          <h2>实现效果说明</h2>
          
          <div class="effect-item">
            <h3>动态动画方向</h3>
            <p>根据路由层级自动切换动画方向：</p>
            <ul>
              <li>进入更深层级的路由（如从 <code>/</code> 到 <code>/about</code>）时，使用向左滑动动画</li>
              <li>返回上一层级的路由（如从 <code>/about</code> 到 <code>/</code>）时，使用向右滑动动画</li>
              <li>首次加载时使用淡入淡出动画</li>
            </ul>
          </div>
          
          <div class="effect-item">
            <h3>组件缓存效果</h3>
            <p>在 <code>keepAliveRoutes</code> 中定义的组件（Home、About）会被缓存：</p>
            <ul>
              <li>切换路由后返回时，组件状态会被保留（如表单输入内容、滚动位置）</li>
              <li>不会重新执行组件的 <code>onMounted</code> 等生命周期钩子</li>
              <li>未在列表中的组件（如 Detail）不会被缓存，每次访问都会重新创建</li>
            </ul>
          </div>
        </section>
  
        <!-- 使用说明 -->
        <section class="doc-section">
          <h2>如何使用</h2>
          <ol class="steps">
            <li>将示例代码保存为一个 Vue 组件（如 <code>App.vue</code> 或专门的 <code>RouteTransition.vue</code>）</li>
            <li>确保你的路由配置正确，并包含 <code>name</code> 属性</li>
            <li>根据需要修改 <code>keepAliveRoutes</code> 数组，指定需要缓存的组件</li>
            <li>调整动画样式（过渡时间、动画效果）以匹配你的应用风格</li>
            <li>如果需要，可以修改路由深度判断逻辑，以适应你的路由结构</li>
          </ol>
        </section>
      </main>
  
    </div>
  </template>
  
  <script setup>
  // 文档展示组件，无额外逻辑
  </script>
  
  <style>
  /* 基础样式 */
 
  
  .doc-container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 20px;
  }
  

  /* 内容区域 */
  .doc-content {
    padding-bottom: 60px;
  }
  
  .doc-section {
    margin-bottom: 50px;
  }
  
  .doc-section h2 {
    font-size: 1.6rem;
    color: #2c5282;
    margin-bottom: 20px;
    padding-bottom: 8px;
    border-bottom: 2px solid #4299e1;
  }
  
  .doc-section h3 {
    font-size: 1.3rem;
    color: #2b6cb0;
    margin: 25px 0 15px;
  }
  
  .doc-section p {
    margin-bottom: 15px;
    font-size: 1rem;
  }
  
  .doc-section ul, .doc-section ol {
    margin: 0 0 20px 30px;
  }
  
  .doc-section li {
    margin-bottom: 8px;
  }
  
  /* 代码块样式 */
  .code-block {
    background-color: #2d3748;
    border-radius: 6px;
    margin: 15px 0;
    overflow: hidden;
  }
  
  .code-block.small {
    margin: 10px 0;
  }
  
  .code-block pre {
    overflow-x: auto;
    padding: 0;
    margin: 0;
  }
  
  .code-block code {
    display: block;
    padding: 16px;
    color: #e2e8f0;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
  }
  
  /* 步骤列表 */
  .steps {
    list-style-type: decimal;
    margin-left: 30px;
  }
  
  .steps li {
    margin-bottom: 12px;
    padding-left: 5px;
  }
  
  /* 项目样式 */
  .section-item, .effect-item {
    background: white;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 25px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  
 
  
  /* 响应式调整 */
  @media (max-width: 768px) {
    .doc-header h1 {
      font-size: 1.8rem;
    }
    
    .doc-section h2 {
      font-size: 1.4rem;
    }
    
    .code-block code {
      font-size: 0.85rem;
    }
  }
  </style>
  