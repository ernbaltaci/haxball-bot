import { sendSuccessToServer } from '@/helpers/haxball/send-message-to-server';
import EmojiStore from '@/store/EmojiStore';
import { Client } from 'discord.js';
import { sendMessageToDiscord } from '../helpers/send-message-to-discord';

const onTeamVictory = (room: any, client: Client) => {
  room.onTeamVictory = (scores: any) => {
      //if bot team score equal
    if (scores.red === scores.blue)
      return sendSuccessToServer(room, undefined, `Oyun bitti ve iki takımın skoru eşit. \n ${EmojiStore.get('resume')} Maç ${scores.time / 60} dakikada kadar sürdü.`);


    const scoreMessage =
      scores.red > scores.blue
        ? `Oyun bitti ve oyunu Kırmızı takım Mavi takımdan ${
            scores.red - scores.blue
          } puan önde kazandı ${EmojiStore.get('tada')}`
        : `Oyun bitti ve oyunu Mavi takım Kırmızı takımdan ${
            scores.blue - scores.red
          } puan önde kazandı ${EmojiStore.get('tada')} \n ${EmojiStore.get('resume')} Maç ${scores.time / 60} dakikada kadar sürdü.`;

    return sendSuccessToServer(room, undefined, `${scoreMessage}`);
  };
};
export default onTeamVictory;
