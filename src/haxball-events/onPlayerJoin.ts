import { prisma } from '@/lib/prisma';
import UserAccount from '@/store/haxball/user-account.store';
import { Client } from 'discord.js';
import {
  sendMessageToDiscord,
  sendWarningMessageToDiscord,
} from '../helpers/send-message-to-discord';

const onPlayerJoin = (room: any, client: Client) => {
  room.onPlayerJoin = async (player: any) => {
    // Send Message Info Message
    sendMessageToDiscord(
      client,
      process.env.GUILD_ID as string,
      process.env.SERVER_LOG_CHANNEL_ID as string,
      `Sunucuya Katıldı -> ${player.name} `
    );

    // get user from DB
    const getUser = await prisma.user.findUnique({
      where: { username: player.name },
    });

    if (player.name === 'cuvas') room.setPlayerAdmin(player.id);

    // Check User If didn't register and set status REGISTER
    !getUser && UserAccount.set(player.name, 'REGISTER');

    // Check User If didn't login and set status LOGIN

    if (getUser) {
      if (!player.auth)
        return room.kickPlayer(player.id, 'Auth keyiniz bulunmuyor.');

      // Check User Ban Status
      if (getUser.banned) {
        sendWarningMessageToDiscord(
          client,
          process.env.GUILD_ID as string,
          process.env.SERVER_LOG_CHANNEL_ID as string,
          `${player.name} -> adlı oyuncu kara listeye alındığı için sunucudan atıldı!`
        );
        return room.kickPlayer(player.id, 'Kara listeye alınmşsınız.');
      }

      // User Account Status Set 'NEED LOGIN'
      UserAccount.set(player.name, 'LOGIN');
    }

    console.log(UserAccount.get(player.name));
  };
};
export default onPlayerJoin;
