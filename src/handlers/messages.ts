import { Bot, Context } from "grammy";

/**
 * 注册所有消息处理器
 */
export function registerMessageHandlers(bot: Bot): void {
  // 文本消息处理器
  bot.on("message:text", async (ctx: Context) => {
    try {
      const userMessage = ctx.message?.text;
      if (userMessage) {
        // 简单的回声功能
        await ctx.reply(`你说: ${userMessage}`);
        console.log(`用户 ${ctx.from?.username || ctx.from?.id} 发送了消息: ${userMessage}`);
      }
    } catch (error) {
      console.error("处理文本消息时出错:", error);
      try {
        await ctx.reply("抱歉，处理您的消息时出现了错误。");
      } catch (replyError) {
        console.error("发送错误回复时出错:", replyError);
      }
    }
  });

  // 其他类型消息的处理器
  bot.on("message:photo", async (ctx: Context) => {
    try {
      await ctx.reply("我收到了您的图片！");
      console.log(`用户 ${ctx.from?.username || ctx.from?.id} 发送了图片`);
    } catch (error) {
      console.error("处理图片消息时出错:", error);
    }
  });

  bot.on("message:document", async (ctx: Context) => {
    try {
      await ctx.reply("我收到了您的文档！");
      console.log(`用户 ${ctx.from?.username || ctx.from?.id} 发送了文档`);
    } catch (error) {
      console.error("处理文档消息时出错:", error);
    }
  });
}