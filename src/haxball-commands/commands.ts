import CommandStore from '@/store/CommandStore';
import EmojiStore from '@/store/EmojiStore';
import HaxballCommands from '@/store/haxball/haxball-commands.store';
import { Client, Colors, EmbedBuilder, TextBasedChannel } from 'discord.js';

const AllCommands = {
  name: 'komutlar',
  isFilter: false,
  func: async function (client: Client, user: any, args: any[], room: any) {
    const commandListArray: any = [];

    const commandListMap = HaxballCommands.forEach((value: any, keys: any) => {
      commandListArray.push(`--> ${keys}`);
    });

    return room.sendAnnouncement(
      `${user.player.name} komutlar: \n${commandListArray.join('\n')}`,
      null,
      0xff5757,
      'small'
    );
  },
};

export default AllCommands;
