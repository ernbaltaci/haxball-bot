import { sendWarningToServer } from '@/helpers/haxball/send-message-to-server';
import { prisma } from '@/lib/prisma';
import EmojiStore from '@/store/EmojiStore';
import UserAccount from '@/store/haxball/user-account.store';
import { Client } from 'discord.js';

import bcrypt from 'bcrypt';
import registerUser from '@/helpers/haxball/register-user';

const RegisterCommand = {
  name: 'kayıt',
  isFilter: true,
  func: async function (client: Client, user: any, args: any[], room: any) {
    const player = user.player;

    if (UserAccount.get(player.name) !== 'REGISTER') return;

    const password = args[0];

    if (!password || password.length < 4) {
      return sendWarningToServer(
        room,
        player.id,
        `${player.name}, lütfen düzgün bir şifre giriniz. Şifre uzunluğu 5 karakterden uzun olmalıdır.`
      );
    }

    registerUser(player, password);

    UserAccount.set(player.name, 'LOGGED');

    return room.sendAnnouncement(
      `${EmojiStore.get('check')} Sunucuya başarıyla kayıt oldun ${
        player.name
      }!`,
      player.id,
      0x00ff00,
      'bold'
    );
  },
};

export default RegisterCommand;
