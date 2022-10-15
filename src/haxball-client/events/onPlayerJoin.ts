import sendMessageToDiscord from '@/discord-client/helpers/send-message-to-discord';
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
    sendAnnouncement(
      room,
      EmojiPicker.NEW,
      user
        ? `Hoş Geldin ${player.name}! Devam edebilmek için giriş yapmalısın! Giriş yapabilmek için: ${process.env.HAXBALL_PREFIX}${LoginCommand.name}`
        : `${EmojiPicker.WARNING} Hoş Geldin ${player.name}! Devam edebilmek için kayıt olmalısın! Kayıt olmak için: ${process.env.HAXBALL_PREFIX}kayıt`,
      player.id,
      ColorPicker.RED,
      StylePicker.BOLD
    );

    PlayerStore.set(player.id, {
      ...player,
      haxballId: player.id,
      authStatus: user ? AuthStatus.LOGIN : AuthStatus.REGISTER,
      ...user,
    });

    const playerFromCache = PlayerStore.get(player.id) as PlayerInterface;

    sendMessageToDiscord(
      client,
      room,
      EmojiPicker.NEW,
      `${player.name}, odaya katıldı. (${
        playerFromCache.authStatus === AuthStatus.LOGIN
          ? 'Kayıtlı Oyuncu'
          : 'Kayıtsız Oyuncu'
      })`,
      process.env.GUILD_ID as string,
      process.env.GUILD_LOG_CHANNEL_ID as string,
      ColorPicker.GREEN,
      'message'
    );

    setTimeout(() => {
      if (playerFromCache.authStatus === AuthStatus.LOGGED) return;

      room.kickPlayer(
        playerFromCache.id,
        'Yeterli süre içinde giriş yapmadınız.',
        false
      );
    }, parseInt(process.env.LOGIN_TIMEOUT as string));
  });

export default onPlayerJoin;
