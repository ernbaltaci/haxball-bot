import { prisma } from '@/lib/prisma';
import EmojiStore from '@/store/emoji.store';
import { Client, Message } from 'discord.js';

const UnBanCommand = {
  name: 'unban',
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
        }, lütfen banını kaldırmak istediğiniz kullanıcının id'sini giriniz.`,
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
      data: { isBanned: false },
    });

    message.reply({
      content: `${EmojiStore.get('check')} | Başarıyla ban kaldırıldı --> ${
        bannedUser.username
      }`,
    });
  },
};

export default UnBanCommand;
