import { sendSuccessToServer } from '@/helpers/haxball/send-message-to-server';
import { Client } from 'discord.js';
import { sendMessageToDiscord } from '../helpers/send-message-to-discord';

const onTeamGoal = (room: any, client: Client) => {
  room.onTeamGoal = (team: any) => {
    // Send Message Info Message

    const score = room.getScores();
    console.log(team);

    if (!score) return;

    const scoreStuats =
      score.red > score.blue
        ? `Kırmızı takım Mavi takımdan ${score.red - score.blue} puan önde.`
        : `Mavi takım Kırmızı takımdan ${score.blue - score.red} puan önde.`;

    sendSuccessToServer(
      room,
      undefined,
      `Takım ${team}, gol attı ve ${scoreStuats}`
    );
  };
};
export default onTeamGoal;
