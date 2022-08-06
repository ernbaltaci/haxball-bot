import { TextBasedChannel, Client, Guild } from "discord.js";

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

export {
  sendErrorMessageToDiscord,
  sendMessageToDiscord,
  sendSuccessMessageToDiscord,
};
