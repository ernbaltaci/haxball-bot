import registerUser from '@/helpers/register-user';
import EmojiStore from '@/store/EmojiStore';
import UserAccount from '@/store/haxball/user-account.store';
import { Client, Message } from 'discord.js';
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
      }

      room.sendAnnouncement(
        `${EmojiStore.get(
          'warning'
        )} Bu işlem için sunucuya giriş yapman gerekli,${
          player.name
        }! Giriş yapabilmek için !giriş şifreniz`,
        player.id,
        0xff0000,
        'bold'
      );

      return false;
    }
  };
};
export default onPlayerChat;
