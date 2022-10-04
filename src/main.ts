require('dotenv').config();
import { Client, GatewayIntentBits } from 'discord.js';
import roomBuilder from './haxball-client/helpers/room-lahuncer';
import HaxballJS from 'haxball.js';

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
  roomBuilder(await HaxballJS, client);
};
bootStrap();
