import { sendWarningToServer } from '@/helpers/haxball/send-message-to-server';
import registerUser from '@/helpers/haxball/register-user';
import EmojiStore from '@/store/EmojiStore';
import UserAccount from '@/store/haxball/user-account.store';
import { Client } from 'discord.js';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';
import {
  sendMessageToDiscord,
  sendWarningMessageToDiscord,
} from '@/helpers/send-message-to-discord';
import CacheUser from '@/store/haxball/CacheUser';

const MIN_PASWORD_LENGTH = process.env.MIN_PASWORD_LENGTH as unknown as number;

interface USER {
  username: string;
  role:
    | 'Beginner'
    | 'HAVARI'
    | 'ADMIN'
    | 'VIPADMIN'
    | 'YONETICI'
    | 'KURUCU'
    | 'SUNUCU_SAHIBI';
  banned: boolean;
}

// start game function
const startGame = (room: any) => {
  const requiredPlayer = process.env.REQUIRED_PLAYER as unknown as number;

  const playerList = room.getPlayerList() as any[];
  if (playerList.length < requiredPlayer) return;

  const isRequiredLength = UserAccount.filter(
    (x: any) => x.LOGGED.length === 6
  );

  if (isRequiredLength) room.startGame();
};

const getUser = (name: string) => {
  const cachedUser = CacheUser.get(name);

  if (cachedUser) return cachedUser;

  const user = prisma.user
    .findUnique({
      where: { username: name },
    })
    .then((x) => {
      CacheUser.set(name, x);

      return x;
    });
};

const onPlayerChat = (room: any, client: Client) => {
  room.onPlayerChat = (player: any, message: String) => {
    const args = message
      .slice(process.env.GAME_PREFIX?.length as number)
      .trim()
      .split(/ +/g);

    sendMessageToDiscord(
      client,
      process.env.GUILD_ID as string,
      process.env.CHAT_LOG_CHANNEL_ID as string,
      `${player.name} -> ${message}`
    );

    const user = getUser(player.name) as USER;

    startGame(room);

    //Acil Command
    if (args[0] === 'acil') {
      sendWarningMessageToDiscord(
        client,
        process.env.GUILD_ID as string,
        process.env.URGENT_CHANNEL_ID as string,
        `${player.name} -> adlı oyuncu uyarı komutunu kullandı!`
      );

      return false;
    }

    // Manual Start Command
    if (args[0] === 'başlat') {
      console.log(player);
      if (!player.admin) return;

      room.startGame();

      room.sendAnnouncement(
        `${EmojiStore.get('tada')} | Oyun başladı.`,
        null,
        0x0000ff,
        'normal'
      );

      return false;
    }

    // REGISTER AREA
    if (UserAccount.get(player.name) === 'REGISTER') {
      // IF LOGGED DIDN'T ANYTHINK
      if (UserAccount.get(player.name) === 'LOGGED') return;
      //CHECK USER IF BEFORE LOGIN
      if (UserAccount.get(player.name) === 'LOGIN') return;

      if (args[0] === 'kayıt') {
        const password = args[1];

        if (!password || password.length < MIN_PASWORD_LENGTH) {
          sendWarningToServer(
            room,
            player.id,
            `${player.name}, lütfen düzgün bir şifre giriniz. Şifre uzunluğu 5 karakterden uzun olmalıdır.`
          );
          return false;
        }

        registerUser(player, password);

        UserAccount.set(player.name, 'LOGGED');

        room.sendAnnouncement(
          `${EmojiStore.get('check')} Sunucuya başarıyla kayıt oldun ${
            player.name
          }!`,
          player.id,
          0x00ff00,
          'bold'
        );
        startGame(room);
        return false;
      }

      sendWarningToServer(
        room,
        player.id,
        `${player.name}, bu işlem için sunucuya kayıt olmalısın. Kayıt olmak için: !kayıt şifre`
      );

      return false;
    }

    // LOGIN AREA
    if (UserAccount.get(player.name) === 'LOGIN') {
      // IF LOGGED DIDN'T ANYTHINK
      if (UserAccount.get(player.name) === 'LOGGED') return;

      // Check login message
      if (args[0] === 'giriş') {
        const password = args[1];

        // Check user password accuracy
        if (!password || password.length < MIN_PASWORD_LENGTH) {
          sendWarningToServer(
            room,
            player.id,
            `${player.name}, lütfen düzgün bir şifre giriniz.`
          );
          return false;
        }

        prisma.user
          .findUnique({
            where: { username: player.name },
          })
          .then((getUser) => {
            if (!getUser) {
              UserAccount.set(player.name, 'REGISTER');

              room.sendAnnouncement(
                `${EmojiStore.get('check')} Sunucuya kayıtlı değilsin, ${
                  player.name
                }!`,
                player.id,
                0x00ff00,
                'bold'
              );
            }

            bcrypt.compare(
              password,
              getUser?.password as string,
              function (err, match) {
                if (!match) {
                  UserAccount.set(player.name, 'LOGIN');
                  room.sendAnnouncement(
                    `${EmojiStore.get(
                      'check'
                    )} Girdiğin şifre şifren ile uyuşmuyor, ${player.name}!`,
                    player.id,
                    0x00ff00,
                    'bold'
                  );

                  return false;
                }

                UserAccount.set(player.name, 'LOGGED');

                room.sendAnnouncement(
                  `${EmojiStore.get('check')} Sunucuya başarıyla giriş yaptın ${
                    player.name
                  }!`,
                  player.id,
                  0x00ff00,
                  'bold'
                );
              }
            );
          });
        startGame(room);
        return false;
      }

      sendWarningToServer(
        room,
        player.id,
        `${player.name}, bu işlem için sunucuya giriş yapman gerekli. Giriş yapmak için: !giriş şifre`
      );

      return false;
    }

    let color = null;

    switch (user.role) {
      case 'Beginner':
        color = 0xdddddd;
        break;
      case 'HAVARI':
        color = '';
        break;
      case 'ADMIN':
        color = '';
        break;
      case 'KURUCU':
        color = '';
        break;
      case 'SUNUCU_SAHIBI':
        color = '';
        break;
      case 'VIPADMIN':
        color = '';
        break;
      case 'YONETICI':
        color = '';
        break;
    }

    room.sendAnnouncement(
      `${user.role} ${player.name} -> ${message}`,
      undefined,
      color,
      'normal'
    );

    return false;
  };
};
export default onPlayerChat;
