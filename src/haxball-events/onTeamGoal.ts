import { sendSuccessToServer } from '@/helpers/haxball/send-message-to-server';
import { prisma } from '@/lib/prisma';
import EmojiStore from '@/store/EmojiStore';
import { Client } from 'discord.js';
import { sendMessageToDiscord } from '../helpers/send-message-to-discord';
import getLastToucher from './getLastToucher';

const onTeamGoal = (room: any, client: Client) => {
  room.onTeamGoal = (team: any) => {
    // Send Message Info Message

    const score = room.getScores();
    console.log(team, 'ON_TEAM_GOAL');

    if (!score) return;

    const scorer = getLastToucher(room)?.lastPlayerTouched;
    const lastTouchList = getLastToucher(room)?.lastTouchers as [
      { name: string; team: number; admin: boolean }
    ];


    let scoreStatus =
      score.red > score.blue
        ? `Kırmızı takım Mavi takımdan ${score.red - score.blue} puan önde. (${
            score.red
          } - ${score.blue})`
        : `Mavi takım Kırmızı takımdan ${score.blue - score.red} puan önde. (${
            score.red
          } - ${score.blue})`;

    if (score.red === score.blue)
      scoreStatus = `Bu golu sayesinde puanları eşitledi! (${score.red} - ${score.blue}).`;


    const scorerInfo =
      scorer?.team === 1
        ? `Kırmızı takımdan ${EmojiStore.get('ball')} ${scorer?.name ? scorer.name : 'Bilinmiyor.'} gol attı!`
        : `Mavi takımdan ${EmojiStore.get('ball')} ${scorer?.name ? scorer.name : 'Bilinmiyor.'} gol attı!`;

    sendSuccessToServer(room, undefined, `${scorerInfo} ${scoreStatus}`);

    if(!scorer) return;

    if(scorer.team !== team) room.sendAnnouncement(
      `${scorer.name} kendi kalesine gol attı ${EmojiStore.get('scream')}`,
      undefined,
      0xff4273,
      'bold'
    );


    prisma.user.update({
      where: { username: scorer.name },
      data: {
        goalCount: +1,
      },
    });

    prisma.user.update({
      where: { username: scorer.name },
      data: {
        goalCount: +1,
      },
    });


    // console.log(scorer, lastTouchList);
  };
};
export default onTeamGoal;
