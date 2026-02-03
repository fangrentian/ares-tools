# Tiny WebSocket and SSE Test Server

## 介绍
基于 Express 5 框架搭建的 SSE/WebSocket 实时消息推送测试服务，支持双向通信和广播功能。

## 功能特性

- 🚀 **双协议支持**：同时支持 Server-Sent Events (SSE) 和 WebSocket 协议
- 🔗 **实时推送**：支持单点推送和广播推送
- 📊 **连接管理**：内置客户端连接状态管理和统计
- 🛡️ **类型安全**：完整的 TypeScript 类型定义
- 📝 **统一响应**：标准化的 API 响应格式
- 🎯 **会话支持**：集成 Session 管理
- 📋 **日志记录**：完善的日志系统

## 安装

```bash
npm install ares-tiny-sse-ws
# 或
yarn add ares-tiny-sse-ws
# 或
pnpm add ares-tiny-sse-ws
```

## 环境配置文件'.env'
```env
#日志级别
LOG_LEVEL=info

#服务端口
PORT=3001

#log
LOG_DEFAULT_FILE=logs/report.log
LOG_ERROR_PATH=logs/error

#session
SESSION_SECRET=secret
```

## 快速开始

### 基础使用

```typescript
import { run } from 'ares-tiny-sse-ws'

// 启动服务，默认端口 3000
run()

// 指定端口启动
run(8080)
```

## API 接口

### SSE 接口

#### 连接 SSE
```http
GET /sse/connect
```

建立 SSE 连接，服务器会保持长连接并推送消息。

**客户端示例：**
```javascript
const eventSource = new EventSource('http://localhost:3000/sse/connect');

eventSource.onmessage = function(event) {
  console.log('收到消息:', event.data);
};

eventSource.onerror = function(err) {
  console.error('连接错误:', err);
};
```

### WebSocket 接口

#### 连接 WebSocket
```http
WS /ws/connect
```

建立 WebSocket 连接，支持双向通信。

**客户端示例：**
```javascript
const socket = new WebSocket('ws://localhost:3000/ws/connect');

socket.onopen = function(event) {
  console.log('WebSocket 连接已建立');
};

socket.onmessage = function(event) {
  console.log('收到消息:', event.data);
};

socket.onclose = function(event) {
  console.log('WebSocket 连接已关闭');
};

// 发送消息
socket.send('Hello Server');
```

### 消息推送接口

#### SSE 单点推送
```http
POST /push/sse
Content-Type: application/json

{
  "sessionId": "session-id",
  "data": "推送的内容"
}
```

#### SSE 广播推送
```http
POST /push/sse-broadcast
Content-Type: application/json

{
  "data": "广播给所有 SSE 客户端的消息"
}
```

#### WebSocket 单点推送
```http
POST /push/ws
Content-Type: application/json

{
  "sessionId": "session-id",
  "data": "推送的内容"
}
```

#### WebSocket 广播推送
```http
POST /push/ws-broadcast
Content-Type: application/json

{
  "data": "广播给所有 WebSocket 客户端的消息"
}
```
