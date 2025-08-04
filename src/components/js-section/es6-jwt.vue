<template>
    <div class="jwt-doc">
      <header>
        <h1>JWT 认证机制详解</h1>
        <p class="intro">基于 JSON 的轻量级身份认证方案</p>
      </header>
  
      <section class="principle">
        <h2>一、JWT 实现原理</h2>
        <p>JWT（JSON Web Token）由三部分组成，通过 <code>.</code> 连接，结构为：<strong>Header.Payload.Signature</strong></p>
        
        <div class="structure">
          <div class="part">
            <h3>1. Header（头部）</h3>
            <p>声明算法和令牌类型，经 Base64Url 编码</p>
            <pre class="code-block">{
    "alg": "RS256",  // 签名算法（HMAC/ RSA等）
    "typ": "JWT"     // 令牌类型
  }</pre>
          </div>
          
          <div class="part">
            <h3>2. Payload（负载）</h3>
            <p>存储用户信息（非敏感数据），经 Base64Url 编码（<span class="warning">注意：仅编码未加密！</span>）</p>
            <pre class="code-block">{
    "sub": "123456",  // 主题（用户ID）
    "name": "张三",   // 自定义字段
    "role": "user",   // 权限角色
    "exp": 1689000000 // 过期时间（时间戳）
  }</pre>
          </div>
          
          <div class="part">
            <h3>3. Signature（签名）</h3>
            <p>通过密钥对前两部分加密生成，用于验证令牌有效性</p>
            <pre class="code-block">// 伪代码
  signature = 加密算法(
    Base64Url(Header) + "." + Base64Url(Payload),
    服务器私钥
  )</pre>
          </div>
        </div>
        
        <p class="flow-title">完整认证流程：</p>
        <ol class="flow">
          <li>用户登录 → 服务器验证通过 → 生成 JWT 并返回</li>
          <li>客户端存储 JWT（localStorage/ Cookie）</li>
          <li>后续请求携带 JWT（如：Authorization: Bearer &lt;token&gt;）</li>
          <li>服务器验证 JWT 签名 → 解析用户信息 → 授权访问</li>
        </ol>
      </section>
  
      <section class="scenario">
        <h2>二、使用场景与优劣势</h2>
        <div class="scenario-content">
          <div class="scenario-item">
            <h3>适用场景</h3>
            <ul>
              <li>前后端分离项目（SPA）的身份认证</li>
              <li>微服务架构中的跨服务身份传递</li>
              <li>第三方登录授权（如 OAuth 2.0 流程）</li>
            </ul>
          </div>
          
          <div class="scenario-item">
            <h3>优势</h3>
            <ul>
              <li>无状态：服务器无需存储会话，便于集群扩展</li>
              <li>自包含：令牌包含用户信息，减少数据库查询</li>
              <li>跨域支持：可在不同域名间安全传递</li>
            </ul>
          </div>
          
          <div class="scenario-item">
            <h3>劣势</h3>
            <ul>
              <li>无法主动撤销：令牌颁发后在有效期内始终有效</li>
              <li>Payload 可解码：不能存储敏感信息（如密码）</li>
              <li>令牌体积可能过大：影响传输效率</li>
            </ul>
          </div>
        </div>
      </section>
  
      <section class="security-warning">
        <h2>三、重要安全提示</h2>
        <div class="warning-box">
          <p><strong>⚠️ JWT 只保证认证安全，不保证传输数据安全！</strong></p>
          <p>原因：</p>
          <ul>
            <li>Header 和 Payload 仅通过 Base64Url 编码（可逆转换），任何人都能解码查看内容</li>
            <li>Signature 仅确保数据未被篡改，但无法防止数据被窃取</li>
          </ul>
          <p>解决方案：</p>
          <ul>
            <li>传输敏感数据必须使用 HTTPS 加密通道</li>
            <li>Payload 中禁止存放密码、令牌等敏感信息</li>
          </ul>
        </div>
      </section>
  
      <section class="code-example">
        <h2>四、Node.js 后端关键代码示例</h2>
        <div class="code-tabs">
          <div class="code-tab">
            <h3>1. 生成 JWT（登录接口）</h3>
            <pre class="code-block">const jwt = require('jsonwebtoken');
  const fs = require('fs');
  const express = require('express');
  const app = express();
  
  // 解析JSON请求体
  app.use(express.json());
  
  // 读取私钥（用于签名）
  const privateKey = fs.readFileSync('./private.key', 'utf8');
  
  // 登录接口
  app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // 1. 验证用户名密码（实际项目需查询数据库）
    if (username === 'admin' && password === '123456') {
      // 2. 生成 JWT
      const token = jwt.sign(
        { 
          userId: 1, 
          username: 'admin', 
          role: 'admin'  // 权限信息
        },
        privateKey,
        { 
          algorithm: 'RS256',  // 使用 RSA 算法
          expiresIn: '1h'     // 1小时后过期
        }
      );
      
      res.json({ token });
    } else {
      res.status(401).json({ message: '账号密码错误' });
    }
  });</pre>
          </div>
          
          <div class="code-tab">
            <h3>2. 验证 JWT（中间件）</h3>
            <pre class="code-block">// 读取公钥（用于验证）
  const publicKey = fs.readFileSync('./public.key', 'utf8');
  
  // JWT 验证中间件
  const authMiddleware = (req, res, next) => {
    // 1. 获取请求头中的 token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: '未提供令牌' });
    }
    const token = authHeader.split(' ')[1];
    
    try {
      // 2. 验证 token 并解析用户信息
      const decoded = jwt.verify(token, publicKey, {
        algorithms: ['RS256']  // 强制指定算法（防攻击）
      });
      
      // 3. 将用户信息挂载到请求对象
      req.user = decoded;
      next(); // 验证通过，进入接口处理
    } catch (err) {
      res.status(403).json({ message: '令牌无效或已过期' });
    }
  };
  
  // 使用中间件保护接口
  app.get('/admin/data', authMiddleware, (req, res) => {
    // 从 req.user 中获取用户信息
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: '权限不足' });
    }
    res.json({ data: '管理员专属数据' });
  });
  
  // 启动服务器
  app.listen(3000, () => {
    console.log('服务器运行在 http://localhost:3000');
  });</pre>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'JwtDocumentation',
    mounted() {
      // 确保文档正确编码
      document.documentElement.setAttribute('lang', 'zh-CN');
    }
  };
  </script>
  
  <style scoped>
  .jwt-doc {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: "Helvetica Neue", Arial, sans-serif;
    line-height: 1.6;
    color: #333;
  }
  
  header {
    text-align: center;
    margin-bottom: 40px;
    padding-bottom: 20px;
    border-bottom: 2px solid #eee;
  }
  
  h1 {
    color: #2c3e50;
    margin-bottom: 10px;
    font-size: 2.2rem;
  }
  
  h2 {
    color: #34495e;
    margin: 30px 0 15px;
    padding-bottom: 8px;
    border-bottom: 1px solid #ddd;
    font-size: 1.6rem;
  }
  
  h3 {
    color: #2980b9;
    margin: 20px 0 10px;
    font-size: 1.3rem;
  }
  
  .intro {
    color: #7f8c8d;
    font-size: 1.1rem;
  }
  
  .structure {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin: 20px 0;
  }
  
  .part {
    flex: 1;
    min-width: 300px;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 6px;
    border: 1px solid #e9ecef;
  }
  
  .code-block {
    background: #2d2d2d;
    color: #a9b7c6;
    padding: 15px;
    border-radius: 4px;
    overflow-x: auto;
    font-family: "Consolas", monospace;
    font-size: 0.9rem;
    line-height: 1.5;
  }
  
  .flow {
    padding-left: 20px;
    margin: 15px 0;
  }
  
  .flow-title {
    font-weight: bold;
    margin-top: 20px;
  }
  
  .scenario-content {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .scenario-item {
    flex: 1;
    min-width: 250px;
  }
  
  .scenario-item ul {
    padding-left: 20px;
  }
  
  .scenario-item li {
    margin: 8px 0;
  }
  
  .security-warning {
    margin: 30px 0;
  }
  
  .warning-box {
    background: #fff3cd;
    border: 1px solid #ffeeba;
    border-radius: 6px;
    padding: 15px;
  }
  
  .warning {
    color: #d35400;
    font-weight: bold;
  }
  
  .code-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 20px;
  }
  
  .code-tab {
    flex: 1;
    min-width: 500px;
  }
  
  /* 列表样式修正 */
  ul {
    list-style-type: disc;
    padding-left: 25px;
  }
  
  ol {
    list-style-type: decimal;
    padding-left: 25px;
  }
  
  code {
    background: #f1f1f1;
    padding: 2px 5px;
    border-radius: 3px;
    font-family: "Consolas", monospace;
  }
  </style>
  