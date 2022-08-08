import { sendWarningToServer } from '@/helpers/haxball/send-message-to-server';
import registerUser from '@/helpers/haxball/register-user';
import EmojiStore from '@/store/EmojiStore';
import UserAccount from '@/store/haxball/user-account.store';
import { Client } from 'discord.js';
import { sendMessageToDiscord } from '../helpers/send-message-to-discord';

const onPlayerChat = (room: any, client: Client) => {
  room.onPlayerChat = (player: any, message: String) => {
    const args = message
      .slice(process.env.GAME_PREFIX?.length as number)
      .trim()
      .split(/ +/g);

    // sendMessageToDiscord(
    //   client,
    //   process.env.GUILD_ID as string,
    //   process.env.CHAT_LOG_CHANNEL_ID as string,
    //   `${player.name} -> ${message}`
    // );

    // KAYIT KISMI
    if (UserAccount.get(player.name) === 'REGISTER') {
      if (args[0] === 'kayıt') {
        const password = args[1];

        if (!password || password.length < 5) return;

        registerUser(player.name, '');

        room.sendAnnouncement(
          `${EmojiStore.get('check')} Sunucuya başarıyla kayıt oldun ${
            player.name
          }!`,
          player.id,
          0x00ff00,
          'bold'
        );
        return false;
      }

      sendWarningToServer(
        room,
        player.id,
        `${player.name}, bu işlem için sunucuya kayıt olmalısın. Kayıt olmak için: !kayıt şifre`
      );

      return false;
    }

    // GİRİŞ YAPMA KISMI
    if (UserAccount.get(player.name) === 'LOGIN') {
      if (args[0] === 'giriş') {
        UserAccount.set(player.name, true);
        room.sendAnnouncement(
          `${EmojiStore.get('check')} Sunucuya başarıyla giriş yaptın ${
            player.name
          }!`,
          player.id,
          0x00ff00,
          'bold'
        );
        return false;
      }

      sendWarningToServer(
        room,
        player.id,
        `${player.name}, bu işlem için sunucuya giriş yapman gerekli. Giriş yapmak için: !giriş şifre`
      );

      return false;
    }
  };
};
export default onPlayerChat;
