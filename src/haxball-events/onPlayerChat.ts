import { sendWarningToServer } from '@/helpers/haxball/send-message-to-server';
import registerUser from '@/helpers/haxball/register-user';
import EmojiStore from '@/store/EmojiStore';
import UserAccount from '@/store/haxball/user-account.store';
import { Client } from 'discord.js';
import { prisma } from '@/lib/prisma';
import {
  sendMessageToDiscord,
  sendWarningMessageToDiscord,
} from '@/helpers/send-message-to-discord';
import CacheUser from '@/store/haxball/CacheUser';
import HaxballCommands from '@/store/haxball/haxball-commands.store';
import chatSystem from '@/helpers/haxball/chat-system';
import getUser from '@/helpers/haxball/getUser';
import { chatFilter } from '@/helpers/haxball/filter';

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

const onPlayerChat = (room: any, client: Client) => {
  room.onPlayerChat = (player: any, message: String) => {
    const userLoginStatus = UserAccount.get(player.name);

    if (
      !message.startsWith('!giriş') &&
      !message.startsWith('!kayıt') &&
      userLoginStatus !== 'LOGGED'
    ) {
      if (userLoginStatus === 'REGISTER') {
        sendWarningToServer(
          room,
          player.id,
          `${player.name}, bu işlem için sunucuya kayıt yapman gerekli. Giriş yapmak için: !kayıt şifre`
        );

        return false;
      }

      if (userLoginStatus === 'LOGIN') {
        sendWarningToServer(
          room,
          player.id,
          `${player.name}, bu işlem için sunucuya giriş yapman gerekli. Giriş yapmak için: !giriş şifre`
        );

        return false;
      }
    }

    const prefix = process.env.HAXBALL_PREFIX as string;

    if (message.startsWith(prefix)) {
      const [name, ...args] = message.slice(prefix.length).trim().split(/ +/g);

      if (
        name !== 'giriş' &&
        name !== 'kayıt' &&
        userLoginStatus !== 'LOGGED'
      ) {
        sendWarningToServer(
          room,
          player.id,
          `${player.name}, bu işlem için sunucuya giriş yapman gerekli. Giriş yapmak için: !giriş şifre`
        );

        return false;
      }

      const command = HaxballCommands.get(name) as any;
      if (!command) return;

      const userObj = {
        player,
        message,
      };

      try {
        // @ts-ignore:next-line
        command.default.func(client, userObj, args, room);

        if (command.default.isFilter) return false;
      } catch (error) {
        console.error(error);
      }
    }

    const isBadWord = chatFilter(message as string);
    if (isBadWord) {
      sendWarningToServer(room, player.id, `Kötü kelimeler kullanma!`);

      return false;
    }

    sendMessageToDiscord(
      client,
      process.env.GUILD_ID as string,
      process.env.CHAT_LOG_CHANNEL_ID as string,
      `${player.name} -> ${message}`
    );

    // CHAT SYSTEM
    const user = getUser(player.name) as USER;

    if (user && user.username) {
      chatSystem(room, player, message, user);
      return false;
    }
  };
};
export default onPlayerChat;
