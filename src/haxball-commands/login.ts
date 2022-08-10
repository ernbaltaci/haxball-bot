import { sendWarningToServer } from '@/helpers/haxball/send-message-to-server';
import { prisma } from '@/lib/prisma';
import EmojiStore from '@/store/EmojiStore';
import UserAccount from '@/store/haxball/user-account.store';
import { Client } from 'discord.js';

import bcrypt from 'bcrypt';
import startGame from '@/haxball-events/startGame';

const LoginCommand = {
  name: 'giriş',
  isFilter: true,
  func: async function (client: Client, user: any, args: any[], room: any) {
    const player = user.player;

    if (UserAccount.get(player.name) !== 'LOGIN') return;
    if (UserAccount.get(player.name) === 'LOGGED') return;

    const password = args[0];

    if (!password || password.length < 5) {
     return room.sendAnnouncement(
        `${EmojiStore.get('warning')} | ${
          player.name
        }, lütfen düzgün bir şifre giriniz.`,
        player.id,
        process.env.RED_EMBED_COLOR,
        'bold'
      );
    }

    prisma.user
      .findUnique({
        where: { username: player.name },
      })
      .then((getUser) => {
        if (!getUser) {
          UserAccount.set(player.name, 'REGISTER');

          return room.sendAnnouncement(
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
              return room.sendAnnouncement(
                `${EmojiStore.get(
                  'check'
                )} Girdiğin şifre şifren ile uyuşmuyor, ${player.name}!`,
                player.id,
                0x00ff00,
                'bold'
              );
            }

            UserAccount.set(player.name, 'LOGGED');

            startGame(room, client, player);

           return room.sendAnnouncement(
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
  },
};

export default LoginCommand;
