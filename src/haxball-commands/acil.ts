import EmojiStore from '@/store/EmojiStore';
import {
  Client,
  Colors,
  EmbedBuilder,
  TextBasedChannel,
} from 'discord.js';

const AcilCommand = {
  name: 'acil',
  isFilter: true,
  func: async function (client: Client, user: any, args: any[], room: any) {
    const embed = new EmbedBuilder({
      color: Colors.Orange,
      title: `${EmojiStore.get('warning')} | Uyarı Mesajı`,
      description: `Komutu kullanan: ${user.player.name}`,
      timestamp: Date.now(),
    });

    const guild = client.guilds.cache.get(process.env.GUILD_ID as string);
    const channel = guild?.channels.cache.get(
      process.env.URGENT_CHANNEL_ID as string
    ) as TextBasedChannel;

    return channel.send({ embeds: [embed] });
  },
};

export default AcilCommand;
