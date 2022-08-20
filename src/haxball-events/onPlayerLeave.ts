import LoggedUser from '@/store/haxball/logged-user.store';
import UserAccount from '@/store/haxball/user-account.store';
import { Client } from 'discord.js';
import { sendMessageToDiscord } from '../helpers/send-message-to-discord';
import {startGame} from './startGame';

const onPlayerLeave = (room: any, client: Client) => {
  room.onPlayerLeave = (player: any) => {
    // Send Message Info Message
    sendMessageToDiscord(
      client,
      process.env.GUILD_ID as string,
      process.env.SERVER_LOG_CHANNEL_ID as string,
      `Sunucudan Ayrıldı -> ${player.name} `
    );


    const playerList = room.getPlayerList() as any[];

    startGame(room, client, null);

    LoggedUser.delete(player.name);
    UserAccount.delete(player.name);

    return false;
  };

  return false;

};
export default onPlayerLeave;
