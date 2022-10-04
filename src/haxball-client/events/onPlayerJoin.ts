import { prisma } from '@/lib/prisma';
import PlayerStore from '@/store/player.store';
import { ColorPicker, EmojiPicker, StylePicker } from '@/types';
import { Client } from 'discord.js';
import { Headless } from 'haxball.js';
import sendAnnouncement from '../helpers/room-send-annuncement';

const onPlayerJoin = (room: RoomObject, client: Client) =>
  (room.onPlayerJoin = async (player: PlayerObject) => {
    console.log(`${player.name} --> Odaya girdi.`);

    const playerList = room.getPlayerList();

    //EGER OYUNCUNUN AUTH KEY'I YOKSA ODADAN AT
    !player.auth &&
      room.kickPlayer(player.id, 'Auth keyiniz bulunmuyor', false);

    const filterSamePlayerName = playerList.filter(
      (value: PlayerObject) => player.name === value.name
    );

    // EGER ODADA AYNI ISIMDEN OYUNCU VARSA OYUNCUYU ODADAN AT
    filterSamePlayerName.length > 1 &&
      room.kickPlayer(player.id, 'Aynı isimide oyuncu bulunuyor.', false);

    const user = await prisma.user.findUnique({
      where: { username: player.name },
    });

    //
    if (!user) {
      sendAnnouncement(
        room,
        EmojiPicker.CHECK,
        '',
        player.id,
        ColorPicker.RED,
        StylePicker.NORMAL
      );

      PlayerStore.set(player.id, { ...player, authStatus: 'REGISTER' });
    }
  });

export default onPlayerJoin;
