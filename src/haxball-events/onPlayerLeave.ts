import { Client } from "discord.js";
import { sendMessageToDiscord } from "../helpers/send-message-to-discord";

const onPlayerLeave = (room: any, client: Client) => {
  room.onPlayerLeave = (player: any) => {
    // Send Message Info Message
    sendMessageToDiscord(
      client,
      process.env.GUILD_ID as string,
      process.env.SERVER_LOG_CHANNEL_ID as string,
      `Sunucudan Ayrıldı -> ${player.name} `
    );
  };
};
export default onPlayerLeave;
