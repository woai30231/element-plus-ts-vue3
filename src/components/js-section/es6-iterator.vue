<template>
    <div class="es6-iterable-docs">
      <!-- 页面头部 -->
      <header class="page-header">
        <h1 style="margin:0px;">ES6可遍历对象</h1>
      </header>
  
      <!-- 导航栏 -->
      <nav class="doc-nav">
        <ul>
          <li @click="scrollTo('definition')">基本概念</li>
          <li @click="scrollTo('protocol')">迭代协议</li>
          <li @click="scrollTo('built-in')">内置可遍历对象</li>
          <li @click="scrollTo('custom')">自定义可遍历对象</li>
          <li @click="scrollTo('usage')">使用场景</li>
        </ul>
      </nav>
  
      <!-- 主要内容 -->
      <main class="doc-content">
        <!-- 基本概念部分 -->
        <section id="definition" class="doc-section">
          <h2>基本概念</h2>
          <div class="section-content">
            <p>在ES6中，可遍历对象（Iterable Object）是指那些实现了可迭代协议的对象。这些对象可以被各种迭代机制处理，如for...of循环、扩展运算符等。</p>
            
            <p>可遍历对象的核心特征是拥有一个特殊的迭代器生成方法，通过这个方法可以创建一个迭代器来遍历对象中的数据。</p>
            
            <div class="note">
              可遍历对象的出现，统一了JavaScript中各种数据结构的遍历方式，使得不同数据结构可以使用相同的语法进行遍历操作。
            </div>
          </div>
        </section>
  
        <!-- 迭代协议部分 -->
        <section id="protocol" class="doc-section">
          <h2>迭代协议</h2>
          <div class="section-content">
            <p>ES6中定义了两个与迭代相关的协议：可迭代协议和迭代器协议。</p>
            
            <h3>可迭代协议</h3>
            <p>一个对象要成为可迭代对象，必须实现<code>[Symbol.iterator]</code>方法，该方法是一个无参数函数，返回一个符合迭代器协议的对象。</p>
            
            <div class="code-block">
              <pre>// 可迭代协议示例
  const iterableObj = {
    [Symbol.iterator]() {
      // 返回一个迭代器对象
      return {
        next() {
          // 实现迭代器协议
          return { value: '数据', done: false };
        }
      };
    }
  };</pre>
            </div>
            
            <h3>迭代器协议</h3>
            <p>迭代器协议定义了产生一系列值的标准方式。一个对象要成为迭代器，必须实现一个next()方法，该方法返回一个包含以下两个属性的对象：</p>
            
            <ul class="feature-list">
              <li><strong>value</strong>：当前迭代位置的值，可以是任何类型</li>
              <li><strong>done</strong>：布尔值，表示迭代是否结束。true表示迭代已结束，false表示还有更多值可供迭代</li>
            </ul>
            
            <div class="code-block">
              <pre>// 迭代器协议示例
  const iterator = {
    next() {
      if (/* 还有数据 */) {
        return { value: '当前值', done: false };
      } else {
        return { value: undefined, done: true };
      }
    }
  };</pre>
            </div>
            
            <p>此外，迭代器还可以选择性地实现return()和throw()方法：</p>
            <ul class="feature-list">
              <li><strong>return()</strong>：当迭代提前终止时调用（如break语句）</li>
              <li><strong>throw()</strong>：用于向迭代器抛出错误</li>
            </ul>
          </div>
        </section>
  
        <!-- 内置可遍历对象部分 -->
        <section id="built-in" class="doc-section">
          <h2>内置可遍历对象</h2>
          <div class="section-content">
            <p>ES6中许多内置对象默认实现了可迭代协议，因此可以直接使用迭代语法：</p>
            
            <ul class="built-in-list">
              <li>
                <strong>Array（数组）</strong>
                <div class="code-block">
                  <pre>const arr = [1, 2, 3];
  for (const item of arr) {
    console.log(item); // 1, 2, 3
  }</pre>
                </div>
              </li>
              <li>
                <strong>String（字符串）</strong>
                <div class="code-block">
                  <pre>const str = "hello";
  for (const char of str) {
    console.log(char); // 'h', 'e', 'l', 'l', 'o'
  }</pre>
                </div>
              </li>
              <li>
                <strong>Map</strong>
                <div class="code-block">
                  <pre>const map = new Map();
  map.set('name', '张三');
  map.set('age', 20);
  for (const [key, value] of map) {
    console.log(key, value); // 'name' '张三', 'age' 20
  }</pre>
                </div>
              </li>
              <li>
                <strong>Set</strong>
                <div class="code-block">
                  <pre>const set = new Set([1, 2, 3]);
  for (const item of set) {
    console.log(item); // 1, 2, 3
  }</pre>
                </div>
              </li>
              <li>
                <strong>其他</strong>：TypedArray、函数的arguments对象、NodeList对象等
              </li>
            </ul>
          </div>
        </section>
  
        <!-- 自定义可遍历对象部分 -->
        <section id="custom" class="doc-section">
          <h2>自定义可遍历对象</h2>
          <div class="section-content">
            <p>我们可以通过实现可迭代协议，将普通对象改造为可遍历对象。以下是创建自定义可遍历对象的步骤：</p>
            
            <ol class="steps-list">
              <li>为对象添加<code>[Symbol.iterator]</code>方法</li>
              <li>该方法返回一个迭代器对象</li>
              <li>迭代器对象必须包含next()方法</li>
              <li>next()方法返回包含value和done属性的对象</li>
            </ol>
            
            <h3>示例1：基本自定义可遍历对象</h3>
            <div class="code-block">
              <pre>// 自定义可遍历的用户对象
  const user = {
    name: '张三',
    hobbies: ['读书', '运动', '编程'],
    [Symbol.iterator]() {
      let index = 0;
      const hobbies = this.hobbies;
      return {
        next() {
          if (index < hobbies.length) {
            return {
              value: hobbies[index++],
              done: false
            };
          } else {
            return {
              value: undefined,
              done: true
            };
          }
        }
      };
    }
  };
  
  // 使用for...of遍历
  for (const hobby of user) {
    console.log(hobby); // '读书', '运动', '编程'
  }</pre>
            </div>
            
            <h3>示例2：可遍历的类</h3>
            <div class="code-block">
              <pre>// 创建一个可遍历的范围类
  class Range {
    constructor(start, end, step = 1) {
      this.start = start;
      this.end = end;
      this.step = step;
    }
    
    // 实现可迭代协议
    [Symbol.iterator]() {
      let current = this.start;
      const end = this.end;
      const step = this.step;
      
      return {
        next() {
          if (current <= end) {
            const value = current;
            current += step;
            return { value, done: false };
          }
          return { done: true };
        }
      };
    }
  }
  
  // 使用
  const range = new Range(1, 5);
  for (const num of range) {
    console.log(num); // 1, 2, 3, 4, 5
  }</pre>
            </div>
          </div>
        </section>
  
        <!-- 使用场景部分 -->
        <section id="usage" class="doc-section">
          <h2>可遍历对象的使用场景</h2>
          <div class="section-content">
            <p>实现了可迭代协议的对象可以在多种场景下使用：</p>
            
            <h3>1. for...of循环</h3>
            <div class="code-block">
              <pre>const arr = [1, 2, 3];
  for (const item of arr) {
    console.log(item);
  }</pre>
            </div>
            
            <h3>2. 扩展运算符(...) </h3>
            <div class="code-block">
              <pre>const range = new Range(1, 3);
  const arr = [...range]; // [1, 2, 3]</pre>
            </div>
            
            <h3>3. 解构赋值</h3>
            <div class="code-block">
              <pre>const [a, b, c] = new Range(10, 30, 10);
  console.log(a, b, c); // 10, 20, 30</pre>
            </div>
            
            <h3>4. Array.from()</h3>
            <div class="code-block">
              <pre>const iterable = {
    [Symbol.iterator]() {
      return {
        count: 0,
        next() {
          this.count++;
          return this.count <= 3 
            ? { value: this.count, done: false }
            : { done: true };
        }
      };
    }
  };
  
  const arr = Array.from(iterable);
  console.log(arr); // [1, 2, 3]</pre>
            </div>
            
            <h3>5. 作为某些集合的构造函数参数</h3>
            <div class="code-block">
              <pre>const set = new Set(new Range(1, 3));
  console.log(set); // Set {1, 2, 3}</pre>
            </div>
          </div>
        </section>
      </main>
  
    </div>
  </template>
  
  <script>
  export default {
    name: 'ES6IterableDocs',
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
  .es6-iterable-docs {
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
  .feature-list, .steps-list, .built-in-list {
    margin: 0 0 1rem 1.5rem;
    padding: 0;
  }
  
  .feature-list li, .steps-list li {
    margin-bottom: 0.5rem;
  }
  
  .steps-list {
    list-style-type: decimal;
  }
  
  .built-in-list {
    list-style: none;
  }
  
  .built-in-list li {
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px dashed #eee;
  }
  
  .built-in-list li:last-child {
    border-bottom: none;
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
  