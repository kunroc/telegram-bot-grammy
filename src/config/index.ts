import * as dotenv from "dotenv";

// 加载环境变量
// 根据不同环境加载对应的环境变量配置文件
// 如果 NODE_ENV 是 production，则加载 .env.production
// 否则加载默认的 .env 文件
dotenv.config({
  path: process.env.NODE_ENV === 'production' 
    ? '.env.production'
    : '.env'
});

export interface Config {
  botToken: string;
  proxyUrl?: string;
  isDevelopment: boolean;
}

// 验证必需的环境变量
const BOT_TOKEN = process.env.BOT_TOKEN;
if (!BOT_TOKEN) {
  console.error("错误: BOT_TOKEN 环境变量未设置");
  process.exit(1);
}

export const config: Config = {
  botToken: BOT_TOKEN,
  proxyUrl: process.env.PROXY_URL,
  isDevelopment: process.env.NODE_ENV !== "production"
};