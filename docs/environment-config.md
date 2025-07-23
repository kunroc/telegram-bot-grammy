# 环境配置说明

## 概述

本项目支持根据运行环境动态加载不同的环境变量配置文件，实现开发环境和生产环境的配置分离。

## 配置文件结构

```
项目根目录/
├── .env                 # 开发环境配置（默认）
├── .env.production      # 生产环境配置
├── .env.example         # 配置模板文件
└── src/config/index.ts  # 配置加载逻辑
```

## 配置加载机制

在 `src/config/index.ts` 中，使用以下逻辑动态加载配置：

```typescript
dotenv.config({
  path: process.env.NODE_ENV === 'production' 
    ? '.env.production'  // 生产环境加载 .env.production
    : '.env'            // 开发环境加载 .env
});
```

## 使用方法

### 1. 开发环境（默认）

```bash
# 使用 .env 文件
npm start
# 或
npm run dev
```

### 2. 生产环境

#### 方法一：使用预定义脚本
```bash
# 使用 .env.production 文件
npm run start:prod
```

#### 方法二：手动设置环境变量
```bash
# Windows (PowerShell)
$env:NODE_ENV="production"; npm start

# Windows (CMD)
set NODE_ENV=production && npm start

# Linux/macOS
NODE_ENV=production npm start
```

### 3. 自定义环境

你也可以创建其他环境的配置文件：

```bash
# 创建测试环境配置
.env.test

# 修改配置加载逻辑支持更多环境
dotenv.config({
  path: process.env.NODE_ENV === 'production' 
    ? '.env.production'
    : process.env.NODE_ENV === 'test'
    ? '.env.test'
    : '.env'
});
```

## 配置文件内容

### .env（开发环境）
```env
# Telegram Bot Configuration
BOT_TOKEN=your_development_bot_token

# Proxy Configuration (optional)
PROXY_URL=http://127.0.0.1:10808

# Development specific settings
NODE_ENV=development
```

### .env.production（生产环境）
```env
# Telegram Bot Configuration
BOT_TOKEN=your_production_bot_token

# Proxy Configuration (optional)
# PROXY_URL=http://your-production-proxy:port

# Production specific settings
NODE_ENV=production
```

## 环境变量说明

| 变量名 | 必需 | 描述 | 示例 |
|--------|------|------|------|
| `BOT_TOKEN` | ✅ | Telegram Bot Token | `123456789:ABCdefGHIjklMNOpqrSTUvwxYZ` |
| `PROXY_URL` | ❌ | 代理服务器地址 | `http://127.0.0.1:10808` |
| `NODE_ENV` | ❌ | 运行环境 | `development`, `production`, `test` |

## 安全注意事项

1. **永远不要提交包含真实密钥的 .env 文件到版本控制系统**
2. **生产环境的配置文件应该单独管理，不要包含在代码仓库中**
3. **使用 .env.example 作为配置模板，供团队成员参考**
4. **确保 .gitignore 文件包含所有 .env* 文件**

## 验证配置

启动应用时，配置模块会自动验证必需的环境变量：

```typescript
const BOT_TOKEN = process.env.BOT_TOKEN;
if (!BOT_TOKEN) {
  console.error("错误: BOT_TOKEN 环境变量未设置");
  process.exit(1);
}
```

如果缺少必需的配置，应用会显示错误信息并退出。

## 调试配置

在开发模式下，可以查看当前加载的配置：

```typescript
if (config.isDevelopment) {
  console.log("当前配置:", {
    environment: process.env.NODE_ENV || 'development',
    hasProxy: !!config.proxyUrl,
    proxyUrl: config.proxyUrl ? "[已配置]" : "[未配置]"
  });
}
```