import { sendSuccessToServer } from '@/helpers/haxball/send-message-to-server';
import EmojiStore from '@/store/EmojiStore';
import MatchStatus from '@/store/haxball/match-status';
import UserAccount from '@/store/haxball/user-account.store';
import { Client } from 'discord.js';
import { sendMessageToDiscord } from '../helpers/send-message-to-discord';
import getLastToucher from './getLastToucher';
import start1v1YS from './start-game/1v1-YS';
import start2v2YS from './start-game/2v2-YS';
import { startGame } from './startGame';

const onTeamVictory = (room: any, client: Client) => {
  room.onTeamVictory = (scores: any) => {
    let winnerTeam: number | undefined = undefined;

    scores.red > scores.blue ? (winnerTeam = 1) : (winnerTeam = 2);

    //if bot team score equal
    if (scores.red === scores.blue) {
      sendSuccessToServer(
        room,
        undefined,
        `Oyun bitti ve iki takımın skoru eşit. (${scores.red} - ${
          scores.blue
        }) \n ${EmojiStore.get('resume')} Maç ${
          scores.time / 60
        } dakikada kadar sürdü.`
      );
    } else {
      if (winnerTeam === 1) {
        sendSuccessToServer(
          room,
          undefined,
          `Oyun bitti ve oyunu Kırmızı takım Mavi takımdan ${
            scores.red - scores.blue
          } puan önde kazandı (${scores.red} - ${scores.blue}) ${EmojiStore.get(
            'tada'
          )} \n ${EmojiStore.get('resume')} Maç ${Math.ceil(
            Math.ceil(scores.time) / 60
          )} dakika kadar sürdü.`
        );
      } else if (winnerTeam === 2) {
        sendSuccessToServer(
          room,
          undefined,
          `Oyun bitti ve oyunu Mavi takım Kırmızı takımdan ${
            scores.blue - scores.red
          } puan önde kazandı (${scores.red} - ${scores.blue}) ${EmojiStore.get(
            'tada'
          )} \n ${EmojiStore.get('resume')} Maç ${Math.ceil(
            Math.ceil(scores.time) / 60
          )} dakika kadar sürdü.`
        );
      }
    }

    MatchStatus.set('match', 'WAITING_PLAYER');
    room.stopGame();

    setTimeout(() => {
      const loggedUserCount = UserAccount.filter((x) => x === 'LOGGED').size;

      const playerList = room.getPlayerList() as any[];

      const winnerTeamList = playerList.filter((x) => x.id === winnerTeam);
      const loserTeamList = playerList.filter(
        (x) => x.team !== winnerTeam && x.team !== 0
      );

      if (loggedUserCount === 3) return start1v1YS(room, client, winnerTeamList, loserTeamList);
      if (loggedUserCount === 5) return start2v2YS(room, client, winnerTeamList, loserTeamList);

      startGame(room, client, null);
    }, 2_000);
  };

  return false;

};
export default onTeamVictory;
