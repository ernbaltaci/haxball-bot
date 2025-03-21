import { prisma } from '@/lib/prisma';
import PlayerStore from '@/store/player.store';
import {
  AuthStatus,
  ColorPicker,
  EmojiPicker,
  PlayerInterface,
  StylePicker,
} from '@/types';
import { Client } from 'discord.js';
import LoginCommand from '../commands/login';
import sendAnnouncement from '../helpers/room-send-announcement';

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

    // KULLANICININ VERİTABANINDA KAYITLI OLUP OLMADIĞINI KONTROL ETME - KAYITLIYSA LOGIN DEĞİLSE KAYIT OL MESAJI
    if (!user) {
      sendAnnouncement(
        room,
        EmojiPicker.CHECK,
        `${EmojiPicker.WARNING} Hoş Geldin ${player.name}! Devam edebilmek için kayıt olmalısın! Kayıt olmak için: ${process.env.HAXBALL_PREFIX}kayıt`,
        player.id,
        ColorPicker.RED,
        StylePicker.BOLD
      );
    } else {
      sendAnnouncement(
        room,
        EmojiPicker.CHECK,
        `Hoş Geldin ${player.name}! Devam edebilmek için giriş yapmalısın! Giriş yapabilmek için: ${process.env.HAXBALL_PREFIX}${LoginCommand.name}`,
        player.id,
        ColorPicker.GREEN,
        StylePicker.NORMAL
      );
    }

    PlayerStore.set(player.id, {
      ...player,
      authStatus: user ? AuthStatus.LOGIN : AuthStatus.REGISTER,
      ...user,
    });

    setTimeout(() => {
      const playerFromCache = PlayerStore.get(player.id) as PlayerInterface;

      if (playerFromCache.authStatus === AuthStatus.LOGGED) return;

      room.kickPlayer(
        playerFromCache.id,
        'Yeterli süre içinde giriş yapmadınız.',
        false
      );
    }, 15_000);
  });

export default onPlayerJoin;
