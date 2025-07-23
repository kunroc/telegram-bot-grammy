import { Bot, Context } from "grammy";

/**
 * 注册所有命令处理器
 */
export function registerCommands(bot: Bot): void {
  // /start 命令处理器
  bot.command("start", async (ctx: Context) => {
    try {
      await ctx.reply("你好，我是你的Telegram机器人！");
      console.log(`用户 ${ctx.from?.username || ctx.from?.id} 执行了 /start 命令`);
    } catch (error) {
      console.error("处理 /start 命令时出错:", error);
    }
  });

  // /help 命令处理器
  bot.command("help", async (ctx: Context) => {
    try {
      const helpText = `
🤖 *机器人帮助*

/start - 开始使用机器人
/help - 显示此帮助信息

💬 发送任何文本消息，我会回复给你！
      `;
      await ctx.reply(helpText, { parse_mode: "Markdown" });
      console.log(`用户 ${ctx.from?.username || ctx.from?.id} 执行了 /help 命令`);
    } catch (error) {
      console.error("处理 /help 命令时出错:", error);
    }
  });
}