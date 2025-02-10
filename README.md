# 多多猫娘模拟器 - DeepSeek AI 驱动项目

![TypeScript](https://img.shields.io/badge/TypeScript-4.5.5-blue)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green)

## 🌟 项目简介
基于DeepSeek大语言模型的智能猫娘对话模拟器，使用Node.js + TypeScript构建，提供拟人化交互体验。项目通过深度集成DeepSeek的API能力，实现高度可定制的角色扮演对话功能。

🔗 **项目地址**  
[https://github.com/Dddddduo/Catgirl_DeepSeek_frontend](https://github.com/Dddddduo/Catgirl_DeepSeek_frontend)

## 🚀 功能特性
- 🐾 猫娘人格模拟（包含颜文字表情）
- 🌡️ 可调节的对话温度参数（0.1-2.0）
- 🔄 JSON标准化输入输出
- 🔒 API安全配置
- 📊 请求日志追踪
- ⚡ 单例模式API客户端

## 📦 快速开始

### 前置条件
- Node.js 18+
- DeepSeek API Key

### 安装步骤
```bash
# 克隆仓库
git clone https://github.com/Dddddduo/Catgirl_DeepSeek_frontend.git

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env
```

### 配置参数（.env）
```env
DEEPSEEK_BASE_URL=https://api.deepseek.com/v1
DEEPSEEK_API_KEY=your_api_key_here
DEFAULT_TEMPERATURE=1.3
```

### 基础用法示例
```typescript
import OpenAIService from './service/openai';

// 初始化配置
OpenAIService.config(
  process.env.DEEPSEEK_BASE_URL,
  process.env.DEEPSEEK_API_KEY
);

// 发起对话
const response = await OpenAIService.chat({
  text: "今天天气真好呀~"
});

console.log(`🐱 多多说：${response.result}`);
// 示例输出：今天天气超棒呢！(≧◡≦) ♪ 要不要一起出去晒太阳呀~ 
```

## 🛠️ 核心实现

### 系统架构
```
src/
├── service/
│   └── openai.ts      # API服务层
├── types/
│   └── chat.d.ts      # 类型定义
└── index.ts           # 入口文件
```

### 关键技术点
1. **单例模式客户端**
```typescript
private static instance: OpenAI | null = null;
```
- 确保全局唯一API实例
- 避免重复创建连接
- 统一错误处理机制

2. **动态行为配置**  
   通过system prompt实现角色设定：
```typescript
{
  role: 'system',
  content: '你是一只叫多多的猫娘，使用可爱语气和颜文字，保持JSON响应格式'
}
```

3. **可调参数化**  
   支持通过环境变量动态配置：
- 温度参数（temperature）
- 响应格式（response_format）
- 模型版本（model）

## 🌐 API 文档

### 方法说明
| 方法          | 参数                   | 返回值               | 描述               |
|---------------|------------------------|----------------------|--------------------|
| config()      | baseURL, apiKey        | void                 | 初始化API客户端    |
| chat()        | { text: string }       | Promise<ChatResponse>| 发起对话请求       |

### 错误代码
| 错误码               | 说明                  |
|----------------------|----------------------|
| CHAT_OPENAI_ERROR    | API通信异常          |
| CONFIG_INVALID_ERROR | 配置参数错误         |

## 🤝 贡献指南
欢迎通过以下方式参与贡献：
1. 提交issue报告问题
2. Fork仓库并提交PR
3. 扩展角色设定集
4. 添加单元测试

## 📄 许可协议
本项目采用 [MIT License](LICENSE)

---

> 💡 **提示**：请合理设置temperature参数（建议1.0-1.5），过高的值可能导致回复不稳定。通过修改system prompt可以创建不同性格的AI角色哦~ (✧ω✧)
