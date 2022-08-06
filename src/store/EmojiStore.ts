import { Collection } from "discord.js";
const EmojiStore = new Collection();

{
  EmojiStore.set("cross", "❌");
  EmojiStore.set("check", "✅");
  EmojiStore.set("info", "ℹ️");
  EmojiStore.set("new", "🆕");
  EmojiStore.set("cd", "💿");
  EmojiStore.set("pause", "⏸️");
  EmojiStore.set("resume", "▶️");
  EmojiStore.set("stop", "⏹️");
  EmojiStore.set('warning', '⚠️')
}

export default EmojiStore;
