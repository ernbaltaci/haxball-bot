import { prisma } from '@/lib/prisma';
import EmojiStore from '@/store/emoji.store';
import { Client, Message } from 'discord.js';

const BanCommand = {
  name: 'ban',
  func: async function (
    client: Client,
    message: Message,
    args: any[],
    room: any
  ) {
    const userId = args[0];

    if (!userId)
      return message.reply({
        content: `${EmojiStore.get('cross')} | ${
          message.author
        }, lütfen banlamak istediğiniz kullanıcının id'sini giriniz.`,
      });

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user)
      return message.reply({
        content: `${EmojiStore.get('cross')} | ${
          message.author
        }, girdiğiniz id'deki kullanıcı bulunamadı.`,
      });

    const bannedUser = await prisma.user.update({
      where: { id: userId },
      data: { isBanned: true },
    });

    const playerList = room.getPlayerList();

    const bannedUserFromServer = playerList.filter(
      (x: any) => x.name === bannedUser.username
    );

    if (bannedUserFromServer.length === 1)
      room.kickPlayer(bannedUserFromServer[0].id, 'Sunucudan banlandınız.');

    message.reply({
      content: `${EmojiStore.get('check')} | Başarıyla banlandı --> ${
        bannedUser.username
      }`,
    });
  },
};

export default BanCommand;
