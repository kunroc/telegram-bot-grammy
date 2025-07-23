# Telegram Bot

一个使用 Grammy 框架构建的 Telegram 机器人。

## 功能特性

- 🤖 基于 Grammy 框架
- 🔒 环境变量配置（安全）
- 🌐 代理支持
- 📝 模块化代码结构
- 🔧 开发模式支持
- ⚡ 热重载开发

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 文件为 `.env`：

```bash
cp .env.example .env
```

编辑 `.env` 文件，填入你的配置：

```env
# Telegram Bot Configuration
BOT_TOKEN=your_bot_token_here

# Proxy Configuration (optional)
PROXY_URL=http://127.0.0.1:10808
```

### 3. 获取 Bot Token

1. 在 Telegram 中找到 [@BotFather](https://t.me/botfather)
2. 发送 `/newbot` 命令
3. 按照提示创建你的机器人
4. 获取 Bot Token 并填入 `.env` 文件

### 4. 运行机器人

#### 开发模式（默认）

```bash
# 使用 .env 文件
npm start
```

#### 开发模式（热重载）

```bash
npm run dev
```

#### 生产模式

```bash
# 使用 .env.production 文件
npm run start:prod
```

或者手动设置环境变量：

```bash
# Windows (PowerShell)
$env:NODE_ENV="production"; npm start

# Linux/macOS
NODE_ENV=production npm start
```

## 可用命令

- `/start` - 开始使用机器人
- `/help` - 显示帮助信息

## 项目结构

```
src/
├── config/          # 配置管理
│   └── index.ts
├── bot/             # Bot 实例创建
│   └── index.ts
├── handlers/        # 消息和命令处理器
│   ├── commands.ts  # 命令处理
│   └── messages.ts  # 消息处理
└── index.ts         # 应用入口点
```

## 开发脚本

- `npm start` - 编译并启动机器人（开发环境）
- `npm run start:prod` - 编译并启动机器人（生产环境）
- `npm run dev` - 开发模式（热重载）
- `npm run build` - 仅编译 TypeScript
- `npm run clean` - 清理构建文件

## 环境变量

| 变量名 | 必需 | 描述 |
|--------|------|------|
| `BOT_TOKEN` | ✅ | Telegram Bot Token |
| `PROXY_URL` | ❌ | 代理服务器地址 |
| `NODE_ENV` | ❌ | 环境模式 (development/production) |

## 环境配置

### 配置文件说明

项目支持多环境配置，根据 `NODE_ENV` 环境变量自动加载对应的配置文件：

- **开发环境**：加载 `.env` 文件
- **生产环境**：加载 `.env.production` 文件

### 配置文件创建

1. **开发环境配置**：复制 `.env.example` 为 `.env`
2. **生产环境配置**：复制 `.env.example` 为 `.env.production`

### 环境切换

```bash
# 开发环境（默认）
npm start

# 生产环境
npm run start:prod
# 或
NODE_ENV=production npm start
```

详细的环境配置说明请参考：[环境配置文档](./docs/environment-config.md)

## 注意事项

- 请确保 `.env` 和 `.env.production` 文件不要提交到版本控制系统
- 生产环境配置应该单独管理，包含真实的生产环境密钥
- 如果使用代理，请确保代理服务器正常运行
- 开发模式下会显示更详细的日志信息

## 许可证

ISC