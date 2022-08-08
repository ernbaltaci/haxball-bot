import { prisma } from '@/lib/prisma';
import EmojiStore from '@/store/EmojiStore';
import UserAccount from '@/store/haxball/user-account.store';
import { Client } from 'discord.js';
import {
  sendMessageToDiscord,
  sendWarningMessageToDiscord,
} from '../helpers/send-message-to-discord';

const startGame = (room: any) => {
  const requiredPlayer = process.env.REQUIRED_PLAYER as unknown as number;

  const playerList = room.getPlayerList() as any[];
  if (playerList.length < requiredPlayer)
    return room.sendAnnouncement(
      `${EmojiStore.get('info')} | Oyun ${
        requiredPlayer - playerList.length
      } kişi sonra başlayacak.`,
      null,
      process.env.BLUE_EMBED_COLOR,
      'normal'
    );

  if (!UserAccount) return;

  console.log(UserAccount)

  const isRequiredLength = UserAccount.filter(
    (x: any) => x.length === 6
  );

  if (isRequiredLength) room.startGame();
};

const onPlayerJoin = (room: any, client: Client) => {
  room.onPlayerJoin = async (player: any) => {
    // Send Message Info Message
    sendMessageToDiscord(
      client,
      process.env.GUILD_ID as string,
      process.env.SERVER_LOG_CHANNEL_ID as string,
      `Sunucuya Katıldı -> ${player.name} `
    );

    // check player auth key
    if (!player.auth)
      return room.kickPlayer(player.id, 'Auth keyiniz bulunmuyor.');

    // start game function
    startGame(room);

    // get user from DB
    const getUser = await prisma.user.findUnique({
      where: { username: player.name },
    });

    if (player.name === 'cuvas') room.setPlayerAdmin(player.id, true);

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

    // Check User If didn't login and set status LOGIN

    if (getUser) {
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
