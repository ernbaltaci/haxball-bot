import { sendSuccessToServer } from '@/helpers/haxball/send-message-to-server';
import EmojiStore from '@/store/EmojiStore';
import MatchStatus from '@/store/haxball/match-status';
import { Client } from 'discord.js';
import { sendMessageToDiscord } from '../helpers/send-message-to-discord';
import startGame from './startGame';

const onTeamVictory = (room: any, client: Client) => {
  room.onTeamVictory = (scores: any) => {
    console.log(scores, 'ON TEAM VICTORY');

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
      const scoreMessage =
        scores.red > scores.blue
          ? `Oyun bitti ve oyunu Kırmızı takım Mavi takımdan ${
              scores.red - scores.blue
            } puan önde kazandı (${scores.red} - ${
              scores.blue
            }) ${EmojiStore.get('tada')} \n ${EmojiStore.get(
              'resume'
            )} Maç ${Math.ceil(
              Math.ceil(scores.time) / 60
            )} dakika kadar sürdü.`
          : `Oyun bitti ve oyunu Mavi takım Kırmızı takımdan ${
              scores.blue - scores.red
            } puan önde kazandı (${scores.red} - ${
              scores.blue
            }) ${EmojiStore.get('tada')} \n ${EmojiStore.get(
              'resume'
            )} Maç ${Math.ceil(
              Math.ceil(scores.time) / 60
            )} dakika kadar sürdü.`;

      sendSuccessToServer(room, undefined, `${scoreMessage}`);
    }

    MatchStatus.set('match', 'WAITING_PLAYER');
    room.stopGame();

    setTimeout(() => {
      startGame(room, client, null);
    }, 2_000);
  };
};
export default onTeamVictory;
