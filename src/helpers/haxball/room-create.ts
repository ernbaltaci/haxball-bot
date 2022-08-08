import onPlayerTeamChange from '@/haxball-events/onPlayerTeamChange';
import onTeamGoal from '@/haxball-events/onTeamGoal';
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
        roomName: 'RECEP TAYYİP ERDOĞAN STADYUMU',
        maxPlayers: 16,
        public: true,
        noPlayer: true,
        token: process.env.HAXBALL_TOKEN as string,
      });

      room.setDefaultStadium('Big');
      room.setScoreLimit(5);
      room.setTimeLimit(0);

      //Event handler
      onPlayerChat(room, client);
      onPlayerJoin(room, client);
      onPlayerLeave(room, client);
      onPlayerTeamChange(room, client);
      onTeamGoal(room, client);
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
