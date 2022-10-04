import { Collection } from 'discord.js';
const EmojiStore = new Collection();

{
  EmojiStore.set('cross', '❌');
  EmojiStore.set('check', '✅');
  EmojiStore.set('tada', '🎉');
  EmojiStore.set('info', 'ℹ️');
  EmojiStore.set('new', '🆕');
  EmojiStore.set('resume', '▶️');
  EmojiStore.set('warning', '⚠️');
  EmojiStore.set('red_circle', '🔴');
  EmojiStore.set('blue_circle', '🔵');
  EmojiStore.set('ball', '⚽');
  EmojiStore.set('scream', '😱');
  EmojiStore.set('shoe', '👟')
}

export default EmojiStore;