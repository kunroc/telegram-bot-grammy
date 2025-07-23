import { GrammyError, HttpError } from "grammy";
import { createBot } from "./bot";
import { registerCommands } from "./handlers/commands";
import { registerMessageHandlers } from "./handlers/messages";
import { config } from "./config";

/**
 * 主应用程序入口点
 */
async function main(): Promise<void> {
  try {
    console.log("🚀 启动Telegram机器人...");
    
    // 创建bot实例
    const bot = createBot();
    
    // 注册命令处理器
    registerCommands(bot);
    
    // 注册消息处理器
    registerMessageHandlers(bot);
    
    // 全局错误处理
    bot.catch((err) => {
      const ctx = err.ctx;
      console.error(`处理更新时出错 ${ctx.update.update_id}:`);
      const e = err.error;
      
      if (e instanceof GrammyError) {
        console.error("Grammy错误:", e.description);
      } else if (e instanceof HttpError) {
        console.error("HTTP错误:", e.message);
      } else {
        console.error("未知错误:", e);
      }
    });
    
    // 启动bot
    await bot.start();
    console.log("✅ 机器人启动成功！");
    
    if (config.isDevelopment) {
      console.log("🔧 开发模式已启用");
    }
    
  } catch (error) {
    console.error("❌ 启动机器人时出错:");
    
    if (error instanceof GrammyError) {
      console.error("Grammy错误:", error.description);
    } else if (error instanceof HttpError) {
      console.error("HTTP错误:", error.message);
    } else {
      console.error("未知错误:", error);
    }
    
    process.exit(1);
  }
}

// 处理未捕获的异常
process.on('unhandledRejection', (reason, promise) => {
  console.error('未处理的Promise拒绝:', promise, '原因:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('未捕获的异常:', error);
  process.exit(1);
});

// 优雅关闭
process.on('SIGINT', () => {
  console.log('\n🛑 收到SIGINT信号，正在关闭机器人...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 收到SIGTERM信号，正在关闭机器人...');
  process.exit(0);
});

// 启动应用程序
main();