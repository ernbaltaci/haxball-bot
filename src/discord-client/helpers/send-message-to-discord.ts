import { ColorPicker, EmojiPicker } from '@/types';
import { Client, EmbedBuilder } from 'discord.js';

const sendMessageToDiscord = (
  client: Client,
  room: RoomObject,
  emoji: EmojiPicker,
  message: string,
  guildId: string,
  channelId: string,
  color: ColorPicker,
  type: 'message' | 'embed'
) => {
  const getGuild = client.guilds.cache.get(guildId);
  const channel = getGuild?.channels.cache.get(channelId);

  if (!channel?.isTextBased()) return;

  if (type === 'message') {
    channel.send(`${emoji} | ${message}`);
  } else if (type === 'embed') {
    const embed = new EmbedBuilder({
      color: color,
      description: `${emoji} | ${message}`,
    });

    channel.send({ embeds: [embed] });
  }
};

export default sendMessageToDiscord;
