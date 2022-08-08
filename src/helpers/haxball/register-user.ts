import { prisma } from '@/lib/prisma';
import UserAccount from '@/store/haxball/user-account.store';
import { userMention } from 'discord.js';

const registerUser = async (player: any, password: string) => {
  UserAccount.set(player.name, 'LOGGED');

  const getUser = await prisma.user.update({
    where: {
      username: player.name,
    },
    data: {
      password: password,
    },
    });


  return;
};

export default registerUser
