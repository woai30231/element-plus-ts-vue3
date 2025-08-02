<template>
    <div class="intro-con">
      <!-- 顶部装饰条 -->
      <!-- <div class="decor-bar"></div> -->
      
      <!-- 主体内容 -->
      <div class="main-content">
        <!-- 标题区 -->
        <div class="title-section">
          <h1>👋 你好，欢迎来到这里</h1>
          <p class="subtitle">在Web的世界里摸爬滚打的小强</p>
        </div>
        
        <!-- 关于我 -->
        <section class="about-me">
          <h2>📝 关于我的工作</h2>
          <p>
            从刚入行时对着控制台打印"Hello World"兴奋半天，到现在能独立扛住前端项目的开发与优化，
            我一直在和浏览器、代码、用户体验打交道。
          </p>
          <p>
            日常工作就是把产品经理的"一个小需求"变成用户眼前的交互界面，
            既要让页面长得好看，又要保证点击、滚动时丝般顺滑，偶尔还要和后端小伙伴battle接口格式😂
          </p>
        </section>
        
        <!-- 技术栈展示 -->
        <section class="tech-stack">
          <h2>💻 我的技术工具箱</h2>
          <div class="tech-grid">
            <!-- 核心技术 -->
            <div class="tech-card">
              <div class="tech-icon">🔤</div>
              <h3>基础三件套</h3>
              <p>HTML/CSS/JavaScript是每天打交道的老伙计，熟悉语义化标签、Flex/Grid布局，能玩转ES6+各种新特性</p>
            </div>
            
            <!-- TypeScript -->
            <div class="tech-card">
              <div class="tech-icon">🔵</div>
              <h3>TypeScript</h3>
              <p>从"anyScript"逐步进化到能用类型系统约束代码，享受编译时查错的安全感，再也不怕改代码时牵一发而动全身</p>
            </div>
            
            <!-- Vue生态 -->
            <div class="tech-card">
              <div class="tech-icon">🟢</div>
              <h3>Vue全家桶</h3>
              <p>从Vue2的Options API写到Vue3的Composition API，用Vue Router管理页面跳转，用Pinia存全局状态，算是重度Vue用户了</p>
            </div>
            
            <!-- 工程化 -->
            <div class="tech-card">
              <div class="tech-icon">🔧</div>
              <h3>工程化工具</h3>
              <p>熟练用Webpack打包项目，现在更爱Vite的快如闪电，配置过ESLint/Prettier规范代码，能用Git管理版本（偶尔会在merge时翻车）</p>
            </div>
          </div>
        </section>
        
        <!-- 个人感悟 -->
        <section class="personal-thought">
          <h2>❤️ 为什么喜欢前端</h2>
          <p>
            前端最吸引我的地方，就是"所见即所得"的成就感——敲几行代码，浏览器里立刻能看到效果，这种反馈太爽了！
          </p>
          <p>
            而且前端技术更新太快，每天都有新东西可学（也可能是新坑要踩），虽然偶尔会焦虑，但更多时候是保持新鲜感的快乐。
          </p>
          <p>
            如果你也对前端感兴趣，或者有技术问题想聊，欢迎在博客评论区找我聊天呀~
          </p>
        </section>
      </div>
      

    </div>
  </template>
  
  <script setup lang="ts">
  // 可自定义工作年限
  const workYears = 3; // 这里替换成你的实际工作年限
  </script>
  
  <style scoped lang="scss">
  .intro-con {
    max-width: 1100px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    color: #333;
    line-height: 1.8;
  }
  
  // 顶部装饰条
  .decor-bar {
    height: 6px;
    background: linear-gradient(90deg, #42b983, #3498db, #9b59b6);
    border-radius: 3px;
    margin-bottom: 30px;
  }
  
  // 标题区
  .title-section {
    text-align: center;
    margin-bottom: 40px;
    
    h1 {
      font-size: 2.2rem;
      margin: 0 0 10px;
      color: #2c3e50;
    }
    
    .subtitle {
      font-size: 1.1rem;
      color: #666;
      margin: 0;
      font-style: italic;
    }
  }
  
  // 通用 section 样式
  section {
    margin-bottom: 50px;
    padding: 25px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    
    h2 {
      margin-top: 0;
      font-size: 1.5rem;
      color: #2c3e50;
      display: flex;
      align-items: center;
      gap: 10px;
      
      &::before {
        content: '';
        display: inline-block;
        width: 4px;
        height: 24px;
        background: #42b983;
        border-radius: 2px;
      }
    }
    
    p {
      font-size: 1.05rem;
      color: #555;
      margin: 15px 0;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  
  // 技术栈网格
  .tech-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }
  
  .tech-card {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
    }
    
    .tech-icon {
      font-size: 2rem;
      margin-bottom: 10px;
    }
    
    h3 {
      margin: 0 0 10px;
      color: #3498db;
      font-size: 1.2rem;
    }
    
    p {
      font-size: 0.95rem;
      color: #666;
      margin: 0;
    }
  }
  

  
  // 响应式调整
  @media (max-width: 600px) {
    .title-section h1 {
      font-size: 1.8rem;
    }
    
    section {
      padding: 20px 15px;
    }
    
    .tech-grid {
      grid-template-columns: 1fr;
    }
  }
  </style>