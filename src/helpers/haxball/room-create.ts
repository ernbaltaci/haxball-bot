import onPlayerTeamChange from '@/haxball-events/onPlayerTeamChange';
import onTeamGoal from '@/haxball-events/onTeamGoal';
import onTeamVictory from '@/haxball-events/onTeamVictory';
import { Client } from 'discord.js';
import onPlayerChat from '../../haxball-events/onPlayerChat';
import onPlayerJoin from '../../haxball-events/onPlayerJoin';
import onPlayerLeave from '../../haxball-events/onPlayerLeave';
import { sendMessageToDiscord } from '../send-message-to-discord';

const manager = require('../command-handler');

const HaxballJS = require('haxball.js');

const createRoom = (client: Client) =>
  HaxballJS.then(
    async (
      HBInit: (arg0: {
        roomName: string;
        maxPlayers: number;
        public: boolean;
        noPlayer: boolean;
        token: string;
      }) => any
    ) => {
      const room = HBInit({
        roomName: 'NODE.JS',
        maxPlayers: 10,
        public: true,
        noPlayer: true,
        token: process.env.HAXBALL_TOKEN as string,
      });

      room.setDefaultStadium('Big');
      room.setScoreLimit(1);
      room.setTimeLimit(0);
      room.setTeamsLock(true);

      //Event handler
      onPlayerChat(room, client);
      onPlayerJoin(room, client);
      onPlayerLeave(room, client);
      onPlayerTeamChange(room, client);
      onTeamGoal(room, client);
      onTeamVictory(room, client);
      manager(client, room);

      room.onRoomLink = function (link: string) {
        console.log(`Server started on ${link}`);
        // sendMessageToDiscord(
        //   client,
        //   process.env.GUILD_ID as string,
        //   process.env.SERVER_LOG_CHANNEL_ID as string,
        //   `Sunucu başlatıldı -> ${link}`
        // );
      };
    }
  );

export default createRoom;
