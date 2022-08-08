import EmojiStore from '@/store/EmojiStore';
import { TextBasedChannel, Client, EmbedBuilder, Colors } from 'discord.js';

const sendMessageToDiscord = (
  client: Client,
  guildId: string,
  channelId: string,
  message: string
) => {
  const guild = client.guilds.cache.get(guildId);
  const channel = guild?.channels.cache.get(channelId) as TextBasedChannel;

  return channel.send({ content: message });
};

const sendSuccessMessageToDiscord = (
  client: Client,
  channelId: TextBasedChannel,
  message: string
) => {};

const sendErrorMessageToDiscord = (
  client: Client,
  channelId: TextBasedChannel,
  message: string
) => {};

const sendWarningMessageToDiscord = (
  client: Client,
  guildId: string,
  channelId: string,
  message: string
) => {
  const embed = new EmbedBuilder({
    color: Colors.Orange,
    title: `${EmojiStore.get('warning')} | Uyarı Mesajı`,
    description: `${message}`,
    timestamp: Date.now(),
  });

  const guild = client.guilds.cache.get(guildId);
  const channel = guild?.channels.cache.get(channelId) as TextBasedChannel;

  return channel.send({ embeds: [embed] });
};

export {
  sendErrorMessageToDiscord,
  sendMessageToDiscord,
  sendSuccessMessageToDiscord,
  sendWarningMessageToDiscord,
};
