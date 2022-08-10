import { playerNameFilter } from '@/helpers/haxball/filter';
import { prisma } from '@/lib/prisma';
import EmojiStore from '@/store/EmojiStore';
import UserAccount from '@/store/haxball/user-account.store';
import { Client } from 'discord.js';
import {
  sendMessageToDiscord,
  sendWarningMessageToDiscord,
} from '../helpers/send-message-to-discord';
import startGame from './startGame';

const checkUserCount = (room: any, player: any, user: any) => {
  const playerList = room.getPlayerList() as any[];

  if (playerList.length === 9) {
    if (!user.isAdmin || user.role !== 'HAVARI')
      return room.kickPlayer(
        player.id,
        'Sunucu dolu. Doluyken giriş yapabilmek için havari ya da admin olmalısınız.'
      );
  }

  if (playerList.length === 10) {
    if (!user.isAdmin)
      return room.kickPlayer(
        player.id,
        'Sunucu dolu. Doluyken giriş yapabilmek için admin olmalısınız.'
      );
  }
};

const onPlayerJoin = (room: any, client: Client) => {
  room.onPlayerJoin = async (player: any) => {
    // check player auth key
    if (!player.auth)
      return room.kickPlayer(player.id, 'Auth keyiniz bulunmuyor.');

    const playerList = room.getPlayerList() as any[];
    const sameUser = playerList.filter((x) => x.name === player.name);

    if (sameUser.length > 1) return room.kickPlayer(player.id, 'Aynı isimide oyuncu bulunuyor.');

    // get user from DB
    const getUser = await prisma.user.findUnique({
      where: { username: player.name },
    });

    // Send Message Info Message
    sendMessageToDiscord(
      client,
      process.env.GUILD_ID as string,
      process.env.SERVER_LOG_CHANNEL_ID as string,
      `[${getUser === null ? 'N/A' : getUser.id}] Sunucuya Katıldı -> ${
        player.name
      } `
    );

    checkUserCount(room, player, getUser);

    if (getUser?.isAdmin) room.setPlayerAdmin(player.id, true);

    // Check User If didn't register and set status REGISTER

    if (!getUser) {
      room.sendAnnouncement(
        `${EmojiStore.get('tada')} | Sunucuya hoş geldin ${
          player.name
        }! \n${EmojiStore.get(
          'warning'
        )} Devam edebilmek için sunucumuza kayıt olmanız gereklidir. ${EmojiStore.get(
          'resume'
        )} !kayıt şifre`,
        player.id,
        process.env.GREEN_EMBED_COLOR,
        'normal'
      );
      UserAccount.set(player.name, 'REGISTER');
    }

    await playerNameFilter(room, player);

    // Check User If didn't login and set status LOGIN

    if (getUser) {
      // Check User Ban Status
      if (getUser.isBanned) {
        sendWarningMessageToDiscord(
          client,
          process.env.GUILD_ID as string,
          process.env.SERVER_LOG_CHANNEL_ID as string,
          `${player.name} -> adlı oyuncu kara listeye alındığı için sunucudan atıldı!`
        );
        return room.kickPlayer(player.id, 'Kara listeye alınmşsınız.');
      }

      room.sendAnnouncement(
        `${EmojiStore.get('tada')} | Sunucuya hoş geldin ${
          player.name
        }! \n ${EmojiStore.get(
          'warning'
        )} Devam edebilmek için giriş yapmanız gereklidir. ${EmojiStore.get(
          'resume'
        )} !giriş şifre`,
        player.id,
        process.env.GREEN_EMBED_COLOR,
        'normal'
      );

      // User Account Status Set 'NEED LOGIN'
      UserAccount.set(player.name, 'LOGIN');
    }

    console.log(UserAccount.get(player.name));
  };
};
export default onPlayerJoin;
