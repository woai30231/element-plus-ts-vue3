<template>
    <div class="page-container">
      <!-- 页面头部 -->
      <header class="page-header">
        <h1>ES6 解构特性详解</h1>
        <p>简化数据提取的现代JavaScript语法</p>
      </header>
  
      <!-- 主要内容 -->
      <main class="main-content">
        <!-- 概念介绍 -->
        <section class="content-section">
          <h2>什么是解构？</h2>
          <p>
            解构是ES6（ECMAScript 2015）引入的一种新语法，允许我们从数组或对象中提取数据，并将提取的值赋值给变量，
            从而使代码更简洁、更易读。
          </p>
          <p>
            简单来说，解构就是"拆包"——把数组或对象中的数据"拆"出来，直接赋值给变量，而不必通过索引或属性名逐个访问。
          </p>
        </section>
  
        <!-- 数组解构 -->
        <section class="content-section">
          <h2>数组解构</h2>
          
          <div class="example-block">
            <h3>基本用法</h3>
            <p>从数组中提取提取元素并并并并赋值并并赋值并并赋值给变量：</p>
            <div class="code-block">
  <pre>// 传统方式
  const arr = [1, 2, 3];
  const a = arr[0];
  const b = arr[1];
  const c = arr[2];
  
  // 解构方式
  const [x, y, z] = [1, 2, 3];
  console.log(x); // 1
  console.log(y); // 2
  console.log(z); // 3</pre>
            </div>
          </div>
  
          <div class="example-block">
            <h3>跳过元素</h3>
            <p>可以通过空位置跳过不需要的元素：</p>
            <div class="code-block">
  <pre>const [a, , b] = [10, 20, 30];
  console.log(a); // 10
  console.log(b); // 30</pre>
            </div>
          </div>
  
          <div class="example-block">
            <h3>默认值</h3>
            <p>当提取的值不存在时，可以设置默认值：</p>
            <div class="code-block">
  <pre>// 当数组长度不足时
  const [a, b, c = 3] = [1, 2];
  console.log(c); // 3
  
  // 当提取的值为undefined时
  const [d = 10] = [undefined];
  console.log(d); // 10</pre>
            </div>
          </div>
  
          <div class="example-block">
            <h3>剩余元素</h3>
            <p>使用展开运算符<code>...rest</code>获取剩余元素：</p>
            <div class="code-block">
  <pre>const [a, ...rest] = [1, 2, 3, 4, 5];
  console.log(a); // 1
  console.log(rest); // [2, 3, 4, 5]</pre>
            </div>
          </div>
        </section>
  
        <!-- 对象解构 -->
        <section class="content-section">
          <h2>对象解构</h2>
          
          <div class="example-block">
            <h3>基本用法</h3>
            <p>从对象中提取属性并赋值给变量：</p>
            <div class="code-block">
  <pre>// 传统方式
  const obj = { name: '张三', age: 20 };
  const name = obj.name;
  const age = obj.age;
  
  // 解构方式
  const { name, age } = { name: '张三', age: 20 };
  console.log(name); // "张三"
  console.log(age); // 20</pre>
            </div>
          </div>
  
          <div class="example-block">
            <h3>重命名变量</h3>
            <p>可以为提取的属性指定不同的变量名：</p>
            <div class="code-block">
  <pre>const person = { name: '李四', age: 25 };
  // 将name属性提取到变量username中
  const { name: username, age } = person;
  console.log(username); // "李四"
  console.log(age); // 25</pre>
            </div>
          </div>
  
          <div class="example-block">
            <h3>默认值</h3>
            <p>当对象中没有对应的属性时，可以设置默认值：</p>
            <div class="code-block">
  <pre>const { name = '默认名称', age = 18 } = { name: '王五' };
  console.log(name); // "王五"
  console.log(age); // 18</pre>
            </div>
          </div>
  
          <div class="example-block">
            <h3>嵌套对象解构</h3>
            <p>可以解构嵌套的对象：</p>
            <div class="code-block">
  <pre>const user = {
    name: '赵六',
    info: {
      address: '北京',
      phone: '123456789'
    }
  };
  
  // 解构嵌套对象
  const { 
    name, 
    info: { address, phone } 
  } = user;
  
  console.log(name); // "赵六"
  console.log(address); // "北京"
  console.log(phone); // "123456789"</pre>
            </div>
          </div>
        </section>
  
        <!-- 其他常见用法 -->
        <section class="content-section">
          <h2>其他常见用法</h2>
          
          <div class="example-block">
            <h3>函数参数解构</h3>
            <p>在函数参数中使用解构，使代码更简洁：</p>
            <div class="code-block">
  <pre>// 传统方式
  function printUser(user) {
    console.log(user.name, user.age);
  }
  
  // 解构方式
  function printUser({ name, age }) {
    console.log(name, age);
  }
  
  // 带默认值的函数参数解构
  function printUser({ name = '匿名', age = 0 } = {}) {
    console.log(name, age);
  }
  
  printUser({ name: '孙七', age: 30 }); // 孙七 30</pre>
            </div>
          </div>
  
          <div class="example-block">
            <h3>字符串解构</h3>
            <p>字符串也可以进行解构， treated as类数组对象：</p>
            <div class="code-block">
  <pre>const [a, b, c, d] = 'hello';
  console.log(a); // "h"
  console.log(b); // "e"
  console.log(c); // "l"
  console.log(d); // "l"</pre>
            </div>
          </div>
  
          <div class="example-block">
            <h3>交换变量值</h3>
            <p>使用解构可以更简洁地交换变量值：</p>
            <div class="code-block">
  <pre>// 传统方式
  let x = 1, y = 2;
  let temp = x;
  x = y;
  y = temp;
  
  // 解构方式
  let x = 1, y = 2;
  [x, y] = [y, x];
  console.log(x); // 2
  console.log(y); // 1</pre>
            </div>
          </div>
        </section>
  
        <!-- 总结 -->
        <section class="content-section summary-section">
          <h2>总结</h2>
          <ul>
            <li>解构是ES6中非常实用的特性，可以简化数据提取过程</li>
            <li>数组解构按位置提取元素，对象解构按属性名提取</li>
            <li>支持默认值、重命名、嵌套解构等高级用法</li>
            <li>在函数参数、变量交换等场景中特别有用</li>
            <li>合理使用解构可以使代码更简洁、更易读</li>
          </ul>
        </section>
      </main>
  
      <!-- 页脚 -->
      <footer class="page-footer">
        <p>ES6解构特性介绍 &copy; 2023</p>
      </footer>
    </div>
  </template>
  
  <script setup lang="ts">
  // 组件逻辑，这里不需要额外逻辑
  </script>
  
  <style scoped>
  /* 基础样式 */
  .page-container {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 20px;
    /* background-color: #f9f9f9; */
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  /* 头部样式 */
  .page-header {
    text-align: center;
    padding: 40px 0;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 30px;
  }
  
  .page-header h1 {
    margin: 0 0 10px 0;
    color: #2c3e50;
    font-size: 2.2rem;
  }
  
  .page-header p {
    margin: 0;
    color: #7f8c8d;
    font-size: 1.1rem;
  }
  
  /* 主要内容样式 */
  .main-content {
    flex: 1;
  }
  
  /* 内容区块样式 */
  .content-section {
    background-color: white;
    border-radius: 8px;
    padding: 25px;
    margin-bottom: 30px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .content-section h2 {
    color: #2980b9;
    margin-top: 0;
    border-bottom: 2px solid #f1f1f1;
    padding-bottom: 10px;
  }
  
  /* 示例区块样式 */
  .example-block {
    margin-bottom: 25px;
    padding-left: 10px;
    border-left: 3px solid #3498db;
  }
  
  .example-block h3 {
    color: #34495e;
    margin-bottom: 10px;
  }
  
  /* 代码块样式 */
  .code-block {
    background-color: #2c3e50;
    color: #ecf0f1;
    padding: 15px;
    border-radius: 6px;
    overflow-x: auto;
    font-family: 'Consolas', 'Monaco', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
  }
  
  /* 总结部分样式 */
  .summary-section ul {
    padding-left: 20px;
  }
  
  .summary-section li {
    margin-bottom: 8px;
  }
  
  /* 页脚样式 */
  .page-footer {
    text-align: center;
    padding: 20px 0;
    margin-top: 40px;
    color: #7f8c8d;
    border-top: 1px solid #e0e0e0;
  }
  
  /* 响应式调整 */
  @media (max-width: 768px) {
    .page-header h1 {
      font-size: 1.8rem;
    }
    
    .content-section {
      padding: 15px;
    }
  }
  </style>
      