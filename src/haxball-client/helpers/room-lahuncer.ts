import { Client } from 'discord.js';
import { Headless } from 'haxball.js';
import onPlayerChat from '../events/onPlayerChat';
import onPlayerJoin from '../events/onPlayerJoin';
import onRoomLink from '../events/onRoomLink';

const manager = require('../../helpers/command-handler');

const roomBuilder = (HBInit: Headless, client: Client) => {
  const room = HBInit({
    roomName: 'Trying',
    maxPlayers: 10,
    public: true,
    noPlayer: true,
    token: process.env.HAXBALL_TOKEN,
  });

  room.setDefaultStadium('Big');
  room.setScoreLimit(1);
  room.setTimeLimit(0);

  // EVENTS
  onRoomLink(room);
  onPlayerJoin(room, client);
  onPlayerChat(room, client);

  manager(client, room);
};

export default roomBuilder;
