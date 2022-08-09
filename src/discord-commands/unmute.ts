import { prisma } from '@/lib/prisma';
import EmojiStore from '@/store/EmojiStore';
import { Client, Message } from 'discord.js';

const UnMuteCommand = {
  name: 'unmute',
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
        }, lütfen susturmasını kaldırmak istediğiniz kullanıcının id'sini giriniz.`,
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
      data: { isMuted: false },
    });

    message.reply({
      content: `${EmojiStore.get('check')} | Başarıyla susturması kaldırıldı --> ${
        bannedUser.username
      }`,
    });
  },
};

export default UnMuteCommand;
