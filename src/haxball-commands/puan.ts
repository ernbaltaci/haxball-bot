
import { prisma } from '@/lib/prisma';
import EmojiStore from '@/store/EmojiStore';
import { Client, Colors, EmbedBuilder, TextBasedChannel } from 'discord.js';

const StatsCommand = {
  name: 'puanım',
  isFilter: true,
  func: async function (client: Client, user: any, args: any[], room: any) {
   

    const userStats = await prisma.user.findUnique({ where: { username: user.player.name } });


    return room.sendAnnouncement(
      `${user.player.name} - istatistiklerin: \n\n ${EmojiStore.get('ball')} Gol ${userStats?.goalCount}\n ${EmojiStore.get('shoe')} Asist: ${userStats?.assistCount}`,
      user.player.id,
      0xff5757,
      'small'
    );

  },
};

export default StatsCommand;
