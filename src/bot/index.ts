import { Bot } from "grammy";
import { HttpsProxyAgent } from "https-proxy-agent";
import { config } from "../config";

/**
 * 创建并配置Telegram Bot实例
 */
export function createBot(): Bot {
  // 设置代理（可选）
  const agent = config.proxyUrl ? new HttpsProxyAgent(config.proxyUrl) : undefined;

  const botConfig = agent ? {
    client: {
      baseFetchConfig: {
        agent: agent
      }
    }
  } : {};

  const bot = new Bot(config.botToken, botConfig);

  // 开发模式下启用详细日志
  if (config.isDevelopment) {
    console.log("Bot配置:", {
      hasProxy: !!config.proxyUrl,
      proxyUrl: config.proxyUrl ? "[已配置]" : "[未配置]"
    });
  }

  return bot;
}