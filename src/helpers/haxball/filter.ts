import { prisma } from '@/lib/prisma';
import UserAccount from '@/store/haxball/user-account.store';

const chatFilter = (message: string) => {
  const bannedWord = [
    'muhammed',
    'allah',
    'atatürk',
    'sik',
    'am',
    'yarrak',
    'yarak',
    'oç',
  ];

  if (bannedWord.includes(message.toLocaleLowerCase())) return true;
  else false;
};

const playerNameFilter = async (room: any, player: any) => {
  const bannedName = ['muhammed', 'allah', 'atatürk', 'sik', 'am'];

  if (bannedName.includes(player.name)) {
    room.kickPlayer(player.id, 'İsminiz sakıncalı kelimeler içeriyor.');
    if (UserAccount.get(player.name) === 'REGISTER') return;

    try {
      await prisma.user.update({
        where: {
          username: player.name,
        },
        data: {
          isBanned: true,
        },
      });
    } catch (error) {
      console.log(
        `${player.name} adlı oyuncuyu kayıt ederken bir sorun yaşandı. ${error}`
      );
    }
  }
};

export { chatFilter, playerNameFilter };
