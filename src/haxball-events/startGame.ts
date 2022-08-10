import map2v2 from '@/lib/haxball/maps/map-2v2';
import map3v3 from '@/lib/haxball/maps/map-3v3';
import UserAccount from '@/store/haxball/user-account.store';
import { Client } from 'discord.js';

import { readFileSync } from 'fs';

import MatchStatus from '@/store/haxball/match-status';

const startGame = (room: any, client: Client, player: any) => {
  const playerList = room.getPlayerList() as any[];

  const loggedUserCount = UserAccount.filter((x) => x === 'LOGGED').size;

  const map2v2Txt = map2v2();
  const map3v3Txt = map3v3();

  const matchStatus = MatchStatus.get('match') as
    | 'WAITING_PLAYER'
    | 'STARTING'
    | 'STARTED'
    | 'PAUSED';

  // for only 1 player
  if (playerList.length === 1) {
    room.setCustomStadium(map2v2Txt);
    room.setPlayerTeam(player?.id, 1);
    MatchStatus.set('match', 'STARTED');

    return room.startGame();
  }

  // 1V1 for 2 player
  if (playerList.length === 2) {
    if (matchStatus === 'STARTED') room.stopGame();

    const redTeam = playerList.slice(0, 1);
    const blueTeam = playerList.slice(1, 2);

    room.setCustomStadium(map2v2Txt);

    redTeam.forEach((x) => {
      room.setPlayerTeam(x.id, 1);
    });
    blueTeam.forEach((x) => {
      room.setPlayerTeam(x.id, 2);
    });

    MatchStatus.set('match', 'STARTED');

    room.startGame();

  }

  return;
  if (playerList.length < 4 && loggedUserCount < 4) {
    MatchStatus.set('match', 'WAITING_PLAYER');

    if (matchStatus === 'STARTING' || matchStatus === 'STARTED') return;
  }

  if (playerList.length >= 4 && loggedUserCount >= 4) {
    if (matchStatus === 'STARTING' || matchStatus === 'STARTED') return;

    MatchStatus.set('match', 'STARTING');

    room.sendAnnouncement(
      `3v3 haritasi için yeteri kadar oyuncu toplandı! Harita 5 saniye içinde başlıyor.`,
      null,
      0x3ec70b,
      'bold'
    );

    setTimeout(() => {
      room.setCustomStadium(map2v2Txt);

      const redTeam = playerList.slice(0, 2);
      const blueTeam = playerList.slice(2, 4);

      console.log(redTeam, blueTeam);

      if (redTeam.length < 1 || blueTeam.length < 1) {
        MatchStatus.set('match', 'WAITING_PLAYER');

        return room.sendAnnouncement(
          `Yeteri kadar oyuncu olmadığı için maç başlatılamadı. Gerekli oyuncu sayısı: ${
            4 - (redTeam.length + blueTeam.length)
          }`,
          null,
          0xff1e00,
          'bold'
        );
      }

      redTeam.forEach((x) => {
        room.setPlayerTeam(x.id, 1);
      });
      blueTeam.forEach((x) => {
        room.setPlayerTeam(x.id, 2);
      });

      MatchStatus.set('match', 'STARTED');

      room.startGame();
    }, 5_000);
  }
};
export default startGame;
