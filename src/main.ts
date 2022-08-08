require('dotenv').config();
import { Client, GatewayIntentBits, GuildTextBasedChannel } from 'discord.js';
import createRoom from './helpers/haxball/room-create';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
});

client.on('ready', async (client) => {
  console.log(`${client.user!.username} running...`);
});


const bootStrap = async () => {
  await client.login();
  createRoom(client);
};
bootStrap();
